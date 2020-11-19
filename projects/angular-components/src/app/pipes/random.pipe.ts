import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'random'
})
export class RandomPipe implements PipeTransform {

  transform(value: number, minValue: number): unknown {
    return value * Math.random() + minValue;
  }

}
