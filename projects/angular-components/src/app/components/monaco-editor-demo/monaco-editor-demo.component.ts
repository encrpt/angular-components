import { Component, OnInit } from '@angular/core';
import {
  PARAMETER_VALUES,
  ReturnType,
  RETURNTYPE_VALUES,
} from 'projects/ng-encrpt/src/lib/ace-editor/ace-editor.component';

@Component({
  selector: 'app-monaco-editor-demo',
  templateUrl: './monaco-editor-demo.component.html',
  styleUrls: ['./monaco-editor-demo.component.scss'],
})
export class MonacoEditorDemoComponent implements OnInit {
  autocompleteData = [];
  returnType: ReturnType = 'void';
  returnTypeValues = RETURNTYPE_VALUES;
  examples = {
    DSL1: [
      { label: 'method101()', returnType: 'number' },
      { label: 'method102(string)', returnType: 'void' },
      { label: 'method103(string)', returnType: 'void' },
    ],
    DSL2: [
      { label: 'method201(date)', returnType: 'number' },
      { label: 'method202(number)', returnType: 'boolean' },
      { label: 'method203()', returnType: 'void' },
    ],
    DSL3: [],
  };

  _selectValue: string;

  get selectValue() {
    return this._selectValue;
  }
  set selectValue(_selectValue: string) {
    this._selectValue = _selectValue;
    this.autocompleteData = null;
    setTimeout(() => {
      this.autocompleteData = this.examples[_selectValue].map((item) => {
        return {
          name: item.label,
          value: item.label,
          meta: item.returnType,
          description: 'description',
          parameters: 'parameters',
          returnType: 'returnType',
        };
      });
    }, 100);
  }

  dsls = Object.keys(this.examples);

  constructor() {
    //random init
    this.examples.DSL3 = new Array(20).fill(null).map((item, index) => {
      item = {};
      item.returnType =
        RETURNTYPE_VALUES[Math.floor(Math.random() * RETURNTYPE_VALUES.length)];

      item.label = `method${(index + 1).toString().padStart(2, '0')}(${
        PARAMETER_VALUES[Math.floor(Math.random() * PARAMETER_VALUES.length)]
      })`;
      return item;
    });

    this.selectValue = 'DSL2';
  }

  ngOnInit(): void {}
}
