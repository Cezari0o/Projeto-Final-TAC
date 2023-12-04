import { Category } from "../../types";

export default interface DataChartRepo {
  getCategory: (category: string | string[]) => Promise<Category[]>;
}
