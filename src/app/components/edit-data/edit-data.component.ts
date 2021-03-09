import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as hljs from 'highlight.js';
import { PrettyPrintPipe } from 'src/app/pipes/pretty-print.pipe';

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.scss']
})
export class EditDataComponent implements AfterViewInit {
  @Input() data: Record<string, string> | string;
  @Input() type: string = 'json';
  @Input() editable = true;
  @Output() dataChange = new EventEmitter<string | Record<string, string>>();

  @ViewChild('ref') ref: ElementRef;

  constructor(private prettyPrintPipe: PrettyPrintPipe) { }

  ngAfterViewInit(): void {
    this.injectCode();
  }

  ngOnChanges(): void {
    this.injectCode();
  }

  private injectCode(): void {
    if (this.ref) {
      this.ref.nativeElement.innerHTML = '';

      const codeEl = document.createElement('code');
      codeEl.className = `language-${this.type}`;

      if (this.editable) {
        codeEl.setAttribute('contenteditable', "true");
      }

      if (this.type === 'json') {
        codeEl.innerText = this.prettyPrintPipe.transform(this.data);
      }

      codeEl.addEventListener('blur', () => {
        this.onDataChange();
      });

      hljs.highlightBlock(codeEl);
      this.ref.nativeElement.appendChild(codeEl);
    }
  }

  onDataChange(): void {
    this.dataChange.emit(this.ref.nativeElement.innerText);
  }
}
