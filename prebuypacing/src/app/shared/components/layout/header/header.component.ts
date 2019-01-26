import { Component, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';

import { User } from '../../../models/user.model';

@Component({
  selector: 'hmx-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  @Input() user: User;
  @Output() logout = new EventEmitter();

  constructor() { }

  onLogout() {
    this.logout.emit();
  }
}
