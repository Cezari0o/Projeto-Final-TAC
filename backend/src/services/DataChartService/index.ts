import { DataCount } from "../../../types";
import DataChartRepo, { CategoryGroup } from "../../repos/dataChartRepo";
import { CategoriaCountType } from "../../repos/dataProcessRepo";
import Callback from "../../util/callbackType";

export interface ChartDataParams {
  category?: CategoriaCountType | CategoriaCountType[];
  limit?: number;
}

export type ChartData = CategoryGroup[] | DataCount[];

export default class DataChartService {
  constructor(private dataChartRepo: DataChartRepo) {}

  async getChartData(params: ChartDataParams, done: Callback<ChartData>) {
    try {
      const itens = await this.dataChartRepo.getData({
        groupBy: params.category,
        limit: params.limit,
      });

      done(null, itens);
    } catch (err) {
      done(err as Error, null);
    }
  }
}
