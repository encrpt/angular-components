import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'lib-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
})
export class LoadingSpinnerComponent implements OnInit, AfterViewInit {
  @Input()
  size = 100;

  @Input()
  fontSize = 16;

  @Input()
  center: boolean;

  @Input()
  pageHeight: string;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {}
}
