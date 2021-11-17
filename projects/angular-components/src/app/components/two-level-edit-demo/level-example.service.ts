import { Injectable } from '@angular/core';
import {
  SelectOptions,
  ValueItem,
} from 'projects/matx/src/lib/components/level-edit/level.model';

const separator = '_';
@Injectable({
  providedIn: 'root',
})
export class LevelExampleService {
  constructor() {}

  getLevelSelect(level: number, selectCount: number): SelectOptions[] {
    const result: SelectOptions[] = [];
    for (let i = 1; i <= selectCount; i++) {
      const optionsCount = Math.round(Math.random() * 10) + 2;
      const dataSelect: SelectOptions = {
        key: `Key_${level}${separator}${i}`,
        label: `Label_${level}${separator}${i}`,
        options: [],
      };
      dataSelect.options = Array.from(Array(optionsCount).keys()).map(
        (_, index) => ({
          key: index + 1,
          value: `Option_${level}${separator}${i}${separator}${(index + 1)
            .toString()
            .padStart(2, '0')}`,
        })
      );
      result.push(dataSelect);
    }
    return result;
  }

  exampleValuesFromSelected(
    exampleCount: number,
    selectOptions: SelectOptions[]
  ): ValueItem[] {
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
