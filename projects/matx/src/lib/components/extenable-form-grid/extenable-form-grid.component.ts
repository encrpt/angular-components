import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
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
  selector: 'lib-extenable-form-grid',
  templateUrl: './extenable-form-grid.component.html',
  styleUrls: ['./extenable-form-grid.component.scss'],
})
export class ExtenableFormGridComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({});
  }

  @Input()
  gridData: GridTable;

  // properties can be edited and MUST in values of first row
  @Input()
  allowEditHeaderRows = false;

  @Output()
  submitted: EventEmitter<GridTable> = new EventEmitter();

  public formGroup: FormGroup;
  public headerRow: GridTableHeader[] = [];

  public usePropAsHeader = true;

  // private
  private rowFromgroups: FormGroup[] = [];
  ngOnInit(): void {
    // create existing fields
    console.log(this.gridData);
    if (this.gridData) {
      // this.gridData.headerRow = [];
      if (this.gridData.headerRow && this.gridData.headerRow.length) {
        this.usePropAsHeader = false;
        // do not convert exising mappings on submit
        this.headerRow = this.gridData.headerRow.map((i) => ({ key: i.key, label: i.label, state: ColumnState.EXISTING }));
        // init form rows
        if (this.allowEditHeaderRows) {
          const headerValues = this.headerRow.reduce((acc: any, i) => {
            acc[i.key] = i.label;
            return acc;
          }, {});
          this.rowFromgroups = [
            this.createRow(headerValues),
            ...this.gridData.tableRows.map((values: any) =>
              this.createRow(values)
            ),
          ];
        } else {
          this.rowFromgroups = this.gridData.tableRows.map((values: any) =>
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
          this.rowFromgroups = this.gridData.tableRows.map((values: any) =>
            this.createRow(values)
          );
        }
      }
    }

    this.formGroup = this.formBuilder.group({
      rows: new FormArray(this.rowFromgroups),
    });
  }

  getUuid(): string {
    return uuid.v4();
  }

  createRow(values: any): FormGroup {
    const controlOptions: AbstractControlOptions = {};

    const controlsConfig = this.headerRow.reduce((acc: any, rowProperty) => {
      const key = this.usePropAsHeader ? rowProperty.label : rowProperty.key;

      acc[rowProperty.key] = this.formBuilder.control({
        value: values[key] ? values[key] : '',
        disabled: false,
      });
      return acc;
    }, {});
    const fg = this.formBuilder.group(controlsConfig, controlOptions);
    return fg;
  }

  addRow(rowIndex: number) {
    const rows = this.formGroup.controls.rows as FormArray;
    const row = this.createRow({});
    rows.insert(rowIndex, row);
  }

  deleteRow(rowIndex: number) {
    const rows = this.formGroup.controls.rows as FormArray;
    rows.removeAt(rowIndex);
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
      const rows = this.formGroup.controls.rows as FormArray;
      const rowControls: FormGroup[] = rows.controls as FormGroup[];
      rowControls.forEach((rowFormGroup, rowIndex) => {
        const addedControl = this.formBuilder.control({
          value: this.allowEditHeaderRows && rowIndex === 0 ? fieldName : '',
          disabled: false,
        });
        rowFormGroup.addControl(addedUuid, addedControl);
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

    const rows = this.formGroup.controls.rows as FormArray;
    const rowControls: FormGroup[] = rows.controls as FormGroup[];
    rowControls.forEach((rowFormGroup) => {
      rowFormGroup.removeControl(propToDelete.key);
    });
  }

  submitAction() {
    // this.log();
    const tableRows = this.formGroup.value.rows.map((row: any) => {
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
      this.submitted.emit({ tableRows });
    } else {
      this.submitted.emit({ tableRows, headerRow: this.headerRow });
    }
  }

  drop(event: CdkDragDrop<any>) {
    const rows = this.formGroup.controls.rows as FormArray;
    this.moveFormGroupInFormarray(
      rows,
      event.previousIndex,
      event.currentIndex
    );
  }

  moveFormGroupInFormarray(
    formArray: FormArray,
    previousIndex: number,
    currentIndex: number
  ) {
    if (currentIndex === -1) {
      currentIndex = formArray.length - 1;
    } else if (currentIndex == formArray.length) {
      currentIndex = 0;
    }

    const currentGroup = formArray.at(previousIndex);
    formArray.removeAt(previousIndex);
    formArray.insert(currentIndex, currentGroup);
  }

  log() {
    const data = this.formGroup.value.rows.map((row: any) => {
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

  dropColumnSort(event: CdkDragDrop<any>) {
    console.log(event);
    moveItemInArray(this.headerRow, event.previousIndex, event.currentIndex);
  }
}
