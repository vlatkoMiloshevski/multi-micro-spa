import { Component } from '@angular/core';

@Component({
  selector: 'hmx-table-campaign-status',
  templateUrl: './table-campaign-status.component.html'
})
export class TableCampaignStatusComponent {
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }
}
