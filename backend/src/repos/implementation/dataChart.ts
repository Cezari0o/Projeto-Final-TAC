import DataChartRepo, { CategoryGroup, DataChartProps } from "../dataChartRepo";
import prisma from "../prisma";

export default class DataChart implements DataChartRepo {
  async getCategory(categoryName?: string | string[]) {
    if (categoryName) {
      const categorys = await prisma.categoryCount.findMany({
        where: {
          name: {
            in: Array.isArray(categoryName) ? categoryName : [categoryName],
          },
        },
      });
      return categorys;
    }

    const categorys = await prisma.categoryCount.findMany();

    return categorys;
  }

  async getData(options?: DataChartProps | undefined) {
    if (options) {
      const { groupBy, limit } = options;

      const itens = await prisma.categoryCount.findMany({
        include: {
          countRelation: true,
        },
        where:
          (groupBy && {
            name: {
              in: Array.isArray(groupBy) ? groupBy : [groupBy],
            },
          }) ||
          undefined,
      });

      return itens.map((value) => {
        const { countRelation, ...rest } = value;

        return {
          ...rest,
          data: countRelation,
        };
      });
    }

    return await prisma.dataCount.findMany();
  }
}
