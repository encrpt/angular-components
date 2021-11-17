import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  SelectOptions,
  ValueItem,
} from 'projects/matx/src/lib/components/level-edit/level.model';

@Injectable({
  providedIn: 'root',
})
export class LevelExampleService {
  constructor() {}

  getLevelSelect(level: number, selectCount: number) {
    const result: SelectOptions[] = [];
    for (let i = 1; i <= selectCount; i++) {
      const optionsCount = Math.round(Math.random() * 10) + 2;
      const dataSelect: SelectOptions = {
        key: `Key_${level}_${i}`,
        label: `Label_${level}_${i}`,
        options: [],
      };
      dataSelect.options = Array.from(Array(optionsCount).keys()).map(
        (_, index) => ({
            key: index + 1,
            value: `Option_${level}_${i}_${(index + 1)
              .toString()
              .padStart(2, '0')}`,
          })
      );
      result.push(dataSelect);
    }
    return result;
  }

  exampleValuesFromSelected(exampleCount, selectOptions: SelectOptions[]) {
    const result: ValueItem[] = [];
    for (let i = 1; i <= exampleCount; i++) {
      const item: ValueItem = selectOptions.reduce(
        (a, selectOption) => {
          const maxCount = selectOption.options.length;
          const selectedId = Math.floor(Math.random() * maxCount);
          const selectedOption = selectOption.options[selectedId];
          a[selectOption.key] = selectedOption.key;
          return a;
        },
        { id: i }
      );
      result.push(item);
    }

    return result;
  }
}
