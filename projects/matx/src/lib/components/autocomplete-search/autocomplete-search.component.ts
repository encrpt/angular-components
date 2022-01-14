import { KeyValue } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  startWith,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { AutocompleteDataConfig } from './autocomplete-search.model';
const defaultConfig: AutocompleteDataConfig = {
  enums: null,
  keyValueArray: null,
  sorting: false,
  userDefined: false,
};
@Component({
  selector: 'lib-autocomplete-search',
  templateUrl: './autocomplete-search.component.html',
  styleUrls: ['./autocomplete-search.component.scss'],
})
export class AutocompleteSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input()
  control: FormControl = new FormControl();

  @Input()
  config: AutocompleteDataConfig;

  @Input()
  placeholder = '';

  @Input()
  required = false;

  @Input()
  readonly = false;

  @Input()
  hasInitialValue = false;

  @Output()
  selectedChanged: EventEmitter<any> = new EventEmitter();

  filteredOptions$: Observable<KeyValue<string, string>[]>;

  ngUnsubscribe$: Subject<void> = new Subject();

  constructor() {}

  ngOnInit(): void {
    this.config = { ...defaultConfig, ...this.config };

    // convert to key/value array
    if (this.config.enums != null) {
      this.config.keyValueArray = [];
      Object.keys(this.config.enums).forEach((key) => {
        this.config.keyValueArray.push({ key, value: this.config.enums[key] });
      });
    }

    if (this.config.keyValueArray.length) {
      if (this.config.sorting === true) {
        this.config.keyValueArray = this.config.keyValueArray.sort((a, b) =>
          a.value > b.value ? 1 : -1
        );
      }

      if (this.hasInitialValue) {
        this.control.patchValue(this.config.keyValueArray[0], {
          onlySelf: true,
        });
      }
      const initialValue = this.control.value || '';

      this.filteredOptions$ = this.control.valueChanges.pipe(
        takeUntil(this.ngUnsubscribe$),
        distinctUntilChanged(),
        startWith(initialValue),
        tap(this.resetValue),
        map((x) => (typeof x === 'object' ? x.value : x)),
        map((value) => this.filter(value || ''))
      );

      this.setValidators();
    }
  }

  ngAfterViewInit(): void {
    //
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  customValidator = (control: AbstractControl): ValidationErrors | null => {
    if (control.value) {
      if (this.config.userDefined) {
        return null;
      } else {
        return this.contains(control.value) ? null : { invalid: true };
      }
    }
    return null;
  };

  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    const {
      option: { value },
    } = event;
    this.selectedChanged.emit(value);
  }

  clearInput(): void {
    this.resetValue(null);
    this.selectedChanged.emit('');
  }

  displayValue = (item: KeyValue<string, string>): string =>
    item ? item.value : '';

  private setValidators(): void {
    const validators = this.config.additionalValidators || [];
    validators.push(this.customValidator);
    this.control.setValidators(validators);
  }

  private contains(value: string | KeyValue<string, string>): boolean {
    if (typeof value === 'object') {
      value = (value as KeyValue<string, string>).value;
    }
    return (
      this.config.keyValueArray.find((i) => i.value === value) !== undefined
    );
  }

  private resetValue = (value: any): void => {
    if (this.control && !value) {
      this.control.setValue('');
    }
  };

  private filter(value: string): KeyValue<string, string>[] {
    const filterValue = value.toLowerCase();
    return filterValue
      ? this.config.keyValueArray.filter((item) =>
          this.displayValue(item).toLowerCase().includes(filterValue)
        )
      : this.config.keyValueArray;
  }
}
