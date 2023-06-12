import {Component} from '@angular/core';
import {Criterion} from "./models/criterion.model";
import {MessageService} from "primeng/api";
import {HttpClient} from "@angular/common/http";
import {ApiEndpoints} from "./consts/api-endpoints";
import {RankingResponse} from "./models/ranking-response.model";
import {Parameters} from "./models/parameters.model";
import {DataInputMethodType} from "./models/data-input-method-type.enum";
import {DataInputMethod} from "./models/data-input-method.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})
export class AppComponent {
  public title = 'promethee2-frontend';

  public criteria: Criterion[];
  public parameters: Parameters;

  public rankingResponse: RankingResponse;
  public loading = false;

  public dataInputMethodOptions: DataInputMethod[] = [
    {name: 'JSON', value: DataInputMethodType.JSON},
    {name: 'CSV', value: DataInputMethodType.CSV},
  ];

  public dataInputMethod: DataInputMethodType;

  constructor(private messageService: MessageService,
              private http: HttpClient,) {
  }

  public setCriteria(criteria: Criterion[]): void {
    this.criteria = criteria;
  }

  public setRankingResponse(ranking: RankingResponse): void {
    this.rankingResponse = ranking;
  }

  public setParameters(parameters: Parameters): void {
    console.log(parameters);
    this.parameters = parameters;
  }

  public onUpload(event: any) {
    console.log(event)
    const url = ApiEndpoints.PROMETHEE_II_RANK;
    if (event.files.length == 1) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: '2 files necessary!'
      });
    } else {

      const formData = new FormData();
      console.log(this.parameters)
      formData.append('normalization',this.parameters.normalizationMethod);
      formData.append('weights',this.parameters.weightSelectionMethod);
      formData.append('showGaia',this.parameters.showGaia ? 'True' : 'False');
      for (let i = 0; i < 2; i++) {
        const fileName = event.files[i].name.toLowerCase();
        if (fileName.includes('alternatives')) {
          formData.append('alternatives', event.files[i]);
        } else if (fileName.includes('criteria')) {
          formData.append('criteria', event.files[i]);
        }
      }
      console.log(event.files[0].name);
      console.log(event.files[1].name);
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

  // public isInputJson(): boolean{
  //   if (this.parameters && this.parameters.dataInput) {
  //     console.log(this.parameters.dataInput);
  //     return this.parameters.dataInput === DataInputMethodType.JSON;
  //   }
  //   return false;
  // }

}
