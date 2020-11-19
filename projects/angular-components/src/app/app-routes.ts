import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DemoHomeComponent } from './components/demo-home/demo-home.component';
import { DemoMenuComponent } from './components/demo-menu/demo-menu.component';
import { NgxMarkjsDemoComponent } from './components/ngx-markjs-demo/ngx-markjs-demo.component';
import { SliderCircleDemoComponent } from './components/slider-circle-demo/slider-circle-demo.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: DemoHomeComponent
  },
  {
    path: 'silder-circle',
    component: SliderCircleDemoComponent
  },
  {
    path: 'ngx-markjs',
    component: NgxMarkjsDemoComponent
  },
];

