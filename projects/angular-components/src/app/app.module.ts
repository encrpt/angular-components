import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgEncrptModule } from 'projects/ng-encrpt/src/ng-encrpt.module';
import { MatxModule } from '../../../matx/src/public-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AceEditorDemoComponent } from './components/ace-editor-demo/ace-editor-demo.component';
import { AutocompleteSearchDemoComponent } from './components/autocomplete-search-demo/autocomplete-search-demo.component';
import { DemoHomeComponent } from './components/demo-home/demo-home.component';
import { DemoMenuComponent } from './components/demo-menu/demo-menu.component';
import { ExtenableFormGridDemoComponent } from './components/extenable-form-grid-demo/extenable-form-grid-demo.component';
import { ExtenableTextGridDemoComponent } from './components/extenable-text-grid-demo/extenable-text-grid-demo.component';
import { InputButtonDemoComponent } from './components/input-button-demo/input-button-demo.component';
import { InputFileDemoComponent } from './components/input-file-demo/input-file-demo.component';
import { LoadingSpinnerDemoComponent } from './components/loading-spinner-demo/loading-spinner-demo.component';
import { MonacoEditorDemoComponent } from './components/monaco-editor-demo/monaco-editor-demo.component';
import { NgxMarkjsDemoComponent } from './components/ngx-markjs-demo/ngx-markjs-demo.component';
import { SliderCircleDemoComponent } from './components/slider-circle-demo/slider-circle-demo.component';
import { TreeSelectDemoComponent } from './components/tree-select-demo/tree-select-demo.component';
import { TwoLevelEditDemoComponent } from './components/two-level-edit-demo/two-level-edit-demo.component';
import { RandomPipe } from './pipes/random.pipe';
import { RenderLinkPipe } from './pipes/render-link.pipe';
import { MaterialModule } from './shared/material.module';

@NgModule({
  declarations: [
    RandomPipe,
    AppComponent,
    DemoMenuComponent,
    SliderCircleDemoComponent,
    NgxMarkjsDemoComponent,
    DemoHomeComponent,
    InputFileDemoComponent,
    InputButtonDemoComponent,
    LoadingSpinnerDemoComponent,
    RenderLinkPipe,
    ExtenableFormGridDemoComponent,
    ExtenableTextGridDemoComponent,
    TreeSelectDemoComponent,
    TwoLevelEditDemoComponent,
    AceEditorDemoComponent,
    MonacoEditorDemoComponent,
    AutocompleteSearchDemoComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    MatxModule,
    FormsModule,
    MaterialModule,
    NgEncrptModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
