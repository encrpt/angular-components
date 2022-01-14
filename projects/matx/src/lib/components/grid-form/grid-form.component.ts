import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GridFormData, GridTableHeader } from '../extenable-form-grid/model';

@Component({
  selector: 'lib-grid-form',
  templateUrl: './grid-form.component.html',
  styleUrls: ['./grid-form.component.scss'],
})
export class GridFormComponent implements OnInit {
  headerKey: string;
  headerRow: GridTableHeader[];
  row: any[];
  formGroup: FormGroup;
  description: string;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<GridFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GridFormData
  ) {
    this.headerRow = data.headerRow;
    this.row = data.row;
    this.headerKey = data.headerKey;
    this.description = data.description || 'Form';
  }

  ngOnInit(): void {
    if (this.headerKey) {
      this.formGroup = this.createHeaderControl(this.headerKey);
    } else {
      this.formGroup = this.createRow(this.row);
    }
  }

  createRow(values: any): FormGroup {
    const controlOptions: AbstractControlOptions = {};

    const controlsConfig = this.headerRow.reduce((acc: any, rowProperty) => {
      const key = rowProperty.key;

      acc[rowProperty.key] = this.formBuilder.control({
        value: values[key] ? values[key] : '',
        disabled: false,
      });
      return acc;
    }, {});
    return this.formBuilder.group(controlsConfig, controlOptions);
  }

  createHeaderControl(key: string): FormGroup {
    const controlOptions: AbstractControlOptions = {};

    const filtered = this.headerRow.filter((i) => i.key === key);
    if (filtered.length === 0) {
      // new column
      filtered.push({ key, label: '' });
    }
    const controlsConfig = filtered.reduce((acc: any, rowProperty) => {
      acc[rowProperty.key] = this.formBuilder.control({
        value: rowProperty.label,
        disabled: false,
      });
      return acc;
    }, {});
    return this.formBuilder.group(controlsConfig, controlOptions);
  }

  cancel(): void {}

  submit(): void {
    this.dialogRef.close(this.formGroup.value);
  }
}
