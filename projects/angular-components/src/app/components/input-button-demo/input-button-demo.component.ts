import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-button-demo',
  templateUrl: './input-button-demo.component.html',
  styleUrls: ['./input-button-demo.component.scss'],
})
export class InputButtonDemoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  submitAction(userInput: MouseEvent): void {
    console.log(userInput);
  }
}
