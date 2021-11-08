import { Routes } from '@angular/router';
import { DemoHomeComponent } from './components/demo-home/demo-home.component';
import { ExtenableFormGridDemoComponent } from './components/extenable-form-grid-demo/extenable-form-grid-demo.component';
import { ExtenableTextGridDemoComponent } from './components/extenable-text-grid-demo/extenable-text-grid-demo.component';
import { InputButtonDemoComponent } from './components/input-button-demo/input-button-demo.component';
import { InputFileDemoComponent } from './components/input-file-demo/input-file-demo.component';
import { LoadingSpinnerDemoComponent } from './components/loading-spinner-demo/loading-spinner-demo.component';
import { NgxMarkjsDemoComponent } from './components/ngx-markjs-demo/ngx-markjs-demo.component';
import { SliderCircleDemoComponent } from './components/slider-circle-demo/slider-circle-demo.component';
import { TreeSelectDemoComponent } from './components/tree-select-demo/tree-select-demo.component';
import { TwoLevelEditDemoComponent } from './components/two-level-edit-demo/two-level-edit-demo.component';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: DemoHomeComponent,
  },
  {
    path: 'two-level-edit',
    component: TwoLevelEditDemoComponent,
    data: {
      title: 'Material',
      description: 'chainable component for DnD-Sortable-MatList and MatSelect',
    },
  },
  {
    path: 'tree-select',
    component: TreeSelectDemoComponent,
    data: {
      title: 'Material',
      description: 'Tree menu based on MatTreeModule',
    },
  },
  {
    path: 'extenable-text-grid',
    component: ExtenableTextGridDemoComponent,
    data: {
      title: 'Material',
      description: 'An extendable text grid, dialog edit',
    },
  },
  {
    path: 'extenable-form-grid',
    component: ExtenableFormGridDemoComponent,
    data: {
      title: 'Material',
      description: 'An extendable form grid, table edit',
    },
  },
  {
    path: 'silder-circle',
    component: SliderCircleDemoComponent,
    data: {
      title: 'Material',
      description:
        'Mat-Silder with circle addon. Input numbers by double-click on value, min, max and read-only mode',
    },
  },
  {
    path: 'loading-spinner',
    component: LoadingSpinnerDemoComponent,
    data: {
      title: 'Material',
      description: 'Adding a -short- message inside the mat-spinner',
    },
  },
  {
    path: 'input-button',
    component: InputButtonDemoComponent,
    data: {
      title: 'Material',
      description:
        'Add a submit-button to critical actions or request a single line user-input to confirm an action.',
    },
  },
  {
    path: 'input-file',
    component: InputFileDemoComponent,
    data: {
      title: 'Material',
      description:
        'File upload component configureable for single file, multiple oder complete directory (webkit-only).',
    },
  },
  {
    path: 'ngx-markjs',
    component: NgxMarkjsDemoComponent,
    data: {
      title: 'Lib example',
      description:
        'Highlighted search unsing mark.js - search for DEMO in example text. SOURCE: https://medium.com/angular-in-depth/wrapping-commonjs-library-in-angular-8-directive-on-the-example-of-mark-js-976cbcd5d10a',
    },
  },
];
