import { KeyValue } from '@angular/common';

export interface SelectOptions {
  key: string;
  label: string;
  options: KeyValue<number, string>[];
}

export interface ValueItem {
  id?: number;
  children?: ValueItem[];
  [key: string]: any;
}
