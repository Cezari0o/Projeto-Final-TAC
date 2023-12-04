import hasKey from "../../util/hasKey";
import DataProcessRepo, {
  CategoriaCountType,
  countProps,
} from "../dataProcessRepo";
import prisma from "../prisma";

export default class DataProcess implements DataProcessRepo {
  private countState: {
    [key in CategoriaCountType]: { [key: string]: number };
  } = {} as never;

  private requestSaveCount = 0;
  private requestSaveMaxCount;

  constructor() {
    this.requestSaveMaxCount = process.env.REQUEST_SAVE_COUNT
      ? Number(process.env.REQUEST_SAVE_COUNT)
      : 10;
  }

  private verifyKeyType(key: CategoriaCountType): key is CategoriaCountType {
    if (!countProps.includes(key)) {
      throw new Error(`${key} of different type!`);
    }

    return true;
  }

  async setState(categoria: CategoriaCountType, item: string) {
    this.verifyKeyType(categoria);

    if(!item || ['None', 'null', '-1', ''].includes(item)) {
      item = 'Não informado';
    }

    item = String(item);

    if (!hasKey(this.countState, categoria)) {
      this.countState[categoria as CategoriaCountType] = {};
    }

    if (hasKey(this.countState[categoria], item)) {
      this.countState[categoria][item] += 1;
    } else {
      this.countState[categoria][item] = 1;
    }
  }

  async getState(categoria: CategoriaCountType) {
    this.verifyKeyType(categoria);

    return this.countState[categoria];
  }

  printDataStatus = () => {
    console.log("Data Temporary Status");
    console.log(this.countState);
  };

  saveAll = async () => {
    console.log("Saving to db...");
    try {
      const categorys = await prisma.categoryCount.findMany();

      for (const [category, countPerCategoryObj] of Object.entries(
        this.countState
      )) {
        const myCategory = categorys.find((cat) => cat.name === category);
        console.log(`Saving ${category}`);

        if (!myCategory) {
          throw new Error(
            "Category not found in database. Run the seed script and try again!"
          );
        }

        for (const [itemName, total] of Object.entries(countPerCategoryObj)) {
          await prisma.dataCount.upsert({
            create: {
              itemCategoryId: myCategory.id,
              itemName: itemName,
              total: total,
            },
            update: {
              total: total,
            },
            where: {
              itemName: itemName,
            },
          });
        }
      }

      console.log("Db updated!");
    } catch (err) {
      console.error("Error while saving to database:", err);
      console.log("Finishing...");
    }
  };
}
