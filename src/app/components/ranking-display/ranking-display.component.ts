import {Component, Input} from '@angular/core';
import {RankingItem} from "../../models/ranking-item.model";
import {RankingResponse} from "../../models/ranking-response.model";
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-ranking-display',
  templateUrl: './ranking-display.component.html',
  styleUrls: ['./ranking-display.component.scss']
})
export class RankingDisplayComponent {
  constructor(private sanitizer: DomSanitizer) {
  }

  public ranking: RankingItem[];
  public gaia: SafeResourceUrl;
  public gaiaValue: string;
  public displayBasic: boolean;

  @Input()
  public isLoading: boolean;

  @Input()
  public set data(value: RankingResponse) {
    this.ranking = value.alternatives;
    this.gaiaValue = value.gaia;
    this.gaia = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
      + value.gaia);
  };

  // public get ranking(): RankingItem[] {
  //   return this.ranking;
  // }
}
