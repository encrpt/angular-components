import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatListOption } from '@angular/material/list';
import { validateExtension } from 'showdown';
import { SelectOptions, ValueItem } from './level.model';

@Component({
  selector: 'lib-level-edit',
  templateUrl: './level-edit.component.html',
  styleUrls: ['./level-edit.component.scss'],
})
export class LevelEditComponent implements OnInit {
  constructor() {}

  @Input()
  collection: ValueItem[];

  @Input()
  selectCollection: SelectOptions[];

  @Output()
  emitSelectedId: EventEmitter<number> = new EventEmitter<number>();

  @Input()
  multiple = false;

  @Input()
  sortable = true;

  selectKeys: string[];
  formGroup: FormGroup;

  selectedItems: ValueItem[];

  ngOnInit(): void {
    this.selectKeys = this.selectCollection.map((i) => i.key);
    // create formgroup
    this.formGroup = new FormGroup({});
    this.selectKeys.forEach((selectKey) => {
      this.formGroup.addControl(
        selectKey,
        new FormControl({ value: null, disabled: false }, [Validators.required])
      );
    });
  }

  createSelected() {
    const value: ValueItem = Object.keys(this.formGroup.value).reduce(
      (a, i) => {
        a[i] = this.formGroup.value[i].key;
        return a;
      },
      {}
    );

    value.id = this.collection.length
      ? Math.max(...this.collection.map((i) => i.id)) + 1
      : 1;
    this.collection.push(value);

    this.formGroup.markAsUntouched();
    this.selectKeys.forEach((selectKey) => {
      this.formGroup.patchValue({ [selectKey]: null });
    });
  }
  updateSelected() {
    const indexToUpdate = this.collection.findIndex(
      (i) => i.id === this.selectedItems[0].id
    );
    console.log(indexToUpdate);
    const value: ValueItem = Object.keys(this.formGroup.value).reduce(
      (a, i) => {
        a[i] = this.formGroup.value[i].key;
        return a;
      },
      { id: this.selectedItems[0].id }
    );

    this.collection[indexToUpdate] = value;
    this.formGroup.markAsUntouched();
    this.selectKeys.forEach((selectKey) => {
      this.formGroup.patchValue({ [selectKey]: null });
    });
  }

  deleteSelectedItem() {
    this.selectedItems.forEach((selectedItem) => {
      const indexToDelete = this.collection.findIndex(
        (i) => i.id === selectedItem.id
      );
      // modify content - transfer changes to parent component
      this.collection.splice(indexToDelete, 1);
    });
    // set selected parent
    this.emitSelectedId.emit(null);
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.collection, event.previousIndex, event.currentIndex);
  }

  onGroupsChange(options: MatListOption[]) {
    if (options.length === 1) {
      const selectedId: number = options[0].value.id;
      this.emitSelectedId.emit(selectedId);
    }
    this.selectedItems = options.map((o) => o.value);
  }
}
