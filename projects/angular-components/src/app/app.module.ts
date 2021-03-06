import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatxModule } from '../../../matx/src/public-api';
import { NgxMarkjsModule } from '../../../ngx-markjs/src/public-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoHomeComponent } from './components/demo-home/demo-home.component';
import { DemoMenuComponent } from './components/demo-menu/demo-menu.component';
import { NgxMarkjsDemoComponent } from './components/ngx-markjs-demo/ngx-markjs-demo.component';
import { SliderCircleDemoComponent } from './components/slider-circle-demo/slider-circle-demo.component';
import { MaterialModule } from './shared/material.module';
import { RandomPipe } from './pipes/random.pipe';
import { InputFileDemoComponent } from './components/input-file-demo/input-file-demo.component';
import { InputButtonDemoComponent } from './components/input-button-demo/input-button-demo.component';
import { LoadingSpinnerDemoComponent } from './components/loading-spinner-demo/loading-spinner-demo.component';
import { RenderLinkPipe } from './pipes/render-link.pipe';

@NgModule({
  declarations: [
    RandomPipe, AppComponent, DemoMenuComponent, SliderCircleDemoComponent,
    NgxMarkjsDemoComponent, DemoHomeComponent, InputFileDemoComponent, InputButtonDemoComponent, LoadingSpinnerDemoComponent, RenderLinkPipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    MatxModule,
    NgxMarkjsModule,
    FormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
