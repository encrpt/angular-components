import { Component, ViewEncapsulation, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputFileComponent implements OnInit {

  constructor() { }

  get fileCount(): number {
    return this._files && this._files.length || 0;
  }

  get fileName(): string {
    return this._files && this._files.length ? this._files[0].name : '';
  }

  @Input()
  accept: string;

  @Input()
  disabled = false;

  @Input()
  showFileNames = true;

  @Input()
  buttonWidth = 'auto';

  // multiple, webkitdirectory
  @Input()
  selectType: string;

  @Input()
  color = 'accent';

  @Input()
  matIcon = 'file_upload';

  @Input()
  buttonType = 'mat-raised-button';

  @Input()
  label = 'Load from disk';

  @Output()
  onFileSelect: EventEmitter<File[]> = new EventEmitter();

  @Output()
  onSelectStart: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('inputFile')
  nativeInputFile: ElementRef;

  private _files: File[];

  ngOnInit() : void {
  }
  selectStart() {
  }

  onNativeInputFileSelect($event) {
    this._files = $event.target.files;
    this.onFileSelect.emit(this._files);
  }

  selectFile() {
    this.onSelectStart.emit(true);
    this.nativeInputFile.nativeElement.value = '';
    this.nativeInputFile.nativeElement.click();
  }
}
