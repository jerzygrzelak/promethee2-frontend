import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MessageService} from "primeng/api";
import {NormalizationMethodType} from "../../models/normalization-method-type.enum";
import {WeightSelectionMethodType} from "../../models/weight-selection-method-type.enum";
import {DataInputMethodType} from "../../models/data-input-method-type.enum";
import {Parameters} from "../../models/parameters.model";
import {WeightSelectionMethod} from "../../models/weight-selection-method.model";
import {NormalizationMethod} from "../../models/normalization-method.model";
import {DataInputMethod} from "../../models/data-input-method.model";

@Component({
  selector: 'app-parameters-form',
  templateUrl: './parameters-form.component.html',
  styleUrls: ['./parameters-form.component.scss']
})

export class ParametersFormComponent implements OnInit {

  @Output()
  public parametersChangeEvent = new EventEmitter<Parameters>();

  public parametersForm: FormGroup;

  constructor(private fb: FormBuilder, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.parametersForm = this.fb.group({
      normalizationMethod: this.fb.control({value: NormalizationMethodType.MIN_MAX, disabled: false}),
      weightSelectionMethod: this.fb.control({value: WeightSelectionMethodType.CUSTOM, disabled: false}),
      showGaia:  this.fb.control({value: true, disabled: false}),
      dataInputMethod: this.fb.control({value: DataInputMethodType.JSON, disabled: false}),
    });
    this.parametersChangeEvent.emit(this.parametersForm.value);
    this.parametersForm.valueChanges.subscribe(formValue => {
      // console.log(formValue);
      this.parametersChangeEvent.emit(formValue);
    });
  }

  public normalizationMethodOptions: NormalizationMethod[] = [
    {name: 'Min-Max', value: NormalizationMethodType.MIN_MAX},
    {name: 'Maximum', value: NormalizationMethodType.MAX},
    {name: 'Sum', value: NormalizationMethodType.SUM},
    {name: 'Sum\'s square root', value: NormalizationMethodType.SQRT_SUM},
    {name: 'Logarithmic', value: NormalizationMethodType.LOG},
  ];

  public weightSelectionMethodOptions: WeightSelectionMethod[] = [
    {name: 'Custom weights', value: WeightSelectionMethodType.CUSTOM},
    {name: 'Entropy', value: WeightSelectionMethodType.ENTROPY},
    {name: 'Standard deviation', value: WeightSelectionMethodType.STD_DEV}
  ];

  public dataInputMethodOptions: DataInputMethod[] = [
    {name: 'JSON', value: DataInputMethodType.JSON},
    {name: 'CSV', value: DataInputMethodType.CSV},
  ];

}
