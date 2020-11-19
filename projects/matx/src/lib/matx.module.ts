import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SliderCircleComponent } from './components/slider-circle/slider-circle.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [SliderCircleComponent],
  imports: [FormsModule, BrowserModule,
    BrowserAnimationsModule,
    CommonModule, MatSliderModule, MatInputModule,
  ],
  exports: [SliderCircleComponent]
})
export class MatxModule { }
