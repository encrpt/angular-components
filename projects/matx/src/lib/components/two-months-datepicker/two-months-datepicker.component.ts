import {
  AfterViewInit,
  Component,
  Inject,
  Input,
  OnInit,
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
import { EmpytyDatepickerHeaderComponent } from '../empyty-datepicker-header/empyty-datepicker-header.component';
import { TwoMonthsDatepickerHeaderComponent } from '../two-months-datepicker-header/two-months-datepicker-header.component';

@Component({
  selector: 'lib-two-months-datepicker',
  templateUrl: './two-months-datepicker.component.html',
  styleUrls: ['./two-months-datepicker.component.css'],
})
export class TwoMonthsDatepickerComponent<D> implements OnInit, AfterViewInit {
  @ViewChildren('beforeCalendar')
  matCalendarsBefore: QueryList<MatCalendar<D>>;

  @ViewChildren('afterCalendar')
  matCalendarsAfter: QueryList<MatCalendar<D>>;

  @ViewChild('calendarMain')
  calendar1: MatCalendar<D>;

  @Input()
  calendarBefore = 0;

  @Input()
  calendarAfter = 1;

  subCalendarsBefore: MatCalendar<D>[] = [];
  subCalendarsAfter: MatCalendar<D>[] = [];

  selected: any = new Date();
  calendarBeforeArray: any[] = [];
  calendarAfterArray: any[] = [];

  calendarHeader = TwoMonthsDatepickerHeaderComponent;
  emptyHeader = EmpytyDatepickerHeaderComponent;

  constructor(
    private dateAdapter: DateAdapter<D>,
    @Inject(MAT_DATE_FORMATS) private dateFormats: MatDateFormats
  ) {}
  ngOnInit(): void {
    this.calendarBeforeArray = Array(this.calendarBefore).fill(true);
    this.calendarAfterArray = Array(this.calendarAfter).fill(true);
  }

  ngAfterViewInit(): void {
    const length = this.matCalendarsBefore.length;
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
}
