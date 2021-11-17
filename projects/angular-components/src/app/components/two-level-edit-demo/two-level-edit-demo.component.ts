import { Component, OnInit } from '@angular/core';
import {
  SelectOptions,
  ValueItem,
} from 'projects/matx/src/lib/components/level-edit/level.model';
import { LevelExampleService } from './level-example.service';

@Component({
  selector: 'app-two-level-edit-demo',
  templateUrl: './two-level-edit-demo.component.html',
  styleUrls: ['./two-level-edit-demo.component.scss'],
})
export class TwoLevelEditDemoComponent implements OnInit {
  exampleDataRootCollection: ValueItem[] = [];
  exampleDataCollections: ValueItem[][] = [];
  exampleSelectCollections: SelectOptions[][] = [];

  columCount = 3;
  viewIndex = 0;

  constructor(private levelExampleService: LevelExampleService) {
    const maxSelect = 4;
    for (let i = 0; i < this.columCount; i++) {
      this.exampleSelectCollections.push(
        levelExampleService.getLevelSelect(
          i + 1,
          2 + i > maxSelect ? maxSelect : 2 + i
        )
      );
    }
    this.exampleDataRootCollection =
      levelExampleService.exampleValuesFromSelected(
        3,
        this.exampleSelectCollections[0]
      );

    if (this.viewIndex > 0) {
      throw new Error('Add children on init is not implemented');
    }
    this.setPrevIdForRoot();
    this.exampleDataCollections.push(this.exampleDataRootCollection);
  }

  ngOnInit(): void {
    //
  }

  setPrevIdForRoot(): void {
    // set prev id
    let prevId;
    this.exampleDataRootCollection.forEach((item) => {
      if (prevId) {
        item.prevId = prevId;
      } else {
        item.prevId = null;
      }
      prevId = item.id;
    });
  }

  nextLevel(parentIndex: number, id: number): void {
    if (id === null) {
      // set selected parent
      this.viewIndex = parentIndex;
    } else {
      const nextIndex = parentIndex + 1;
      if (nextIndex < this.columCount) {
        const parent: ValueItem = this.exampleDataCollections[parentIndex].find(
          (i) => i.id === id
        );
        const count = Math.floor(Math.random() * 6) + 1;
        if (!parent.children) {
          parent.children = this.levelExampleService.exampleValuesFromSelected(
            count,
            this.exampleSelectCollections[nextIndex]
          );
        }
        this.exampleDataCollections[nextIndex] = parent.children;
        this.viewIndex = nextIndex;
      }
    }
  }

  submitUploadAction(fileList: File[] | FileList): void {
    if (fileList instanceof FileList) {
      fileList = Array.from(fileList);
    }
    const reader = new FileReader();
    reader.onload = (progressEvent) => {
      if (reader.result) {
        const valueFromFile = JSON.parse(reader.result as string);
        // simple validation
        if (
          Array.isArray(valueFromFile) &&
          valueFromFile.length > 0 &&
          valueFromFile[0].id
        ) {
          this.exampleDataRootCollection = valueFromFile;
          this.exampleDataCollections[0] = this.exampleDataRootCollection;
        }
      }
    };

    reader.onerror = (error) => {
      //
    };
    reader.readAsText(fileList[0]);
  }

  submitDownloadAction(fileName): void {
    this.setPrevIdForRoot();

    // TODO store select values too
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(
        JSON.stringify(this.exampleDataRootCollection, null, 2)
      );
    const a: HTMLAnchorElement = document.createElement('a');
    a.setAttribute('href', dataStr);
    a.setAttribute('download', (fileName ? fileName : 'data') + '.json');
    a.click();
  }
}
