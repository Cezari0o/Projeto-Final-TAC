import DataChartRepo from "../../repos/dataChartRepo";
import { CategoriaCountType } from "../../repos/dataProcessRepo";
import Callback from "../../util/callbackType";

export interface ChartDataParams {
  category?: CategoriaCountType | CategoriaCountType[];
}

export interface ChartData {}

export default class DataChartService {
  constructor(private dataChartRepo: DataChartRepo) {}

  async getChartData(params: ChartDataParams, done: Callback<ChartData>) {
    try {
      if (params.category) {
        const categorys = await this.dataChartRepo.getCategory(params.category);

        for (const category of categorys) {
          // TODO: rode pra cada categoria uma busca dos dados pra ela
        }
      }
    } catch (err) {
      done(err as Error, null);
    }
  }
}
