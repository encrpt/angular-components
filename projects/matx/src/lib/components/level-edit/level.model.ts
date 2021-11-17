import { KeyValue } from '@angular/common';

export interface SelectOptions {
  key: string;
  label: string;
  options: KeyValue<number, string>[];
}

export interface ValueItem {
  [key: string]: any;
  id?: number;
  children?: ValueItem[];
}
