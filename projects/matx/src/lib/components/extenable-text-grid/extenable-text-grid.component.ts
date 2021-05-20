import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, finalize } from 'rxjs/operators';
import * as uuid from 'uuid';
import { GridFormComponent } from '../grid-form/grid-form.component';
import { ColumnState, GridTable, GridTableHeader } from './model';

@Component({
  selector: 'lib-extenable-text-grid',
  templateUrl: './extenable-text-grid.component.html',
  styleUrls: ['./extenable-text-grid.component.scss'],
})
export class ExtenableTextGridComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  @Input()
  gridData: GridTable;

  // properties can be edited and MUST in values of first row
  @Input()
  allowEditHeaderRows: boolean = false;

  @Output()
  submitted: EventEmitter<GridTable> = new EventEmitter();

  public dataRows: any[] = [];
  public headerRow: GridTableHeader[] = [];

  public usePropAsHeader = true;

  // private
  ngOnInit(): void {
    // create existing fields
    console.log(this.gridData);
    if (this.gridData) {
      // this.gridData.headerRow = [];
      if (this.gridData.headerRow && this.gridData.headerRow.length) {
        this.usePropAsHeader = false;
        // do not convert exising mappings on submit
        this.headerRow = this.gridData.headerRow.map((i) => {
          return { key: i.key, label: i.label, state: ColumnState.EXISTING };
        });
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
            (key) => {
              return { key: this.getUuid(), label: key };
            }
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

  addRow(rowIndex: number) {
    // TODO open popup
    const row = this.createRow({});
    this.dataRows = [
      ...this.dataRows.slice(0, rowIndex),
      row,
      ...this.dataRows.slice(rowIndex),
    ];
    this.editRow(rowIndex);
  }

  deleteRow(rowIndex: number) {
    this.dataRows = [
      ...this.dataRows.slice(0, rowIndex),
      ...this.dataRows.slice(rowIndex + 1),
    ];
  }

  addColumn(colIndex: number) {
    // check if prop exists
    const addedUuid = this.getUuid();
    this.editHeader(addedUuid, colIndex);
  }

  deleteColumn(colIndex: number) {
    const propToDelete = this.headerRow[colIndex];
    this.headerRow = [
      ...this.headerRow.slice(0, colIndex),
      ...this.headerRow.slice(colIndex + 1),
    ];
    this.dataRows.forEach((row) => {
      delete row[propToDelete.key];
    });
  }

  submitAction() {
    // this.log();
    const tableRows = this.dataRows.map((row: any) => {
      const result: any = {};
      Object.keys(row).map((uuid) => {
        // const found = this.headerRow.find(
        //   (i) => i.state !== ColumnState.EXISTING && i.key === uuid
        // );
        // const key = found ? found.label : uuid;
        result[uuid] = row[uuid];
      });
      return result;
    });
    if (this.usePropAsHeader) {
      this.submitted.emit({ tableRows, headerRow: [] });
    } else {
      this.submitted.emit({ tableRows, headerRow: this.headerRow });
    }
  }

  dropRowSort(event: CdkDragDrop<any>) {
    moveItemInArray(this.dataRows, event.previousIndex, event.currentIndex);
  }
  dropColumnSort(event: CdkDragDrop<any>) {
    moveItemInArray(this.headerRow, event.previousIndex, event.currentIndex);
  }

  log() {
    const data = this.dataRows.map((row: any) => {
      const result: any = {};
      Object.keys(row).map((uuid: string) => {
        const found = this.headerRow.find(
          (i) => i.state !== ColumnState.EXISTING && i.key === uuid
        );
        uuid = found ? found.label : uuid;
        result[uuid] = row[uuid];
      });
      return result;
    });

    data.forEach((row: any) => {
      console.log(row);
    });
  }

  editHeader(key: string, colIndex?: number) {
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
            k === key ? (a[k] = fieldLabel) : (a[k] = this.dataRows[0][k]);
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

  editRow(index) {
    const row = this.dataRows[index];
    const dialogRef = this.dialog.open(GridFormComponent, {
      data: {
        headerRow: this.headerRow,
        row: row,
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((data) => console.log('Dialog output:', data));
  }
}
