import { KeyValue } from '@angular/common';
import { ValidatorFn } from '@angular/forms';
export interface AutocompleteDataConfig {
  enums: any;
  keyValueArray?: KeyValue<string, string>[];
  sorting?: boolean;
  userDefined?: boolean;
  additionalValidators?: ValidatorFn[];
}
