import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-monaco-editor',
  templateUrl: './monaco-editor.component.html',
  styleUrls: ['./monaco-editor.component.scss'],
})
export class MonacoEditorComponent implements OnInit {

  @Input()
  returnType: any = undefined;

  editorOptions = {
    theme: 'vs-dark',
    language: 'javascript',
    fontSize: 20,
    minimap: { enabled: false },
  };
  code = 'function x() {\nconsole.log("Hello world!");\n}';

  constructor() {}

  ngOnInit(): void {}

  onInit(editor) {
    const line = editor.getPosition();
    console.log(line);
  }
}
