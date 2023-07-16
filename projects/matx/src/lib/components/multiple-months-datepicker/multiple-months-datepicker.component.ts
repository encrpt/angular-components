import {
  AfterViewInit,
  Component,
  Inject,
  Input,
  OnInit,
  Optional,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  DateAdapter,
  MatDateFormats,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmpytyDatepickerHeaderComponent } from '../datepicker-header/empyty-datepicker-header/empyty-datepicker-header.component';
import { MultipleMonthsDatepickerHeaderComponent } from '../datepicker-header/multiple-months-datepicker-header/multiple-months-datepicker-header.component';
import { DatepickerHeaderPrevComponent } from '../datepicker-header/datepicker-header-prev/datepicker-header-prev.component';
import { DatepickerHeaderNextComponent } from '../datepicker-header/datepicker-header-next/datepicker-header-next.component';

export interface DialogData {
  value: any;
  calendarBeforeCount: number;
  calendarAfterCount: number;
}

@Component({
  selector: 'lib-multiple-months-datepicker',
  templateUrl: './multiple-months-datepicker.component.html',
  styleUrls: ['./multiple-months-datepicker.component.css'],
})
export class MultipleMonthsDatepickerComponent<D>
  implements OnInit, AfterViewInit
{
  @ViewChildren('beforeCalendar')
  matCalendarsBefore: QueryList<MatCalendar<D>>;

  @ViewChildren('afterCalendar')
  matCalendarsAfter: QueryList<MatCalendar<D>>;

  @ViewChild('calendarMain')
  calendar1: MatCalendar<D>;

  @Input()
  calendarBeforeCount = 0;

  @Input()
  calendarAfterCount = 1;

  subCalendarsBefore: MatCalendar<D>[] = [];
  subCalendarsAfter: MatCalendar<D>[] = [];

  // TODO check type data or moment
  selected: any;
  calendarBeforeArray: any[] = [];
  calendarAfterArray: any[] = [];
  showCloseDialogButton = false;
  calendarHeader = MultipleMonthsDatepickerHeaderComponent;
  emptyHeader = EmpytyDatepickerHeaderComponent;

  // FIXME
  // prevCalendarHeader = DatepickerHeaderPrevComponent;
  // nextCalendarHeader = DatepickerHeaderNextComponent;

  constructor(
    private dateAdapter: DateAdapter<D>,
    @Inject(MAT_DATE_FORMATS) private dateFormats: MatDateFormats,
    @Optional()
    public dialogRef: MatDialogRef<MultipleMonthsDatepickerComponent<D>>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    if (data && data.value) {
      this.selected = new Date(data.value);
      if (data.calendarAfterCount) {
        this.calendarAfterCount = data.calendarAfterCount;
        this.calendarBeforeCount = data.calendarBeforeCount;
      }
      this.showCloseDialogButton = true;
    } else {
      this.selected = new Date();
    }
  }
  ngOnInit(): void {
    this.calendarBeforeArray = Array(this.calendarBeforeCount).fill(true);
    this.calendarAfterArray = Array(this.calendarAfterCount).fill(true);
  }

  ngAfterViewInit(): void {
    const length = this.matCalendarsBefore.length;
    // set months
    this.matCalendarsBefore.forEach((item, index) => {
      item.activeDate =
        this.calendar1.currentView === 'month'
          ? this.dateAdapter.addCalendarMonths(
              this.calendar1.activeDate,
              (length - index) * -1
            )
          : this.dateAdapter.addCalendarYears(
              this.calendar1.activeDate,
              (length - index) * -1
            );
      this.calendar1.stateChanges.subscribe(() => {
        item.selected = this.selected;
        item.activeDate =
          this.calendar1.currentView === 'month'
            ? this.dateAdapter.addCalendarMonths(
                this.calendar1.activeDate,
                (length - index) * -1
              )
            : this.dateAdapter.addCalendarYears(
                this.calendar1.activeDate,
                (length - index) * -1
              );
      });
    });
    this.matCalendarsAfter.forEach((item, index) => {
      item.activeDate =
        this.calendar1.currentView === 'month'
          ? this.dateAdapter.addCalendarMonths(
              this.calendar1.activeDate,
              index + 1
            )
          : this.dateAdapter.addCalendarYears(
              this.calendar1.activeDate,
              index + 1
            );
      this.calendar1.stateChanges.subscribe(() => {
        item.selected = this.selected;
        item.activeDate =
          this.calendar1.currentView === 'month'
            ? this.dateAdapter.addCalendarMonths(
                this.calendar1.activeDate,
                index + 1
              )
            : this.dateAdapter.addCalendarYears(
                this.calendar1.activeDate,
                index + 1
              );
      });
    });

    // FIXME check render
  }

  logCalendarState(type: string, calendar: MatCalendar<any>) {
    console.log(
      type,
      calendar.activeDate.format('YYYY-MM-DD'),
      calendar.currentView
    );
    // calendar.monthView,
    // calendar.yearView
    // calendar.multiYearView,
  }

  selectChange(event) {
    this.selected = event;
  }

  log1(type: string, event: any) {
    //
    console.log('1', type, event);
  }
  log2(type: string, event: any) {
    //
    console.log('2', type, event);
  }
  onNoClick(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
  onYesClick(): void {
    if (this.dialogRef) {
      // TODO type
      if (!this.selected.getUTCFullYear) {
        this.selected = this.selected.toDate();
      }
      this.dialogRef.close(this.selected);
    }
  }
}
