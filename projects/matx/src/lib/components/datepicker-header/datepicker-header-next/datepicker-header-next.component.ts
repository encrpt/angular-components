import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
} from '@angular/core';
import {
  DateAdapter,
  MatDateFormats,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'lib-datepicker-header-next',
  templateUrl: './datepicker-header-next.component.html',
  styleUrls: ['./datepicker-header-next.component.css'],
})
export class DatepickerHeaderNextComponent<D> implements OnDestroy {
  private destroyed = new Subject<void>();
  constructor(
    private calendar: MatCalendar<D>,
    private dateAdapter: DateAdapter<D>,
    @Inject(MAT_DATE_FORMATS) private dateFormats: MatDateFormats,
    cdr: ChangeDetectorRef
  ) {
    calendar.stateChanges
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => cdr.markForCheck());
  }

  get periodLabel() {
    return this.dateAdapter
      .format(this.calendar.activeDate, this.dateFormats.display.monthYearLabel)
      .toLocaleUpperCase();
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
  nextClicked(mode: 'month' | 'year') {
    this.calendar.activeDate =
      mode === 'month'
        ? this.dateAdapter.addCalendarMonths(this.calendar.activeDate, 1)
        : this.dateAdapter.addCalendarYears(this.calendar.activeDate, 1);
  }
}
