import { Component, OnDestroy } from '@angular/core';
import { ToggleGoalsService } from '../../../services/toggle-goals.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'hmx-table-goals',
  template: `
    <ng-container>
      <span class="hmx-goals">
        <ng-container *ngIf="!params.childValue && params.left !== null || params.right !== null" >
          <span class="hmx-goal">
            <span class="hmx-tooltip" matTooltip="{{tooltipLeftGoal}}">{{goalLeftValue}}</span>
          </span>
          <span class="hmx-goal hmx-goal-right" *ngIf="params.right !== null && !showPrimeInGoal">
            <span class="hmx-tooltip" matTooltip="{{tooltipRightGoal}}">{{goalRightValue}}</span>
          </span>
        </ng-container>
        <ng-container *ngIf="params.childValue !== null">
          <span class="hmx-goal" [ngClass]="{'hmx-big-goal-value': params.childValue > 100 }">
            {{ params.childValue }}%
          </span>
          <span class="hmx-goal" *ngIf="!showPrimeInGoal"></span>
        </ng-container>
      </span>
    </ng-container>  
  `,
  styleUrls: ['./table-goals.component.scss']
})
export class TableGoalsComponent implements OnDestroy {
  public params: any;
  public goalLeftValue = '';
  public goalRightValue = '';
  public leftRightValues: boolean;
  public tooltipRightGoal = '';
  public tooltipLeftGoal = '';
  public showPrimeInGoal: boolean;
  public subscription: Subscription;

  constructor(
    private toggleGoalsService: ToggleGoalsService
  ) {
    this.subscription = this.toggleGoalsService
      .displayPrimeGoals()
      .subscribe(primeInGoal => { this.showPrimeInGoal = primeInGoal.primeInGoalsChecked; });
  }

  agInit(params: any): void {
    this.params = params.value;

    if(params.value !== undefined) {
      this.goalLeftValue = this.params.left;
      this.goalRightValue = this.params.right;
    }

    if (!params.childValue && params.left || params.right) {
      this.leftRightValues = true;
    }

    if( params.data.dueDate ) {
      this.tooltipRightGoal = params.data.children.filter(i => !!i[this.params.goalValue] && i.primeInGoal).map(i => i.market).join('; ');
      this.tooltipLeftGoal = params.data.children.filter(i => !!i[this.params.goalValue]).map(i => i.market).join('; ');
    }

    this.showPrimeInGoal = this.toggleGoalsService.getCurrentState();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
