import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TwoMonthsDatepickerComponent } from 'projects/matx/src/lib/components/two-months-datepicker/two-months-datepicker.component';

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
    const dialogRef = this.dialog.open(TwoMonthsDatepickerComponent, {
      data: { value: this.value, calendarBefore: 2, calendarAfter: 1 },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        const value = `${result.getFullYear()}-${(result.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${result.getDate().toString().padStart(2, '0')}`;
        this.value = value;
      }
    });
  }
}
