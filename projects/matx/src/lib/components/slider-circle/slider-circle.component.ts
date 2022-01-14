import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

interface AnimateOptions {
  useAnimation: boolean;
  changeStrokeClor: boolean;
}

@Component({
  selector: 'lib-slider-circle',
  templateUrl: './slider-circle.component.html',
  styleUrls: ['./slider-circle.component.scss'],
})
export class SliderCircleComponent implements OnInit, AfterViewInit {
  @Input()
  set size(size: number) {
    this.pSize = size;
  }

  get size(): number {
    return this.pSize;
  }

  @Input()
  set value(value: number) {
    this.pValue = Math.round(value * 10) / 10;
  }

  get value(): number {
    if (isNaN(this.pValue)) {
      return 0;
    } else {
      return this.pValue;
    }
  }
  /* used for number input */
  set valueUserInput(value: number) {
    this.pValue = Math.round(value * 10) / 10;
    this.animate(this.value, { useAnimation: false, changeStrokeClor: true });
  }

  get valueUserInput(): number {
    if (isNaN(this.pValue)) {
      return 0;
    } else {
      return this.pValue;
    }
  }

  // FIXME calculated by size to all values finished in same
  @Input()
  animationSec = 2;

  @Input()
  animationString = null;

  @Input()
  strokeWidth = 3;

  @Input()
  circleColor = '#aaa';

  @Input()
  areaColor = '#eee';

  @Input()
  areaStrokeOpacity = 1;

  @Input()
  editMode = true;

  @Input()
  showValueLabel = true;

  /* mat-slider */
  @Input()
  min = 0;

  @Input()
  max = 100;

  @Input()
  tickInterval = null;

  @Input()
  step = null;

  @Input()
  color = null;

  @Input()
  stretchX = 0.2;

  @Input()
  stretchY = 0.8;

  @Output()
  changedValue: EventEmitter<any> = new EventEmitter();

  @ViewChild('circlepath') circlepath: any;

  pSize: number;
  pValue = 0;

  startY = 80;
  startX = 10;
  minSize = 50;

  strokeOpacity = 0.5;
  pathToFill: any;
  maxLength = 0;
  valueInput = false;

  constructor() {}

  @HostListener('dblclick', ['$event'])
  onDblClick(event: any): void {
    if (this.editMode && event.srcElement.id === 'view-edit-field') {
      this.valueInput = !this.valueInput;
    }
  }
  @HostListener('click', ['$event'])
  onClick(event: any): void {
    if (this.editMode && !event.srcElement.id.includes('mat-input')) {
      this.valueInput = false;
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent): void {
    if (e.keyCode === 13) {
      this.valueInput = false;
    }
  }

  ngOnInit(): void {
    if (!this.animationString) {
      // compute based on time
      this.animationString = `${(this.animationSec * this.value) / this.max}s`;
    }
    if (this.value > this.min) {
      this.strokeOpacity = this.areaStrokeOpacity;
    } else {
      this.strokeOpacity = 0;
    }
    if (this.size < this.minSize) {
      this.editMode = false;
    }
    this.startX = this.size * this.stretchX;
    this.startY = this.size * this.stretchY;
  }

  ngAfterViewInit(): void {
    this.pathToFill = this.circlepath.nativeElement;
    this.maxLength = this.pathToFill.getTotalLength();
    if (this.value > this.min) {
      this.animate(this.value, { useAnimation: true, changeStrokeClor: false });
    } else {
      console.log({ value: this.value, min: this.min, max: this.max });
    }
  }

  changeValue(event: any): void {
    // for label
    this.value = event.value;
    this.animate(event.value, { useAnimation: false, changeStrokeClor: true });
  }

  animate(eventValue: number, animateOptions: AnimateOptions): void {
    const circleValue =
      this.maxLength *
      Math.abs((eventValue - this.min) / (this.max - this.min));

    this.changedValue.emit({ value: eventValue, min: this.min, max: this.max });

    if (animateOptions.changeStrokeClor) {
      if (eventValue > this.min) {
        this.strokeOpacity = this.areaStrokeOpacity;
      } else {
        this.strokeOpacity = 0;
      }
    }

    // Clear any previous transition
    this.pathToFill.style.transition = this.pathToFill.style.Transition =
      'none';

    // Set up the starting positions, move second dash far away
    this.pathToFill.style.strokeDasharray =
      circleValue + ' ' + this.size * 2 + 1;

    // optional define our transition
    if (this.animationString && animateOptions.useAnimation) {
      this.pathToFill.style.strokeDashoffset = circleValue;
      // Trigger a layout so styles are calculated & the browser
      // picks up the starting position before animating
      this.pathToFill.getBoundingClientRect();
      this.pathToFill.style.transition =
        this.pathToFill.style.Transition = `stroke-dashoffset ${this.animationString} ease-in-out`;
      this.pathToFill.style.strokeDashoffset = '0';
    }
  }
}
