import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
})
export class LoadingSpinnerComponent implements OnInit, AfterViewInit {
  constructor() { }

  @Input()
  size = 100;

  @Input()
  fontSize = 16;

  @Input()
  center: boolean;

  @Input()
  pageHeight: string;

  ngOnInit(): void { }

  ngAfterViewInit() { }
}
