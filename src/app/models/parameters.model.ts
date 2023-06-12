import {NormalizationMethodType} from "./normalization-method-type.enum";
import {WeightSelectionMethodType} from "./weight-selection-method-type.enum";
import {DataInputMethodType} from "./data-input-method-type.enum";

export interface Parameters {
  normalizationMethod: NormalizationMethodType,
  weightSelectionMethod: WeightSelectionMethodType,
  dataInputMethod: DataInputMethodType;
  showGaia: boolean,
}
