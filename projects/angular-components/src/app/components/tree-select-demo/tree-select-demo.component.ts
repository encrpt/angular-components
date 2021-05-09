import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { ItemFlatNode } from "projects/matx/src/lib/components/tree-select/ItemFlatNode";
import * as uuid from 'uuid';
import example from '../../../assets/db/pulic-dev-examle.json';

@Component({
  selector: 'app-tree-select-demo',
  templateUrl: './tree-select-demo.component.html',
  styleUrls: ['./tree-select-demo.component.scss'],
})
export class TreeSelectDemoComponent implements OnInit {
  constructor() {}

  menuData_1 = {};
  menuData_2 = {};

  ngOnInit(): void {
    this.createTreeDataFromJson(example);
  }

  selectedItems(checklistSelection: SelectionModel<ItemFlatNode>) {
    const selected = checklistSelection.selected.filter(
      (selected) => selected.expandable === false
    );

    console.log(selected.map((i) => i.item.label));
  }

  resetAction(userInput) {
    console.log(userInput);
  }

  submitAction(files: File[]) {
    if (files.length) {
      var reader = new FileReader();
      reader.addEventListener(
        'load',
        () => {
          const fromFile: string = reader.result as string;
          try {
            this.createTreeDataFromJson(JSON.parse(fromFile));
          } catch (e) {
            // log error
            console.warn(e);
          }
        },
        false
      );

      reader.readAsText(files[0]);
    }
  }

  createTreeDataFromJson(data: any) {
    const menu = {};
    this.menuData_1[
      'background.bgVideoLib'
    ] = data.background.bgVideoLib.reduce((acc, item, index) => {
      const id = uuid.v4();
      acc[id] = JSON.stringify({
        index: index + 1,
        label: item.title,
        id: id,
        title: item.track,
      });
      return acc;
    }, {});
    this.menuData_2[
      'audioLib.soundCloud1.tracks'
    ] = data.audioLib.soundCloud1.tracks.reduce((acc, item, index) => {
      const id = uuid.v4();
      acc[id] = JSON.stringify({
        index: index + 1,
        label: item,
        id: id,
        title: item,
      });
      return acc;
    }, {});
    this.menuData_2[
      'audioLib.soundCloud2.tracks'
    ] = data.audioLib.soundCloud2.tracks.reduce((acc, item, index) => {
      const id = uuid.v4();
      acc[id] = JSON.stringify({
        index: index + 1,
        label: item,
        id: id,
        title: item,
      });
      return acc;
    }, {});
  }
}
