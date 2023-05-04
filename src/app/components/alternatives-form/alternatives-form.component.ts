import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Criterion} from "../../models/criterion.model";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiEndpoints} from "../../consts/api-endpoints";
import {RankingItem} from "../../models/ranking-item.model";

@Component({
  selector: 'app-alternatives-form',
  templateUrl: './alternatives-form.component.html',
  styleUrls: ['./alternatives-form.component.scss'],
  providers: [MessageService],
})

export class AlternativesFormComponent implements OnInit {

  @Output()
  public rankingResponseEvent = new EventEmitter<RankingItem[]>();

  private _criteria: Criterion[];

  @Input()
  public set criteria(value: Criterion[]) {
    this._criteria = value;
    console.log(this._criteria);
    if (value) {
      this.alternativesForm = this.fb.group({
        alternatives: this.fb.array([
          this.createAlternativeForm(),
          this.createAlternativeForm(),
        ])
      });
      console.log(this.alternativesForm);
    }
  };

  public get criteria(): Criterion[] {
    return this._criteria;
  }

  public alternativesForm: FormGroup;

  public isLoading = false;
  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private messageService: MessageService) {
  }

  public ngOnInit(): void {
  }

  public createAlternativeForm(): FormGroup {
    const formGroup = this.fb.group({
      name: ['', Validators.required]
    }) as unknown as FormGroup<{ [key: string]: AbstractControl }>;

    for (let i = 0; i < this.criteria.length; i++) {
      const criterion = this.criteria[i];
      formGroup.addControl(criterion.name, new FormControl(null, Validators.required));
    }

    return formGroup;
  }

  get alternatives(): FormArray {
    return this.alternativesForm.get('alternatives') as FormArray;
  }

  public addAlternative(): void {
    console.log(this.criteria);
    this.alternatives.push(this.createAlternativeForm());
  }

  public removeAlternative(index: number): void {
    this.alternatives.removeAt(index);
  }

  public onSubmit(): void {
    const url: string = ApiEndpoints.PROMETHEE_II_RANK;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (this.alternativesForm.valid) {
      const payload = {
        criteria: this.criteria,
        alternatives: this.alternativesForm.controls['alternatives'].value
      };
      this.isLoading = true;
      this.messageService.add({severity: 'info', summary: 'Info', detail: 'Request is sending...' });
      this.http.post(url, payload, {headers}).subscribe({
        next: (v) =>{
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Response fetched!'});
          this.isLoading = false;
          console.log('Response:', v)
          this.rankingResponseEvent.emit(v as RankingItem[]);
        },
        error: (e) => {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Something went wrong! Open console for more information.'});
          this.isLoading = false;
          return console.error('Error:', e)
        }
      });
    }
  }

}
