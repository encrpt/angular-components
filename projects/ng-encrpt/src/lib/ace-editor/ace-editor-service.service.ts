import { Injectable } from '@angular/core';
import ace from 'brace';
const tokenIterator = ace.acequire('ace/token_iterator').TokenIterator;

@Injectable({
  providedIn: 'root',
})
export class AceEditorServiceService {
  constructor() {}

  beautify(session: ace.IEditSession): void {
    const iterator = new tokenIterator(session, 0, 0);
    let token = iterator.getCurrentToken();

    let code = '';

    const newLines: any[] = [
      {
        type: 'paren.lparen',
        value: '(',
        indent: true,
      },
      {
        type: 'paren.rparen',
        value: ')',
        indent: false,
      },
    ];

    const spaces: any[] = [
      // {
      //   type: 'paren.lparen',
      //   value: '(',
      //   append: true,
      //   prepend: true,
      // },
      // {
      //   type: 'paren.rparen',
      //   value: ')',
      //   append: true,
      //   prepend: true,
      // },
      // {
      //   type: 'entity.other.attribute-name',
      //   prepend: true,
      // },
      // {
      //   type: 'storage.type',
      //   value: 'var',
      //   append: true,
      // },
      // {
      //   type: 'keyword.operator',
      //   value: '=',
      // },
      // {
      //   type: 'keyword',
      //   value: 'as',
      //   prepend: true,
      //   append: true,
      // },
    ];

    // const blockTags = [];

    let indentation = 0;
    const dontBreak = false;
    // let tag: any;
    // let lastTag: any;
    let lastToken: any = {};
    // let nextTag;

    while (token) {
      if (token.type === 'paren.rparen') {
        console.log(token);
      }

      const nextToken: any = iterator.stepForward();

      //trim spaces
      if (token.type === 'text') {
        token.value = token.value.trim();
      }

      //skip empty tokens
      if (!token.value) {
        token = nextToken;
        continue;
      }

      //put spaces back in
      for (const i in spaces) {
        if (
          token.type === spaces[i].type &&
          (!spaces[i].value || token.value === spaces[i].value)
        ) {
          if (spaces[i].prepend) {
            token.value = ' ' + token.value;
          }

          if (spaces[i].append) {
            token.value += ' ';
          }
        }
      }

      //tag name
      if (token.type.substr(0, 17) === 'meta.tag.tag-name') {
        // tag = token.value;
      }

      //new line before
      if (!dontBreak) {
        //outdent
        for (const i in newLines) {
          if (
            token.type === newLines[i].type &&
            lastToken.value === newLines[i].value
          ) {
            if (newLines[i].indent === false) {
              indentation--;
            }
            console.log(token.value);
            console.log(indentation);

            break;
          }
        }

        for (const i in newLines) {
          if (
            lastToken.type === newLines[i].type &&
            lastToken.value === newLines[i].value
          ) {
            if (newLines[i].indent === true) {
              indentation++;
            }

            // console.log(lastToken.value);
            // console.log(indentation);
            // }

            if (!newLines[i].dontBreak) {
              code += '\n';

              //indent
              for (let c = 0; c < indentation; c++) {
                code += '\t';
              }
            }

            break;
          }
        }
      }

      code += token.value;
      // console.log(code);

      //next token
      // lastTag = tag;

      lastToken = token;

      token = nextToken;

      if (!token) {
        break;
      }
    }

    console.log(code);

    session.setValue(code);
  }

  getAutocomplete(autocompleteData): any {
    // add item as description
    autocompleteData = autocompleteData.map((i) => {
      i.pDescription = JSON.stringify(i, null, 2);
      return i;
    });

    return {
      getCompletions: (
        editor: ace.Editor,
        session: ace.IEditSession,
        position: ace.Position,
        prefix,
        callback
      ) => {
        const positionAutocomplete = autocompleteData;

        // BACKWARD
        const tokenIteratorBackwards: ace.TokenIterator = new tokenIterator(
          session,
          position.row,
          position.column
        );
        const token: ace.TokenInfo = tokenIteratorBackwards.getCurrentToken();
        // if (token.type === 'text') {
        //   callback(null, []);
        // }
        const backwards: any[] = [];
        let backward = tokenIteratorBackwards.stepBackward();
        while (backward) {
          backwards.push(backward);
          backward = tokenIteratorBackwards.stepBackward();
        }

        // FORWARD
        const tokenIteratorForwards: ace.TokenIterator = new tokenIterator(
          session,
          position.row,
          position.column
        );
        const forwards: any[] = [];
        let forward = tokenIteratorForwards.stepForward();
        while (forward) {
          forwards.push(forward);
          forward = tokenIteratorForwards.stepForward();
        }

        console.log(token);

        console.table(
          [
            ...backwards.reverse(),
            Object.assign({}, token, { current: true }),
            ...forwards,
          ],
          ['type', 'value', 'current']
        );

        callback(null, positionAutocomplete);
      },
      getDocTooltip: (item) => {
        // if (item.description || item.parameters) {
        const paramsSignature = item.parameters;
        const javaStyleSignature = `${item.returnType} ${item.name}(${paramsSignature})`;
        item.docHTML = `<div class="ace-editor-tooltip"><b>${javaStyleSignature}</b><hr/>
        <ul><li>${item.pDescription}</li>
        <li>score: ${item.score}</li>
        <li>exactMatch: ${item.exactMatch}</li>
        <li>matchMask: ${item.matchMask}</li>
        </ul></div>`;
        // }
      },
    };
  }
}
