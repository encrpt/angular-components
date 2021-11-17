import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AceModule } from 'ngx-ace-wrapper';
import { ACE_CONFIG } from 'ngx-ace-wrapper';
import { AceConfigInterface } from 'ngx-ace-wrapper';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AceEditorComponent } from './lib/ace-editor/ace-editor.component';
import { MonacoEditorComponent } from './lib/monaco-editor/monaco-editor.component';
import { MarkjsHighlightDirective } from './lib/ngx-markjs/markjs-highlight.directive';

const DEFAULT_ACE_CONFIG: AceConfigInterface = {};

const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: '', // configure base path cotaining monaco-editor directory after build default: './assets'
  defaultOptions: { scrollBeyondLastLine: false }, // pass default options to be used
  onMonacoLoad: () => {
    console.log((window as any).monaco);
  }, //  extend monaco editor functionalities, e.g. monaco.languages.json.jsonDefaults.setDiagnosticsOptions
};

@NgModule({
  declarations: [
    AceEditorComponent,
    MonacoEditorComponent,
    MarkjsHighlightDirective,
  ],
  exports: [
    AceEditorComponent,
    MonacoEditorComponent,
    MarkjsHighlightDirective,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AceModule,
    MonacoEditorModule.forRoot(monacoConfig),
  ],
  providers: [
    {
      provide: ACE_CONFIG,
      useValue: DEFAULT_ACE_CONFIG,
    },
  ],
})
export class NgEncrptModule {}
