import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TitleFormComponent } from '../title-form/title-form.component';
import {
  MatDialog,
  DialogPosition,
  MatDialogConfig,
} from '@angular/material/dialog';

// see title form component width

@Component({
  selector: 'app-input-button',
  templateUrl: './input-button.component.html',
  styleUrls: ['./input-button.component.scss'],
})
export class InputButtonComponent implements OnInit {
  @Input()
  textOnly = false;

  @Input()
  label = 'Click';

  @Input()
  value = '';

  @Input()
  buttonwidth = null;

  @Input()
  width = 100;

  @Input()
  disabled = false;

  @Input()
  buttonLabel = 'OK';

  @Input()
  placeholder = '';

  @Input()
  message = '';

  @Input()
  required = false;

  @Input()
  isPassword = false;

  @Input()
  color;

  @Input()
  type = '';

  // iconbutton
  @Input()
  icon = '';

  @Input()
  iconBefore;

  @Input()
  cssClass = '';

  // @Input()
  // maxWidth = '400px';

  //////////////////////////////////////

  @Output()
  onSubmit: EventEmitter<string> = new EventEmitter();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void { }

  openInput($event) {
    // fix location for popup
    const addXPx = $event.target.tagName.toUpperCase() === 'BUTTON' ? 0 : -16;
    const leftRaw = $event.clientX - $event.offsetX + addXPx;

    const position: DialogPosition = {
      top: $event.clientY - $event.offsetY + 40 + 'px',
      left: document.body.clientWidth - leftRaw > this.width ? leftRaw - 50 + 'px' : document.body.clientWidth - (this.width + 60) + 'px',
    };

    const dialogConfig: MatDialogConfig = {
      position,
      panelClass: this.cssClass,
      data: {
        width: this.width,
        title: this.label,
        value: this.value,
        buttonLabel: this.buttonLabel,
        placeholder: this.placeholder,
        required: this.required,
        textOnly: this.textOnly,
        isPassword: this.isPassword,
        buttonWidth: this.buttonwidth,
        message: this.message
      },
      // maxWidth: this.maxWidth
    };

    const dialogRef = this.dialog.open(TitleFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data === undefined) {
        // nothing
      } else if (data) {
        this.onSubmit.emit(data);
      } else if (!this.required) {
        this.onSubmit.emit('');
      }
    });
  }
}
