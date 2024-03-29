import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { ItemFlatNode } from 'projects/matx/src/lib/components/tree-select/ItemFlatNode';
import * as uuid from 'uuid';
import example from '../../../assets/db/public-dev-examle.json';

@Component({
  selector: 'app-tree-select-demo',
  templateUrl: './tree-select-demo.component.html',
  styleUrls: ['./tree-select-demo.component.scss'],
})
export class TreeSelectDemoComponent implements OnInit {
  menuDataFirst = {};
  menuDataSecond = {};

  constructor() {}

  ngOnInit(): void {
    this.createTreeDataFromJson(example);
  }

  selectedItems(checklistSelection: SelectionModel<ItemFlatNode>): void {
    const selected = checklistSelection.selected.filter(
      (s) => s.expandable === false
    );

    console.log(selected.map((i) => i.item.label));
  }

  resetAction(userInput: MouseEvent): void {
    console.log(userInput);
  }

  submitAction(files: File[]): void {
    if (files.length) {
      const reader = new FileReader();
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

  createTreeDataFromJson(data: any): void {
    this.menuDataFirst['background.bgVideoLib'] =
      data.background.bgVideoLib.reduce((acc, item, index) => {
        const id = uuid.v4();
        acc[id] = JSON.stringify({
          index: index + 1,
          label: item.title,
          id,
          title: item.track,
        });
        return acc;
      }, {});
    // this.menuDataSecond['activityHelper.getValidInstructorCount ('] = {
    //   '1': JSON.stringify({
    //     index: 1,
    //     label: 'activity',
    //     id: 1,
    //     title: 'Description para 1',
    //   }),
    //   '2': JSON.stringify({
    //     index: 2,
    //     label: '"SINGLE_MEMBER_COMPANY"',
    //     id: 1,
    //     title: 'Description',
    //   }),
    //   'activityHelper.getValidParticipantCount (': {
    //     '1': JSON.stringify({
    //       index: 1,
    //       label: 'activity',
    //       id: 1,
    //       title: 'Description para 1',
    //     }),
    //   },
    //   ')': JSON.stringify({
    //     index: 1,
    //     label: ')',
    //     id: 1,
    //     title: 'End activityHelper.getValidParticipantCount',
    //   }),
    // };
    // this.menuDataSecond[')'] = JSON.stringify({
    //   index: 1,
    //   label: ')',
    //   id: 1,
    //   title: 'End activityHelper.getValidInstructorCount',
    // });

    this.menuDataSecond['audioLib.soundCloud1.tracks'] =
      data.audioLib.soundCloud1.tracks.reduce((acc, item, index) => {
        const id = uuid.v4();
        acc[id] = JSON.stringify({
          index: index + 1,
          label: item,
          id,
          title: item,
        });
        return acc;
      }, {});
    this.menuDataSecond['audioLib.soundCloud2.tracks'] =
      data.audioLib.soundCloud2.tracks.reduce((acc, item, index) => {
        const id = uuid.v4();
        acc[id] = JSON.stringify({
          index: index + 1,
          label: item,
          id,
          title: item,
        });
        return acc;
      }, {});
  }
}
