import { Component, Input } from '@angular/core';

@Component({
  selector: 'hmx-table-link-launch',
  templateUrl: './table-link-launch.component.html',
  styleUrls: ['./table-link-launch.component.scss']
})
export class TableLinkLaunchComponent {
  @Input() value: string;
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }
}
