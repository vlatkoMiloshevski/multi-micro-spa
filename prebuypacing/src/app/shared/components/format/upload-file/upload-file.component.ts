import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'hmx-format-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class FormatUploadFileComponent implements OnInit {
  @Input() value: string;
  @Input() color: string;
  public isRed: boolean;

  ngOnInit(): void {
    this.isRed = this.color == 'red';
  }
}
