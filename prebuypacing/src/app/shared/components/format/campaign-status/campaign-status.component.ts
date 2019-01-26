import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'hmx-format-campaign-status',
  templateUrl: './campaign-status.component.html',
  styleUrls: ['./campaign-status.component.scss']
})
export class FormatCampaignStatusComponent implements OnInit {
@Input() status: string;

  constructor() { }

  ngOnInit() {
  }

}
