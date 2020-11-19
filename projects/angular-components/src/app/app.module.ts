import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SliderCircleDemoComponent } from './components/slider-circle-demo/slider-circle-demo.component';
import { MatxModule } from '../../../matx/src/public-api';
import { NgxMarkjsModule } from '../../../ngx-markjs/src/public-api';
import { CommonModule } from '@angular/common';
import { DemoMenuComponent } from './components/demo-menu/demo-menu.component';
import { NgxMarkjsDemoComponent } from './components/ngx-markjs-demo/ngx-markjs-demo.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { RandomPipe } from './pipes/random.pipe';
import { DemoHomeComponent } from './components/demo-home/demo-home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    RandomPipe, AppComponent, DemoMenuComponent, SliderCircleDemoComponent, NgxMarkjsDemoComponent, DemoHomeComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    MatxModule,
    NgxMarkjsModule,
    MatSliderModule,
    MatInputModule,
    FormsModule,
    MatSidenavModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
