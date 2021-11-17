import { Pipe, PipeTransform } from '@angular/core';
import { SelectOptions } from './level.model';

@Pipe({
  name: 'optionLabel',
})
export class OptionLabelPipe implements PipeTransform {
  transform(
    value: any,
    selectKey: string,
    selectOptions: SelectOptions[]
  ): unknown {
    const selectOption = selectOptions.find((i) => i.key === selectKey);
    const selected = selectOption.options.find((i) => i.key === value);
    return selected.value;
  }
}
