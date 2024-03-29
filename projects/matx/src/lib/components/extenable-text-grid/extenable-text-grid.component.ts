import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, finalize } from 'rxjs/operators';
import * as uuid from 'uuid';
import { GridFormComponent } from '../grid-form/grid-form.component';
import {
  ColumnState,
  GridTable,
  GridTableHeader,
} from '../extenable-form-grid/model';

@Component({
  selector: 'lib-extenable-text-grid',
  templateUrl: './extenable-text-grid.component.html',
  styleUrls: ['./extenable-text-grid.component.scss'],
})
export class ExtenableTextGridComponent implements OnInit {
  @Input()
  gridData: GridTable;

  // properties can be edited and MUST in values of first row
  @Input()
  allowEditHeaderRows = false;

  @Output()
  submitted: EventEmitter<GridTable> = new EventEmitter();

  public dataRows: any[] = [];
  public headerRow: GridTableHeader[] = [];

  public usePropAsHeader = true;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    // create existing fields
    console.log(this.gridData);
    if (this.gridData) {
      // this.gridData.headerRow = [];
      if (this.gridData.headerRow && this.gridData.headerRow.length) {
        this.usePropAsHeader = false;
        // do not convert exising mappings on submit
        this.headerRow = this.gridData.headerRow.map((i) => ({
          key: i.key,
          label: i.label,
          state: ColumnState.existing,
        }));
        // init form rows
        if (this.allowEditHeaderRows) {
          const headerValues = this.headerRow.reduce((acc: any, i) => {
            acc[i.key] = i.label;
            return acc;
          }, {});
          this.dataRows = [
            this.createRow(headerValues),
            ...this.gridData.tableRows.map((values: any) =>
              this.createRow(values)
            ),
          ];
        } else {
          this.dataRows = this.gridData.tableRows.map((values: any) =>
            this.createRow(values)
          );
        }
      } else {
        this.usePropAsHeader = true;
        // only supported if headerRow provided
        this.allowEditHeaderRows = false;
        if (this.gridData.tableRows.length) {
          this.headerRow = Object.keys(this.gridData.tableRows[0]).map(
            (key) => ({ key: this.getUuid(), label: key })
          );
          this.dataRows = this.gridData.tableRows.map((values: any) =>
            this.createRow(values)
          );
        }
      }
    }
  }

  getUuid(): string {
    return uuid.v4();
  }

  createRow(values: any): any {
    const row = this.headerRow.reduce((acc: any, rowProperty) => {
      const key = this.usePropAsHeader ? rowProperty.label : rowProperty.key;

      acc[rowProperty.key] = values[key] ? values[key] : '';
      return acc;
    }, {});

    return row;
  }

  addRow(rowIndex: number): void {
    this.editRow(rowIndex, true);
  }

  deleteRow(rowIndex: number): void {
    this.dataRows = [
      ...this.dataRows.slice(0, rowIndex),
      ...this.dataRows.slice(rowIndex + 1),
    ];
  }

  addColumn(colIndex: number): void {
    // check if prop exists
    const addedUuid = this.getUuid();
    this.editHeader(addedUuid, colIndex);
  }

  deleteColumn(colIndex: number): void {
    const propToDelete = this.headerRow[colIndex];
    this.headerRow = [
      ...this.headerRow.slice(0, colIndex),
      ...this.headerRow.slice(colIndex + 1),
    ];
    this.dataRows.forEach((row) => {
      delete row[propToDelete.key];
    });
  }

  submitAction(): void {
    // this.log();

    if (this.usePropAsHeader) {
      const tableRows = this.dataRows.map((row: any) => {
        const result: any = {};
        Object.keys(row).map((uuidKey) => {
          const found = this.headerRow.find((i) => i.key === uuidKey);
          // should always exists
          const key = found ? found.label : uuidKey;
          result[key] = row[uuidKey];
        });
        return result;
      });
      this.submitted.emit({ tableRows, headerRow: [] });
    } else {
      if (this.allowEditHeaderRows) {
        this.submitted.emit({
          tableRows: this.dataRows.slice(1),
          headerRow: this.headerRow,
        });
      } else {
        // no edit - same props allowed
        this.submitted.emit({
          tableRows: this.dataRows,
          headerRow: this.headerRow,
        });
      }
    }
  }

  dropRowSort(event: CdkDragDrop<any>): void {
    moveItemInArray(this.dataRows, event.previousIndex, event.currentIndex);
  }
  dropColumnSort(event: CdkDragDrop<any>): void {
    moveItemInArray(this.headerRow, event.previousIndex, event.currentIndex);
  }

  log(): void {
    const data = this.dataRows.map((row: any) => {
      const result: any = {};
      Object.keys(row).map((uuidKey) => {
        const found = this.headerRow.find(
          (i) => i.state !== ColumnState.existing && i.key === uuidKey
        );
        uuidKey = found ? found.label : uuidKey;
        result[uuidKey] = row[uuidKey];
      });
      return result;
    });

    data.forEach((row: any) => {
      console.log(row);
    });
  }

  editHeader(key: string, colIndex?: number): void {
    const dialogRef = this.dialog.open(GridFormComponent, {
      data: {
        headerRow: this.headerRow,
        headerKey: key,
      },
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter((data) => data),
        finalize(() => console.log('completed'))
      )
      .subscribe((data) => {
        let fieldLabel = data[key].trim();
        if (colIndex == null) {
          // null and undefined
          this.headerRow = this.headerRow.map((i) =>
            i.key === key ? { key, label: fieldLabel } : i
          );
          this.dataRows[0] = Object.keys(this.dataRows[0]).reduce((a, k) => {
            if (k === key) {
              a[k] = fieldLabel;
            } else {
              a[k] = this.dataRows[0][k];
            }

            return a;
          }, {});
        } else {
          console.log('Dialog output:', fieldLabel);
          // check if prop exists
          const found = this.headerRow
            .map((i) => i.label)
            .find((i) => i === fieldLabel);
          if (!found || !this.usePropAsHeader) {
            fieldLabel = fieldLabel ? fieldLabel : key;
            this.headerRow = [
              ...this.headerRow.slice(0, colIndex),
              { key, label: fieldLabel },
              ...this.headerRow.slice(colIndex),
            ];
            this.dataRows.forEach((row, rowIndex) => {
              row[key] =
                this.allowEditHeaderRows && rowIndex === 0 ? fieldLabel : '';
            });
          } else {
            alert(`property ${fieldLabel} already exists`);
            console.log(`property ${fieldLabel} already exists`);
          }
        }
      });
  }

  editRow(index: number, isCreate = false): void {
    const row = isCreate ? this.createRow({}) : this.dataRows[index];
    const dialogRef = this.dialog.open(GridFormComponent, {
      data: {
        headerRow: this.headerRow,
        row,
      },
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter((data) => data),
        finalize(() => console.log('completed'))
      )

      .subscribe((data) => {
        if (isCreate) {
          // check property exists
          const inputExists = Object.keys(data).find((key) => data[key]);
          if (inputExists) {
            this.dataRows = [
              ...this.dataRows.slice(0, index),
              data,
              ...this.dataRows.slice(index),
            ];
          }
        } else {
          this.dataRows[index] = Object.keys(this.dataRows[index]).reduce(
            (a: any, key) => {
              if (!(key in data)) {
                throw new Error('Missing key: ' + key);
              }
              a[key] = data[key];
              return a;
            },
            {}
          );
        }
      });
  }
}
