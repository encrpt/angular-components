import { Component, OnInit } from '@angular/core';
import { GridTable } from 'projects/matx/src/lib/components/extenable-form-grid/model';
import * as uuid from 'uuid';

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

  data: GridTable = { tableRows: [] };
  data_empty: GridTable = { tableRows: [] };
  dataAndHeader: GridTable = { tableRows: [] };
  isVisible = true;
  ngOnInit(): void {}

  getUuid(): string {
    return uuid.v4();
  }

  output(data) {
    console.log(data);
    this.isVisible = false;
    setTimeout(() => {
      this.isVisible = true;
    }, 200);
  }

  resetData() {
    this.data.tableRows = Array.from(new Array(DEMO_DATA.length))
      .map((_, i) => i)
      .map((i, index) => {
        return {
          id: `id_${i}`,
          title: DEMO_DATA[index],
          zeit: Date.now(),
          count: Math.round(Math.random() * 1000),
        };
      });
    this.dataAndHeader.headerRow = [
      { key: this.getUuid(), label: 'id' },
      { key: this.getUuid(), label: 'id' },
      { key: this.getUuid(), label: 'title' },
      { key: this.getUuid(), label: 'zeit' },
      { key: this.getUuid(), label: 'count' },
    ];

    this.dataAndHeader.tableRows = Array.from(new Array(DEMO_DATA.length))
      .map((_, i) => i)
      .map((i, index) => {
        const result = {};
        result[this.dataAndHeader.headerRow[0].key] = `id_1_${i}`;
        result[this.dataAndHeader.headerRow[1].key] = `id_2_${i}`;
        result[this.dataAndHeader.headerRow[2].key] = DEMO_DATA[index];
        result[this.dataAndHeader.headerRow[3].key] = Date.now();
        result[this.dataAndHeader.headerRow[4].key] = Math.round(
          Math.random() * 1000
        );
        return result;
      });
  }
}
