import {RankingItem} from "./ranking-item.model";

export interface RankingResponse {
  alternatives: RankingItem[];
  gaia: string;
}
