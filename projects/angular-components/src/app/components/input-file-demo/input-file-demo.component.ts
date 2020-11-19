import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-file-demo',
  templateUrl: './input-file-demo.component.html',
  styleUrls: ['./input-file-demo.component.scss']
})
export class InputFileDemoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  submitAction(userInput) {
    console.log(userInput);
  }
}
