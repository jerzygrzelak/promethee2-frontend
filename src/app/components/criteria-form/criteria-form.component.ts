import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {MessageService} from "primeng/api";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CriterionType} from "../../models/criterion-type.model";
import {CriterionTypeValue} from "../../models/criterion-type-value.enum";
import {Criterion} from "../../models/criterion.model";
import {PreferenceFunction} from "../../models/preference-function.model";
import {PreferenceFunctionType} from "../../models/preference-function-type.enum";

@Component({
  selector: 'app-criteria-form',
  templateUrl: './criteria-form.component.html',
  styleUrls: ['./criteria-form.component.scss'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None,
})

export class CriteriaFormComponent implements OnInit {

  @Output()
  public criteriaSubmitEvent = new EventEmitter<Criterion[]>();

  public typeOptions: CriterionType[] = [
    {name: 'Gain', value: CriterionTypeValue.GAIN},
    {name: 'Cost', value: CriterionTypeValue.COST}
  ];

  public preferenceFunctionOptions: PreferenceFunction[] = [
    {name: 'Usual', value: PreferenceFunctionType.USUAL},
    {name: 'U-shape', value: PreferenceFunctionType.U_SHAPE},
    {name: 'V-shape', value: PreferenceFunctionType.V_SHAPE},
    {name: 'Level', value: PreferenceFunctionType.LEVEL},
    {name: 'Linear', value: PreferenceFunctionType.LINEAR},
    {name: 'Gaussian', value: PreferenceFunctionType.GAUSSIAN},
    {name: 'Preservative', value: PreferenceFunctionType.PRESERVATIVE}
  ];

  public criteriaForm: FormGroup;
  public criteriaCount: number;
  public threshold1: string;
  public threshold2: string;

  constructor(private fb: FormBuilder, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.criteriaForm = this.fb.group({
      criteria: this.fb.array([
        this.createCriterion(1),
        this.createCriterion(2),
      ])
    });
    this.criteriaCount = 2;
  }

  createCriterion(num: number): FormGroup {
    return this.fb.group({
      name: new FormControl(`C${num}`, Validators.required),
      type: new FormControl(CriterionTypeValue.GAIN, Validators.required),
      weight: new FormControl(1, Validators.required),
      preferenceFunction: new FormControl(PreferenceFunctionType.USUAL, Validators.required)
    });
  }

  get criteria(): FormArray {
    return this.criteriaForm.get('criteria') as FormArray;
  }

  public addCriterion(): void {
    console.log(this.criteria);
    this.criteriaCount += 1;
    this.criteria.push(this.createCriterion(this.criteriaCount));
  }

  public removeCriterion(index: number): void {
    console.log(this.criteria.length);
    this.criteria.removeAt(index);
  }

  public addParameterValue(event: any, ind: number): void {
    console.log(event.originalEvent);
    console.log(event.value);
    console.log('criteria index:', ind);
    console.log(this.criteriaForm);

    const criteriaFormGroup = (this.criteriaForm.controls['criteria'] as FormGroup).controls[ind] as FormGroup;

    if (criteriaFormGroup.controls['threshold1']) {
      criteriaFormGroup.removeControl('threshold1');
    }
    if (criteriaFormGroup.controls['threshold2']) {
      criteriaFormGroup.removeControl('threshold2');
    }

    switch (event.value) {
      case PreferenceFunctionType.U_SHAPE:
      case PreferenceFunctionType.V_SHAPE:
      case PreferenceFunctionType.GAUSSIAN:
        criteriaFormGroup.addControl('threshold1', new FormControl(null, Validators.required));
        break;
      case PreferenceFunctionType.LINEAR:
      case PreferenceFunctionType.LEVEL:
        criteriaFormGroup.addControl('threshold1', new FormControl(null, Validators.required));
        criteriaFormGroup.addControl('threshold2', new FormControl(null, Validators.required));
        break;
    }

    switch (event.value) {
      case PreferenceFunctionType.U_SHAPE:
        this.threshold1 = 'q';
        break;
      case PreferenceFunctionType.V_SHAPE:
        this.threshold1 = 'p';
        break;
      case PreferenceFunctionType.GAUSSIAN:
        this.threshold1 = 's';
        break;
      case PreferenceFunctionType.LINEAR:
      case PreferenceFunctionType.LEVEL:
        this.threshold1 = 'p';
        this.threshold2 = 'q';
        break;
    }
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
