import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'hmx-seller-rfp-competitive',
  templateUrl: './seller-competitive.component.html',
  styleUrls: ['./seller-competitive.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SellerCompetitiveComponent {
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }
}
