import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-ng-encrpt-demo',
  templateUrl: './ngx-markjs-demo.component.html',
  styleUrls: ['./ngx-markjs-demo.component.scss'],
})
export class NgxMarkjsDemoComponent implements AfterViewInit {
  @ViewChild('search', { static: false })
  searchElemRef: ElementRef;

  title = 'ngx-markjs-demo';

  searchText$: Observable<string>;
  searchConfig = { separateWordSearch: false };
  url =
    'source: https://medium.com/angular-in-depth/wrapping-commonjs-library-in-angular-8-directive-on-the-example-of-mark-js-976cbcd5d10a';

  ngAfterViewInit(): void {
    // create stream from inpout change event with rxjs 'from' function
    this.searchText$ = fromEvent(
      this.searchElemRef.nativeElement,
      'keyup'
    ).pipe(
      map((e: Event) => (e.target as HTMLInputElement).value),
      debounceTime(300),
      distinctUntilChanged()
    );
  }
}
