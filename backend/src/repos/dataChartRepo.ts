import { Category, DataCount } from "../../types";
import { CategoriaCountType } from "./dataProcessRepo";

export interface DataChartProps {
  groupBy?: CategoriaCountType[] | CategoriaCountType;
  limit?: number;
}

export interface CategoryGroup extends Category {
  data: DataCount[];
}

export default interface DataChartRepo {
  getCategory: (category?: string | string[]) => Promise<Category[]>;

  getData: (options?: DataChartProps) => Promise<CategoryGroup[] | DataCount[]>;
}
