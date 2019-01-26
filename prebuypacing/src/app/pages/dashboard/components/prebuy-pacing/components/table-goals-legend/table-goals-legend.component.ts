import  {Component, OnInit } from '@angular/core';
import { ToggleGoalsService } from '../../services/toggle-goals.service';

@Component({
  selector: 'hmx-table-goals-legend',
  template: `
    <div class="hmx-goals-legend">
      <span class="hmx-goals-legend-item">% to goal</span>
      <span class="hmx-goals-legend-item legend-prime-in-goal">
        % of prime in goal
        <mat-slide-toggle
          class="hmx-toggle-goals"
          disableRipple="true"
          (change)="onTogglePrimeGoals($event)"
          [checked]="primeGoalsIsVisible">
        </mat-slide-toggle>
      </span>
    </div>
  `,
  styleUrls: ['./table-goals-legend.component.scss'],
})
export class TableGoalsLegendComponent implements OnInit {
  public primeGoalsIsVisible: boolean = true;
  public params: any;

  constructor(
    private toggleGoalsService: ToggleGoalsService
  ) {}

  ngOnInit(){
    this.primeGoalsIsVisible = true
  }

  onTogglePrimeGoals(value): void {
    this.toggleGoalsService.togglePrimeInGoals(!value.checked);
  }

}
