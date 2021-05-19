import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SliderCircleComponent } from './components/slider-circle/slider-circle.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { InputButtonComponent } from './components/input-button/input-button.component';
import { InputFileComponent } from './components/input-file/input-file.component';
import { TitleFormComponent } from './components/title-form/title-form.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ExtenableFormGridComponent } from './components/extenable-form-grid/extenable-form-grid.component';
import { MatDividerModule } from '@angular/material/divider';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TreeSelectComponent } from './components/tree-select/tree-select.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTreeModule } from '@angular/material/tree';
import { ExtenableTextGridComponent } from './components/extenable-text-grid/extenable-text-grid.component';

@NgModule({
  declarations: [
    SliderCircleComponent,
    LoadingSpinnerComponent,
    InputButtonComponent,
    InputFileComponent,
    TitleFormComponent,
    ErrorMessageComponent,
    ExtenableFormGridComponent,
    TreeSelectComponent,
    ExtenableTextGridComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    MatSliderModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    DragDropModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatTreeModule,
  ],
  exports: [
    SliderCircleComponent,
    LoadingSpinnerComponent,
    InputButtonComponent,
    InputFileComponent,
    TitleFormComponent,
    ExtenableFormGridComponent,
    TreeSelectComponent,
    ExtenableTextGridComponent,
  ],
})
export class MatxModule {}
