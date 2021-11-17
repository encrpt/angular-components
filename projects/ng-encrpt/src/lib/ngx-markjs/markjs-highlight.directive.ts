import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Renderer2,
} from '@angular/core';
// import * as Mark from 'mark.js';

declare let require: any;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const markLib = require('mark.js');

let cancelAnimationId;

const animate = ({ timing, draw, duration }) => {
  const start = performance.now();
  const animate2 = (time: number) => {
    // timeFraction goes from 0 to 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) {
      timeFraction = 1;
    }
    // calculate the current animation state
    const progress = timing(timeFraction);
    draw(progress); // draw it
    if (timeFraction < 1) {
      cancelAnimationId = requestAnimationFrame(animate2);
    }
  };
  cancelAnimationId = requestAnimationFrame(animate2);
};

@Directive({
  selector: '[libHighlight]',
})
export class MarkjsHighlightDirective implements OnChanges {
  @Input()
  markjsHighlight = ''; // our inputs

  @Input()
  markjsConfig: any = {};

  @Input()
  scrollToFirstMarked = false;

  @Output()
  getInstance = new EventEmitter<any>();

  markInstance: any;

  constructor(
    private contentElementRef: ElementRef, // host element ref
    private renderer: Renderer2 // we will use it to scroll
  ) {}

  ngOnChanges(changes: any): void {
    //if searchText is changed - redo marking
    if (!this.markInstance) {
      // emit mark.js instance (if needeed)
      this.markInstance = new markLib(this.contentElementRef.nativeElement);
      this.getInstance.emit(this.markInstance);
    }

    this.hightlightText(); // should be implemented
    if (this.scrollToFirstMarked) {
      this.scrollToFirstMarkedText(); // should be implemented
    }
  }

  hightlightText(): void {
    this.markjsHighlight = this.markjsHighlight || '';

    if (this.markjsHighlight && this.markjsHighlight.length <= 2) {
      this.markInstance.unmark();
      return;
    } else {
      this.markInstance.unmark({
        done: () => {
          this.markInstance.mark(this.markjsHighlight || '', this.markjsConfig);
        },
      });
    }
  }

  scrollToFirstMarkedText(): void {
    const content = this.contentElementRef.nativeElement;
    // calculating offset to the first marked element
    const firstOffsetTop = (content.querySelector('mark') || {}).offsetTop || 0;
    this.scrollSmooth(content, firstOffsetTop); // start scroll
  }

  scrollSmooth(scrollElement: Element, firstOffsetTop: number): void {
    const renderer = this.renderer;

    if (cancelAnimationId) {
      cancelAnimationFrame(cancelAnimationId);
    }
    const currentScrollTop = scrollElement.scrollTop;
    const delta = firstOffsetTop - currentScrollTop;

    animate({
      duration: 500,
      // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
      timing(timeFraction) {
        return timeFraction;
      },
      // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
      draw(progress) {
        const nextStep = currentScrollTop + progress * delta;
        // set scroll with Angular renderer
        renderer.setProperty(scrollElement, 'scrollTop', nextStep);
      },
    });
  }
}
