import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrebuyPacingComponent } from './prebuy-pacing.component';

describe('PrebuyPacingComponent', () => {
  let component: PrebuyPacingComponent;
  let fixture: ComponentFixture<PrebuyPacingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrebuyPacingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrebuyPacingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
