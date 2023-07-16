import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-empyty-datepicker-header',
  templateUrl: './empyty-datepicker-header.component.html',
  styleUrls: ['./empyty-datepicker-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmpytyDatepickerHeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
