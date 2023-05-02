import {CriterionTypeValue} from "./criterion-type-value.enum";

export interface Criterion {
  name: string;
  type: CriterionTypeValue;
  weight: number;
}
