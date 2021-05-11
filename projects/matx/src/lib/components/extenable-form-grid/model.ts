export interface GridTable {
  tableRows: any[];
  headerRows?: GridTableHeader[];
}

export interface GridTableHeader {
  key: string;
  label: string;
  state?: ColumnState;
}

export enum ColumnState {
  EXISTING,
  NEW,
}
