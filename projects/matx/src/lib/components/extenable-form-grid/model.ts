export interface GridTable {
  tableRows: any[];
  headerRow?: GridTableHeader[];
}

export interface GridTableHeader {
  key: string;
  label: string;
  state?: ColumnState;
}

export enum ColumnState {
  existing,
  new,
}
