import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import 'brace';
import { Editor } from 'brace';
import 'brace/ext/language_tools';
import 'brace/ext/beautify';
import ace from 'brace';
const langTools = ace.acequire('ace/ext/language_tools');
const beautify = ace.acequire('ace/ext/beautify');

// import 'brace/mode/php';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import 'brace/theme/twilight';
import 'brace/theme/github';
import {
  AceComponent,
  AceConfigInterface,
  AceDirective,
} from 'ngx-ace-wrapper';
import { AceEditorServiceService } from './ace-editor-service.service';

// dev example
export const RETURNTYPE_VALUES = [
  'void',
  'number',
  'boolean',
  'string',
  'object',
] as const; // 'undefined', 'symbol', 'null', 'bigint'
export type ReturnType = typeof RETURNTYPE_VALUES[number];

export const PARAMETER_VALUES = [
  'number',
  'boolean',
  'string',
  'object',
] as const; // 'undefined', 'symbol', 'null', 'bigint'
export type ParameterValues = typeof PARAMETER_VALUES[number];

@Component({
  selector: 'lib-ace-editor',
  templateUrl: './ace-editor.component.html',
  styleUrls: ['./ace-editor.component.scss'],
  // FIXME ace styling
  encapsulation: ViewEncapsulation.None,
})
export class AceEditorComponent implements OnInit, AfterViewInit {
  @ViewChild('editor')
  editor: AceComponent;

  @ViewChild(AceDirective, { static: false })
  directiveRef: AceDirective;

  @Input()
  autocompleteData: any[] = [];

  @Input()
  returnType: ReturnType = undefined;

  @Input()
  code = ``;

  @Input()
  cssClass = '';

  aceBase: Editor;

  /*

  It is possible to create a custom mode for Ace Editor with ace.define().
  However, Ace has a default folder for modes. It appears that this can be
  customized with a function called setModuleUrl in the config, but it
  doesn't appear to be accessible with the Brace wrapper.

  */

  config: AceConfigInterface = {
    theme: 'github',
    mode: 'javascript',
    selectionStyle: 'text',
    enableLiveAutocompletion: true,
    enableBasicAutocompletion: true,
    fontSize: 18,
    wrap: true,
    showPrintMargin: false,
    highlightGutterLine: true,
  };
  constructor(private aceEditorServiceService: AceEditorServiceService) {}

  ngOnInit(): void {
    langTools.setCompleters([
      this.aceEditorServiceService.getAutocomplete(this.autocompleteData),
    ]);
  }

  ngAfterViewInit(): void {
    this.aceBase = this.directiveRef.ace();
    this.aceBase.focus();
    this.aceBase.setValue(this.code, -1);
    // do not show errors, warning for selected mode javascript
    this.aceBase.getSession().setUseWorker(false);

    // add listener
  }

  beautify(): void {
    // this.aceEditorServiceService.beautify(this.aceBase.session);
    beautify.beautify(this.aceBase.session);
  }

  logValue(): void {
    console.log(this.aceBase.session.getValue());
  }

  submit(): void {
    // this.aceBase.session.doc.revertDeltas([]);
  }
}
