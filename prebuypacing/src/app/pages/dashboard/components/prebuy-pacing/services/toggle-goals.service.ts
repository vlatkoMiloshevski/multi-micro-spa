import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ToggleGoalsService {
  public primeInGoalsChecked: boolean = false;
  private subject = new Subject<any>();

  togglePrimeInGoals(primeInGoalsChecked: boolean) {
    this.primeInGoalsChecked = primeInGoalsChecked;
    return this.subject.next({ primeInGoalsChecked });
  }

  displayPrimeGoals(): Observable<any> {
    return this.subject.asObservable();
  }

  getCurrentState(): boolean{
    return this.primeInGoalsChecked;
  }
}

