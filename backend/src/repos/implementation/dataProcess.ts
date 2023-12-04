import hasKey from "../../util/hasKey";
import DataProcessRepo from "../dataProcessRepo";
import prisma from "../prisma";

export default class DataProcess implements DataProcessRepo {
  private estadoPacienteCount: { [estado: string]: number } = {};
  private requestSaveCount = 0;
  private requestSaveMaxCount;

  constructor() {
    this.requestSaveMaxCount = process.env.REQUEST_SAVE_COUNT
      ? Number(process.env.REQUEST_SAVE_COUNT)
      : 10;
  }
  getEstadoPacienteCount = () => this.estadoPacienteCount;

  printDataStatus = () => {
    console.log("Data Temporary Status");
    console.log("Contagem de vacinacao por estado", this.estadoPacienteCount);
  };

  setEstadoPaciente = (estadoNome: string) => {
    const address = String(estadoNome);
    if (hasKey(this.estadoPacienteCount, address)) {
      this.estadoPacienteCount[address] += 1;
    } else {
      this.estadoPacienteCount[address] = 1;
    }

    // this.requestSaveCount++;
    // if (this.requestSaveCount >= this.requestSaveMaxCount) {
    //   this.printDataStatus();
    //   this.requestSaveCount = 0;
    // }
  };

  saveAll = async () => {
    console.log("Salvando vacinacao por estado...");
    try {
      for (const estado in this.estadoPacienteCount) {
        await prisma.estadoPacienteCount.upsert({
          create: {
            estado: estado,
            count: this.estadoPacienteCount[estado],
          },
          update: {
            count: this.estadoPacienteCount[estado],
          },
          where: {
            estado: estado,
          },
        });
      }

      console.log("Banco atualizado com sucesso!");
    } catch (err) {
      console.error("Nao foi possivel salvar os registros", err);
      console.log("Terminando...")
    }
  };
}
