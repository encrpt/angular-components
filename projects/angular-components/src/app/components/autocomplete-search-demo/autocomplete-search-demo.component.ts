/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutocompleteDataConfig } from 'projects/matx/src/lib/components/autocomplete-search/autocomplete-search.model';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  takeUntil,
  tap,
} from 'rxjs/operators';

enum Direction {
  KEY_1_1 = 'Up-Value-1',
  KEY_1_2 = 'Up-Value-2',
  KEY_1_3 = 'Up-Value-3',
  KEY_1_4 = 'Up-Value-4',
  KEY_2_1 = 'Down-Value-1',
  KEY_2_2 = 'Down-Value-2',
  KEY_2_3 = 'Down-Value-3',
  KEY_2_4 = 'Down-Value-4',
  KEY_3_1 = 'Left-Value-1',
  KEY_3_2 = 'Left-Value-2',
  KEY_3_3 = 'Left-Value-3',
  KEY_3_4 = 'Left-Value-4',
  KEY_4_1 = 'Right-Value-1',
  KEY_4_2 = 'Right-Value-2',
  KEY_4_3 = 'Right-Value-3',
  KEY_4_4 = 'Right-Value-4',
}

@Component({
  selector: 'app-autocomplete-search-demo',
  templateUrl: './autocomplete-search-demo.component.html',
  styleUrls: ['./autocomplete-search-demo.component.scss'],
})
export class AutocompleteSearchDemoComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  ngUnsubscribe$: Subject<void> = new Subject();

  config1: AutocompleteDataConfig = {
    enums: Direction,
    sorting: false,
  };

  config2: AutocompleteDataConfig = {
    enums: Direction,
    sorting: true,
    userDefined: true,
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      direction_1: [null, Validators.required],
      direction_2: [null, Validators.required],
    });

    this.formGroup
      .get('direction_1')
      .valueChanges.pipe(
        takeUntil(this.ngUnsubscribe$),
        debounceTime(300),
        distinctUntilChanged(),
        map((x) => (typeof x === 'object' ? x.value : x)),
        map((x) => Object.keys(Direction).find((key) => Direction[key] === x)),
        filter((x) => Direction[x])
      )
      .subscribe((x) =>
        console.log('direction_1 key:', x, 'value:', Direction[x])
      );

    this.formGroup
      .get('direction_2')
      .valueChanges.pipe(
        takeUntil(this.ngUnsubscribe$),
        debounceTime(300),
        distinctUntilChanged(),
        map((x) => (typeof x === 'object' ? x.value : x)),
        map((x) => Object.keys(Direction).find((key) => Direction[key] === x))
      )
      .subscribe((x) =>
        console.log(
          'direction_2 key:',
          this.formGroup.get('direction_2').value,
          'value:',
          Direction[x] || 'NEW VALUE'
        )
      );
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
