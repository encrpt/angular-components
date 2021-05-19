import { Component, OnInit } from '@angular/core';
import { GridTable } from 'projects/matx/src/lib/components/extenable-form-grid/model';
import * as uuid from 'uuid';

const DEMO_DATA = [
  'Auf',
  'Abfahrten',
  'Brieselang',
  'Falkensee',
  'Der ohnehin angeschlagene Bitcoin-Kurs fiel infolge der Ankündigung um weitere zehn Prozent auf einen Wert von unter 31.700 Euro - der tiefste Stand seit Februar 2021. Ob der weitere Kurssturz in direktem Zusammenhang mit Chinas Maßnahmen steht, lässt sich nicht eindeutig nachvollziehen, es liegt aber nahe. Ein Großteil des Bitcoin-Minings findet aufgrund der dort vergleichwseise niedrigen Strompreise in China statt, die Region ist also durchaus wichtig für das virtuelle Zahlungsmittel.',
];
@Component({
  selector: 'app-extenable-text-grid-demo',
  templateUrl: './extenable-text-grid-demo.component.html',
  styleUrls: ['./extenable-text-grid-demo.component.scss'],
})
export class ExtenableTextGridDemoComponent implements OnInit {
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
    this.dataAndHeader.headerRows = [
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
        result[this.dataAndHeader.headerRows[0].key] = `id_1_${i}`;
        result[this.dataAndHeader.headerRows[1].key] = `id_2_${i}`;
        result[this.dataAndHeader.headerRows[2].key] = DEMO_DATA[index];
        result[this.dataAndHeader.headerRows[3].key] = Date.now();
        result[this.dataAndHeader.headerRows[4].key] = Math.round(
          Math.random() * 1000
        );
        return result;
      });
  }
}
