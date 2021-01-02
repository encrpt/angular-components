import { Pipe, PipeTransform } from '@angular/core';
import linkifyStr from 'linkifyjs/string';

@Pipe({
  name: 'renderLink',
})
export class RenderLinkPipe implements PipeTransform {
  transform(text: string): unknown {
    return linkifyStr(text);
  }
}
