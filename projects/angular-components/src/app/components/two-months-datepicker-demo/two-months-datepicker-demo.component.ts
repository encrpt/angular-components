import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MultipleMonthsDatepickerComponent } from '../../../../../matx/src/lib/components/multiple-months-datepicker/multiple-months-datepicker.component';

@Component({
  selector: 'app-two-months-datepicker-demo',
  templateUrl: './two-months-datepicker-demo.component.html',
  styleUrls: ['./two-months-datepicker-demo.component.scss'],
})
export class TwoMonthsDatepickerDemoComponent implements OnInit {
  value = '2022-11-11';
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}

  openDialog() {
    const dialogRef = this.dialog.open(MultipleMonthsDatepickerComponent, {
      data: {
        value: this.value,
        calendarBeforeCount: 0,
        calendarAfterCount: 1,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // TODO format
        const value = `${result.getFullYear()}-${(result.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${result.getDate().toString().padStart(2, '0')}`;
        this.value = value;
      }
    });
  }
}
