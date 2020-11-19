import { Component, OnInit } from '@angular/core';
import { SliderCircleConfig } from 'projects/matx/src/public-api';
interface SliderCircleConfigExample extends SliderCircleConfig {
  id: string
  size: number
  cssClass: string

}

@Component({
  selector: 'app-slider-circle-demo',
  templateUrl: './slider-circle-demo.component.html',
  styleUrls: ['./slider-circle-demo.component.scss']
})
export class SliderCircleDemoComponent implements OnInit {

  title = 'angular-demo';
  useBasicExamples = false;

  renderSizes = [30, 40, 80, 100, 120, 150, 200, 800]
  strokeWidths = [3, 5, 10, 12, 20, 24, 30, 50, 80, 100]

  sliderExamples: SliderCircleConfigExample[][] = [];

  ngOnInit(): void {
    this.renderSizes.forEach((size) => {
      const sliderExamplesRow = this.strokeWidths
        .filter(strokeWidth => (strokeWidth / size < 0.2 && strokeWidth / size > 0.015))
        .map(strokeWidth => {
          const min = Math.random() > 0.5 ? strokeWidth > 20 ? 100 : Math.round(Math.random() * 100) : Math.round(Math.random() * -100);
          const max = Math.abs(min) + (strokeWidth > 20 ? 100 : Math.round(Math.random() * 500));

          const editMode = !(size === 150 && (strokeWidth === 5 || strokeWidth === 10));

          const scc: SliderCircleConfigExample = {
            size,
            id: `${size}_${strokeWidth}`,
            cssClass: `slider-${size}-${strokeWidth}`,
            strokeWidth,
            areaColor: strokeWidth > 10 ? '#97bce6' : '#aaa',
            circleColor: strokeWidth > 10 ? '#2668b4' : strokeWidth === 5 ? '#f39c6e' : '#ffffff',
            color: strokeWidth < 20 ? 'primary' : null,
            min,
            max,
            value: min + Math.round(Math.random() * (max - min)),
            animationSec: 4,
            editMode
          };
          return scc;
        });
      this.sliderExamples.push(sliderExamplesRow)
    });

    console.log(this.sliderExamples);
  }

  changeValue(label, $event) {
    console.log(label, $event);
  }
}
