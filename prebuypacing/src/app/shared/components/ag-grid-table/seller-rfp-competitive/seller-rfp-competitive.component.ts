import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'hmx-seller-rfp-competitive',
  templateUrl: './seller-rfp-competitive.component.html',
  styleUrls: ['./seller-rfp-competitive.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SellerRfpCompetitiveComponent {
  public params: any;
  public isNumberFormat: boolean;
  public isSplitMode: boolean;
  public isEmpty: boolean;

  agInit(params: any): void {
    this.params = params;
    this.isNumberFormat = (parseInt(params.value, 10) == params.value);
    // this.isEmpty = this.params.value === null;
    // this.isEmpty = this.params.node.data === null;
    this.isSplitMode = this.params.splitMode || false;
  }
}
