import {Component} from '@angular/core';
import {Criterion} from "./models/criterion.model";
import {FileUploadModule} from 'primeng/fileupload';
import {MessageService} from "primeng/api";
import {HttpClient} from "@angular/common/http";
import {ApiEndpoints} from "./consts/api-endpoints";
import {RankingItem} from "./models/ranking-item.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})
export class AppComponent {
  public title = 'promethee2-frontend';

  public criteria: Criterion[];

  public ranking: RankingItem[];

  constructor(private messageService: MessageService,
              private http: HttpClient,) {}

  public setCriteria(criteria: Criterion[]): void {
    this.criteria = criteria;
  }

  public setRanking(ranking: RankingItem[]): void {
    this.ranking = ranking;
  }

  public onUpload(event: any) {
    console.log(event)
    const url = ApiEndpoints.PROMETHEE_II_RANK;

    const formData = new FormData();

    formData.append('criteria', event.files[0]);
    formData.append('alternatives', event.files[1]);
    console.log(formData);
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Files Uploaded' });

    this.http.post(url, formData).subscribe({
      next: (v) => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Response fetched!'});
        console.log('Response:', v);
        this.ranking = v as RankingItem[];
      },
      error: (e) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Something went wrong! Open console for more information.'});
        console.error('Error:', e);
      }
    });
  }


}
