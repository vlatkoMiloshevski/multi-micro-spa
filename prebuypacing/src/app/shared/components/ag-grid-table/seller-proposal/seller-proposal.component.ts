import { Component } from '@angular/core';

@Component({
  selector: 'hmx-seller-proposal',
  templateUrl: './seller-proposal.component.html',
  styleUrls: ['./seller-proposal.component.scss']
})
export class SellerProposalComponent {
  public params: any;
  public isNumberFormat: boolean;
  public isEmpty: boolean;

  agInit(params: any): void {
    this.params = params;
    this.isNumberFormat = (parseInt(params.value, 10) == params.value);
    this.isEmpty = this.params.value === null;
  }
}
