import { Component, Input, OnInit } from '@angular/core';
import { NgxEditorModel, NgxMonacoEditorConfig } from 'ngx-monaco-editor';

@Component({
  selector: 'lib-monaco-editor',
  templateUrl: './monaco-editor.component.html',
  styleUrls: ['./monaco-editor.component.scss'],
})
export class MonacoEditorComponent implements OnInit {
  constructor() {}

  @Input()
  returnType: any = undefined;

  editorOptions = {
    theme: 'vs-dark',
    language: 'javascript',
    fontSize: 20,
    minimap: { enabled: false },
  };
  code: string = 'function x() {\nconsole.log("Hello world!");\n}';

  ngOnInit(): void {}

  onInit(editor) {
    let line = editor.getPosition();
    console.log(line);
  }
}
