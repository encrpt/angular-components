import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'random',
})
export class RandomPipe implements PipeTransform {
  transform(value: number, minValue: number): number {
    return value * Math.random() + minValue;
  }
}
