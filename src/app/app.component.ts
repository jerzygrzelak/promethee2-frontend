import {Component} from '@angular/core';
import {Criterion} from "./models/criterion.model";
import {MessageService} from "primeng/api";
import {HttpClient} from "@angular/common/http";
import {ApiEndpoints} from "./consts/api-endpoints";
import {RankingResponse} from "./models/ranking-response.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})
export class AppComponent {
  public title = 'promethee2-frontend';

  public criteria: Criterion[];

  public rankingResponse: RankingResponse;
  public loading = false;

  constructor(private messageService: MessageService,
              private http: HttpClient,) {
  }

  public setCriteria(criteria: Criterion[]): void {
    this.criteria = criteria;
  }

  public setRankingResponse(ranking: RankingResponse): void {
    this.rankingResponse = ranking;
  }

  public onUpload(event: any) {
    console.log(event)
    const url = ApiEndpoints.PROMETHEE_II_RANK;

    const formData = new FormData();

    formData.append('criteria', event.files[0]);
    formData.append('alternatives', event.files[1]);
    formData.append('showGaia', 'True')
    console.log(formData);
    this.messageService.add({severity: 'info', summary: 'Success', detail: 'Files Uploaded'});
    this.loading = true;
    this.http.post(url, formData).subscribe({
      next: (v) => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Response fetched!'});
        console.log('Response:', v);
        this.loading = false;
        this.rankingResponse = v as RankingResponse;
      },
      error: (e) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong! Open console for more information.'
        });
        this.loading = false;
        console.error('Error:', e);
      }
    });
  }


}
