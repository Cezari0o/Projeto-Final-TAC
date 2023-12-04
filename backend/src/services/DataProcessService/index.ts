import { VacinaData } from "../../../types";
import DataProcessRepo from "../../repos/dataProcessRepo";

type ServiceProcessFormat = (data: VacinaData[]) => void;

export default class DataProcessService {
  private dataProcessRepo;
  constructor(dataProcessRepo: DataProcessRepo) {
    this.dataProcessRepo = dataProcessRepo;
  }

  enderecoPacienteEstadoDataProcess(data: VacinaData[]) {
    for (const key in data) {
      this.dataProcessRepo.setEstadoPaciente(
        data[key]._source.paciente_endereco_uf
      );
    }
  }

  saveToDataBase() {
    this.dataProcessRepo.saveAll();
  }
}
