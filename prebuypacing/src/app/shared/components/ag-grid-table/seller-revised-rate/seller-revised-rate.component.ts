import { Component } from '@angular/core';

@Component({
  selector: 'hmx-seller-revised-rate',
  templateUrl: './seller-revised-rate.component.html',
  styleUrls: ['./seller-revised-rate.component.scss']
})
export class SellerRevisedRateComponent {
  public params: any;
  public isNumberFormat: boolean;
  public isEmpty: boolean;

  agInit(params: any): void {
    this.params = params;
    this.isNumberFormat = (parseInt(params.value, 10) == params.value);
    this.isEmpty = this.params.value === null;
  }
}
