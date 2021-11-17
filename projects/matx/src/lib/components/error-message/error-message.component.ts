import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
// TODO check
export class ErrorMessageComponent implements OnInit {
  @Input()
  control;

  formErrors = [
    { error: 'E01_18_01', msg: 'An error occured. Please try again later' },
    {
      error: 'E01_18_02',
      msg: 'An other error occured. Please try again later',
    },
    { error: 'checkInput', msg: 'Please check your input.' },
    {
      error: 'passwordpromocode',
      msg: 'Max. lenght: 20, Allowed characters: A-Z,a-z,0-9.',
    },
  ];

  currentError;
  constructor() {}

  ngOnInit(): void {}
}
