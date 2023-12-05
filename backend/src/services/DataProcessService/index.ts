import { VacinaData } from "../../../types";
import DataProcessRepo, {
  CategoriaCountType,
} from "../../repos/dataProcessRepo";

type ServiceProcessFormat = (data: VacinaData[]) => void;
export default class DataProcessService {
  private dataProcessRepo;
  constructor(dataProcessRepo: DataProcessRepo) {
    this.dataProcessRepo = dataProcessRepo;
  }

  processDataCount(data: VacinaData[]) {
    const listaPropsMap = new Map<
      CategoriaCountType,
      keyof VacinaData["_source"]
    >([
      ["categoriaNome", "vacina_categoria_nome"],
      ["fabricanteNome", "vacina_fabricante_nome"],
      ["grupoAtendimento", "vacina_grupoAtendimento_nome"],
      ["pacienteEstado", "paciente_endereco_uf"],
      ["pacienteIdade", "paciente_idade"],
      ["pacienteSexo", "paciente_enumSexoBiologico"],
      ["paisPaciente", "paciente_endereco_nmPais"],
      ["racaCor", "paciente_racaCor_valor"],
      ["sistemaOrigem", "sistema_origem"],
      ["vacinaDose", "vacina_descricao_dose"],
      ["vacinaNome", "vacina_nome"],
    ]);

    data.forEach((vacina) => {
      for (const [key, vacinaKey] of listaPropsMap.entries()) {
        this.dataProcessRepo.setState(
          key,
          String(vacina["_source"][vacinaKey])
        );
      }
    });
  }

  async saveToDataBase() {
    await this.dataProcessRepo.saveAll();
  }
}
