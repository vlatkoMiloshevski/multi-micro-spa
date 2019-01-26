import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../models/user.model';

@Component({
  selector: 'hmx-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
