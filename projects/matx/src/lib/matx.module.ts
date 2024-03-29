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
import { GridFormComponent } from './components/grid-form/grid-form.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { LevelEditComponent } from './components/level-edit/level-edit.component';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { OptionLabelPipe } from './components/level-edit/option-label.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AutocompleteSearchComponent } from './components/autocomplete-search/autocomplete-search.component';

@NgModule({
  declarations: [
    SliderCircleComponent,
    LoadingSpinnerComponent,
    InputButtonComponent,
    InputFileComponent,
    TitleFormComponent,
    ExtenableFormGridComponent,
    TreeSelectComponent,
    ExtenableTextGridComponent,
    GridFormComponent,
    LevelEditComponent,
    AutocompleteSearchComponent,
    OptionLabelPipe,
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
    MatToolbarModule,
    MatDialogModule,
    MatListModule,
    MatSelectModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatAutocompleteModule,
    MatIconModule,
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
    LevelEditComponent,
    AutocompleteSearchComponent,
  ],
})
export class MatxModule {}
