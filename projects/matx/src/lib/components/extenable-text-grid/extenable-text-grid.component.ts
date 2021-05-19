import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControlOptions,
  FormArray,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import * as uuid from 'uuid';
import { GridTable, GridTableHeader, ColumnState } from './model';

@Component({
  selector: 'lib-extenable-text-grid',
  templateUrl: './extenable-text-grid.component.html',
  styleUrls: ['./extenable-text-grid.component.scss'],
})
export class ExtenableTextGridComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

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
      // this.gridData.headerRows = [];
      if (this.gridData.headerRows && this.gridData.headerRows.length) {
        this.usePropAsHeader = false;
        // do not convert exising mappings on submit
        this.headerRow = this.gridData.headerRows.map((i) => {
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
        // only supported if headerRows provided
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
    const row = this.createRow(rowIndex + ' added');
    this.dataRows = [
      ...this.dataRows.slice(0, rowIndex),
      row,
      ...this.dataRows.slice(rowIndex),
    ];
  }

  deleteRow(rowIndex: number) {
    this.dataRows = [
      ...this.dataRows.slice(0, rowIndex),
      ...this.dataRows.slice(rowIndex + 1),
    ];
  }

  addColumn(colIndex: number, fieldName: string = '') {
    fieldName = fieldName.trim();
    // check if prop exists
    const found = this.headerRow
      .map((i) => i.label)
      .find((i) => i === fieldName);
    if (!found || !this.usePropAsHeader) {
      const addedUuid = this.getUuid();
      fieldName = fieldName ? fieldName : addedUuid;
      this.headerRow = [
        ...this.headerRow.slice(0, colIndex),
        { key: addedUuid, label: fieldName },
        ...this.headerRow.slice(colIndex),
      ];
      this.dataRows.forEach((row, rowIndex) => {
        row[addedUuid] === this.allowEditHeaderRows && rowIndex === 0
          ? fieldName
          : '';
      });
    } else {
      alert(`property ${fieldName} already exists`);
      console.log(`property ${fieldName} already exists`);
    }
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
        const found = this.headerRow.find(
          (i) => i.state !== ColumnState.EXISTING && i.key === uuid
        );
        const key = found ? found.label : uuid;
        result[key] = row[uuid];
      });
      return result;
    });
    if (this.usePropAsHeader) {
      this.submitted.emit({ tableRows, headerRows: [] });
    } else {
      this.submitted.emit({ tableRows, headerRows: this.headerRow });
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

  editHeader(key: string) {
    const value = this.dataRows[0][key];
    console.log(value);
  }

  editRow(index) {
    const row = this.dataRows[index];
    console.log(row);
  }
}
