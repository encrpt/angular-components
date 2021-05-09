import { Component, OnInit } from '@angular/core';
const DEMO_DATA = ['Auf', 'Abfahrten', 'Brieselang', 'Falkensee'];
@Component({
  selector: 'app-extenable-form-grid-demo',
  templateUrl: './extenable-form-grid-demo.component.html',
  styleUrls: ['./extenable-form-grid-demo.component.scss'],
})
export class ExtenableFormGridDemoComponent implements OnInit {
  constructor() {
    this.resetData();
  }

  data = [];
  isVisible = true;
  ngOnInit(): void {}

  output(data) {
    console.log(data);
    this.isVisible = false;
    setTimeout(() => {
      this.isVisible = true;
    }, 200);
  }

  resetData() {
    this.data = Array.from(new Array(DEMO_DATA.length))
      .map((_, i) => i)
      .map((i, index) => {
        return {
          id: `name_${i}`,
          title: DEMO_DATA[index],
          zeit: Date.now(),
          count: Math.round(Math.random() * 1000),
        };
      });
  }
}
