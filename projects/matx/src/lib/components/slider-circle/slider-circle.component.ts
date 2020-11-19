import { Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';

interface AnimateOptions {
  useAnimation: boolean,
  changeStrokeClor: boolean
}

@Component({
  selector: 'app-slider-circle',
  templateUrl: './slider-circle.component.html',
  styleUrls: ['./slider-circle.component.scss']
})
export class SliderCircleComponent implements OnInit {

  constructor() { }

  _size: number;
  @Input()
  set size(size: number) {
    this._size = size;
  }

  get size(): number {
    return this._size
  }

  _value = 0;
  @Input()
  set value(value: number) {
    this._value = Math.round(value * 10) / 10;
  }

  get value(): number {
    if (isNaN(this._value)) {
      return 0;
    } else {
      return this._value
    }
  }

  /* used for number input */
  set valueUserInput(value: number) {
    this._value = Math.round(value * 10) / 10;
    this.animate(this.value, { useAnimation: false, changeStrokeClor: true });
  }

  get valueUserInput(): number {
    if (isNaN(this._value)) {
      return 0;
    } else {
      return this._value
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
  areaColor = '#eee'

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
  change: EventEmitter<any> = new EventEmitter();

  startY = 80;
  startX = 10;
  minSize = 50;

  @ViewChild('circlepath') circlepath: any;

  @HostListener('dblclick', ['$event'])
  onDblClick(event) {
    if (this.editMode && event.srcElement.id === "view-edit-field") {
      this.valueInput = !this.valueInput;
    }
  }
  @HostListener('click', ['$event'])
  onClick(event) {
    if (this.editMode && !event.srcElement.id.includes("mat-input")) {
      this.valueInput = false;
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e) {
    if (e.keyCode == 13) {
      this.valueInput = false;
    }
  }

  strokeOpacity = 0.5;
  pathToFill: any;
  maxLength = 0;
  valueInput = false;

  ngOnInit(): void {
    if (!this.animationString) {
      // compute based on time
      this.animationString = `${this.animationSec * this.value / this.max}s`
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

  ngAfterViewInit() {
    this.pathToFill = this.circlepath.nativeElement;
    this.maxLength = this.pathToFill.getTotalLength();
    if (this.value > this.min) {
      this.animate(this.value, { useAnimation: true, changeStrokeClor: false });
    } else {
      console.log({ value: this.value, min: this.min, max: this.max })
    }
  }

  changeValue($event) {
    // for label
    this.value = ($event.value);
    this.animate($event.value, { useAnimation: false, changeStrokeClor: true });
  }

  animate(eventValue: number, animateOptions: AnimateOptions) {
    const circleValue = this.maxLength * Math.abs((eventValue - this.min) / (this.max - this.min));

    this.change.emit({ value: eventValue, min: this.min, max: this.max });

    if (animateOptions.changeStrokeClor) {
      if (eventValue > this.min) {
        this.strokeOpacity = this.areaStrokeOpacity;
      } else {
        this.strokeOpacity = 0;
      }
    }

    // Clear any previous transition
    this.pathToFill.style.transition = this.pathToFill.style.Transition = 'none';

    // Set up the starting positions, move second dash far away
    this.pathToFill.style.strokeDasharray = (circleValue) + ' ' + this.size * 2 + 1;

    // optional define our transition
    if (this.animationString && animateOptions.useAnimation) {
      this.pathToFill.style.strokeDashoffset = circleValue;
      // Trigger a layout so styles are calculated & the browser
      // picks up the starting position before animating
      this.pathToFill.getBoundingClientRect();
      this.pathToFill.style.transition = this.pathToFill.style.Transition = `stroke-dashoffset ${this.animationString} ease-in-out`;
      this.pathToFill.style.strokeDashoffset = '0';
    }
  }
}
