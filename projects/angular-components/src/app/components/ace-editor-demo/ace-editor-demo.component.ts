import { Component, OnInit } from '@angular/core';
import {
  ReturnType,
  RETURNTYPE_VALUES,
} from 'projects/ng-encrpt/src/lib/ace-editor/ace-editor.component';

@Component({
  selector: 'app-ace-editor-demo',
  templateUrl: './ace-editor-demo.component.html',
  styleUrls: ['./ace-editor-demo.component.scss'],
})
export class AceEditorDemoComponent implements OnInit {
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

  code = 'class01.method01(type01)';

  _selectValue: string;

  get selectValue() {
    return this._selectValue;
  }
  set selectValue(_selectValue: string) {
    console.log(_selectValue);
    this.code = _selectValue === 'DSL3' ? 'class01.method01(type01)' : '';
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
    // random init
    const examples = new Array(5).fill(null).map((item, index) => {
      item = {};
      item.returnType =
        RETURNTYPE_VALUES[Math.floor(Math.random() * RETURNTYPE_VALUES.length)];

      item.label = `class${(index + 1).toString().padStart(2, '0')}.method01`;
      return item;
    });

    console.log(JSON.stringify(examples));

    this.examples.DSL3 = [
      { returnType: 'number', label: 'data.example' },
      { returnType: 'number', label: 'data.test' },
      { returnType: 'number', label: 'data.demo' },
      { returnType: 'void', label: 'method01(string)' },
      { returnType: 'number', label: 'method02(object)' },
      { returnType: 'void', label: 'method03(string)' },
      { returnType: 'object', label: 'method04(object)' },
      { returnType: 'string', label: 'method05(number)' },
      { returnType: 'number', label: 'method06(number)' },
      { returnType: 'object', label: 'method07(object)' },
      { returnType: 'boolean', label: 'method08(boolean)' },
      { returnType: 'number', label: 'method09(string)' },
      { returnType: 'boolean', label: 'method10(boolean)' },
      { returnType: 'object', label: 'method11(number)' },
      { returnType: 'void', label: 'method12(object)' },
      { returnType: 'boolean', label: 'method13(boolean)' },
      { returnType: 'boolean', label: 'method14(object)' },
      { returnType: 'string', label: 'method15(object)' },
      { returnType: 'number', label: 'method16(object)' },
      { returnType: 'object', label: 'method17(string)' },
      { returnType: 'void', label: 'method18(string)' },
      { returnType: 'string', label: 'method19(object)' },
      { returnType: 'void', label: 'method20(boolean)' },
      { returnType: 'number', label: 'value101' },
      { returnType: 'string', label: 'value102' },
      { returnType: 'string', label: 'value103' },
      { returnType: 'boolean', label: 'value104' },
      { returnType: 'number', label: 'value105' },
      { returnType: 'boolean', label: 'class01.method01' },
      { returnType: 'number', label: 'class02.method01' },
      { returnType: 'boolean', label: 'class03.method01' },
      { returnType: 'object', label: 'class04.method01' },
      { returnType: 'string', label: 'class05.method01' },
    ];

    this.selectValue = 'DSL3';
  }

  ngOnInit(): void {}
}
