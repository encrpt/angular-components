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

@Component({
  selector: 'lib-extenable-form-grid',
  templateUrl: './extenable-form-grid.component.html',
  styleUrls: ['./extenable-form-grid.component.scss'],
})
export class ExtenableFormGridComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  @Input()
  gridData: any = [];

  @Input()
  usePropAsHeader: boolean = true;

  @Output()
  submitted: EventEmitter<any> = new EventEmitter();

  public formGroup: FormGroup;
  public rowProperties: KeyValue<string, string>[] = []; // map guid to field
  public rowIds: KeyValue<number, string>[] = [];

  // private
  private rowFromgroups: FormGroup[] = [];
  ngOnInit(): void {
    // create existing fields

    if (this.gridData.length) {
      this.rowProperties = Object.keys(this.gridData[0]).map((key) => {
        return { key: uuid.v4(), value: key };
      });
      this.rowIds = this.gridData.map((i, index) => index);

      // init rows
      this.rowFromgroups = this.gridData.map((values: any) =>
        this.createRow(values)
      );
    }

    this.formGroup = this.formBuilder.group({
      rows: new FormArray(this.rowFromgroups),
    });

    console.log(this.rowIds.length);
  }

  createRow(values: any): FormGroup {
    const controlOptions: AbstractControlOptions = {};

    const controlsConfig = this.rowProperties.reduce((acc, rowProperty) => {
      acc[rowProperty.key] = this.formBuilder.control({
        value: values[rowProperty.value] ? values[rowProperty.value] : '',
        disabled: false,
      });
      return acc;
    }, {});
    const fg = this.formBuilder.group(controlsConfig, controlOptions);
    return fg;
  }

  insertRow(rowIndex: number) {
    const rows = this.formGroup.controls['rows'] as FormArray;
    const row = this.createRow(rowIndex + ' added');
    rows.insert(rowIndex, row);
  }

  deleteRow(rowIndex: number) {
    const rows = this.formGroup.controls['rows'] as FormArray;
    rows.removeAt(rowIndex);
  }

  addColumn(colIndex: number, fieldName: string = '') {
    fieldName = fieldName.trim();

    // check if prop exists
    const found = this.rowProperties
      .map((i) => i.value)
      .find((i) => i === fieldName);
    if (!found) {
      const addedUuid = uuid.v4();
      this.rowProperties = [
        ...this.rowProperties.slice(0, colIndex),
        { key: addedUuid, value: fieldName ? fieldName : addedUuid },
        ...this.rowProperties.slice(colIndex),
      ];
      const rows = this.formGroup.controls['rows'] as FormArray;
      const rowControls: FormGroup[] = rows.controls as FormGroup[];
      rowControls.forEach((rowFormGroup) => {
        const addedControl = this.formBuilder.control({
          value: ``,
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
    const propToDelete = this.rowProperties[colIndex];
    this.rowProperties = [
      ...this.rowProperties.slice(0, colIndex),
      ...this.rowProperties.slice(colIndex + 1),
    ];

    const rows = this.formGroup.controls['rows'] as FormArray;
    const rowControls: FormGroup[] = rows.controls as FormGroup[];
    rowControls.forEach((rowFormGroup) => {
      rowFormGroup.removeControl(propToDelete.key);
    });
  }

  submitAction() {
    const data = this.formGroup.value['rows'].map((row) => {
      const result = {};
      Object.keys(row).map((key) => {
        const found = this.rowProperties.find((i) => i.key === key);
        result[found ? found.value : key] = row[key];
      });
      return result;
    });

    this.log();
    this.submitted.emit(data);
  }

  drop(event: CdkDragDrop<any>) {
    const rows = this.formGroup.controls['rows'] as FormArray;
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
    const data = this.formGroup.value['rows'].map((row) => {
      const result = {};
      Object.keys(row).map((key) => {
        const found = this.rowProperties.find((i) => i.key === key);
        result[found ? found.value : key] = row[key];
      });
      return result;
    });

    data.forEach((row) => {
      console.log(row);
    });
  }

  dropColumnSort(event: CdkDragDrop<any>) {
    console.log(event);
    moveItemInArray(
      this.rowProperties,
      event.previousIndex,
      event.currentIndex
    );
  }
}
