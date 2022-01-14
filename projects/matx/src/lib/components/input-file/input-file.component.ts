import {
  Component,
  ViewEncapsulation,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  Input,
} from '@angular/core';

@Component({
  selector: 'lib-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InputFileComponent implements OnInit {
  get fileCount(): number {
    return (this.pFiles && this.pFiles.length) || 0;
  }

  get fileName(): string {
    return this.pFiles && this.pFiles.length ? this.pFiles[0].name : '';
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
  fileSelected: EventEmitter<File[]> = new EventEmitter();

  @Output()
  selectStarted: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('inputFile')
  nativeInputFile: ElementRef;

  private pFiles: File[];

  constructor() {}

  ngOnInit(): void {}
  selectStart() {}

  onNativeInputFileSelect(event: any): void {
    this.pFiles = event.target.files;
    this.fileSelected.emit(this.pFiles);
  }

  selectFile(): void {
    this.selectStarted.emit(true);
    this.nativeInputFile.nativeElement.value = '';
    this.nativeInputFile.nativeElement.click();
  }
}
