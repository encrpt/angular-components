import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface TitleFormData {
  required: boolean;
  textOnly: boolean;
  isPassword: boolean;
  value: string;
  title: string;
  message: string;
  width: number;
  placeholder: string;
  buttonLabel: string;
  buttonWidth: number;
}

@Component({
  selector: 'lib-title-form',
  templateUrl: './title-form.component.html',
  styleUrls: ['./title-form.component.scss'],
})
export class TitleFormComponent implements OnInit {
  form: FormGroup;
  isFrontendNotValid = false;
  showServerValidation = false;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<TitleFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: TitleFormData
  ) {}

  ngOnInit(): void {
    if (this.data.required) {
      this.form = this.formBuilder.group({
        title: [this.data.value, Validators.compose([Validators.required])],
      });
    } else if (this.data.textOnly) {
      this.form = this.formBuilder.group({});
    } else {
      this.form = this.formBuilder.group({
        title: [this.data.value],
      });
    }
  }

  public submitForm(): void {
    if (this.validateForm()) {
      if (this.data.textOnly) {
        this.dialogRef.close(true);
      } else {
        const title = this.form.get('title').value;
        this.dialogRef.close(title);
      }
    }
  }

  validateForm(): boolean {
    const field: AbstractControl = this.form.get('title');
    if (!field) {
      return true;
    } else {
      const title = field.value.trim();
      if (this.data.isPassword && title && !/^[\w]{1,20}$/.test(title)) {
        this.form.setErrors({ passwordpromocode: true });
        return false;
      } else if (!this.form.valid) {
        this.form.setErrors({ checkInput: true });
        return false;
      } else {
        return true;
      }
    }
  }
}
