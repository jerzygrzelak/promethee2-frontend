import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MessageService} from "primeng/api";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CriterionType} from "../../models/criterion-type.model";
import {CriterionTypeValue} from "../../models/criterion-type-value.enum";
import {Criterion} from "../../models/criterion.model";

@Component({
  selector: 'app-criteria-form',
  templateUrl: './criteria-form.component.html',
  styleUrls: ['./criteria-form.component.scss'],
  providers: [MessageService]
})

export class CriteriaFormComponent implements OnInit {

  @Output()
  public criteriaSubmitEvent = new EventEmitter<Criterion[]>();

  public typeOptions: CriterionType[] = [
    {name: 'Gain', value: CriterionTypeValue.GAIN},
    {name: 'Cost', value: CriterionTypeValue.COST}
  ];

  public criteriaForm: FormGroup;

  constructor(private fb: FormBuilder, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.criteriaForm = this.fb.group({
      criteria: this.fb.array([
        this.createCriterion(),
      ])
    });
  }

  createCriterion(): FormGroup {
    return this.fb.group({
      name: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      weight: new FormControl(null, Validators.required),
    });
  }

  get criteria(): FormArray {
    return this.criteriaForm.get('criteria') as FormArray;
  }

  public addCriterion(): void {
    console.log(this.criteria);
    this.criteria.push(this.createCriterion());
  }

  public removeCriterion(index: number): void {
    console.log(this.criteria.length);
    this.criteria.removeAt(index);
  }

  public onSubmit(): void {
    console.log(this.criteriaForm);
    if (this.criteriaForm.valid) {
      this.criteriaSubmitEvent.emit(this.criteriaForm.controls['criteria'].value);
      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Criteria form submitted!'});
    } else {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please fill all required fields!'});
    }
  }

  public printCriterion(criterion: any) {
    console.log(criterion)
  }

  protected readonly FormGroup = FormGroup;
}
