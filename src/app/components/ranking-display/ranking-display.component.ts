import {Component, Input} from '@angular/core';
import {RankingItem} from "../../models/ranking-item.model";
import {Criterion} from "../../models/criterion.model";

@Component({
  selector: 'app-ranking-display',
  templateUrl: './ranking-display.component.html',
  styleUrls: ['./ranking-display.component.scss']
})
export class RankingDisplayComponent {

  private _ranking: RankingItem[];

  @Input()
  public set ranking(value: RankingItem[]) {
    this._ranking = value;
    console.log(this._ranking);
  };

  public get ranking(): RankingItem[] {
    return this._ranking;
  }
}
