import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipCellComponent } from './tooltip-cell.component';
import { MatTooltipModule } from '@angular/material';

describe('Table Status Icon component', () => {
  let fixture: ComponentFixture<TooltipCellComponent>;
  let component: TooltipCellComponent;
  let compiled;

  const params = {
    value: 'value',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatTooltipModule],
      declarations: [
        TooltipCellComponent,
      ],
      providers: [],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(TooltipCellComponent);
      component = fixture.componentInstance;
      compiled = fixture.debugElement.nativeElement;

      component.agInit(params);
      fixture.detectChanges();
    });
  }));

  it('should create tooltip cell component', () => {
    expect(component).toBeTruthy();
  });

  it(`should define value property and be equal to ${params.value}`, () => {
    expect(component.value).toBe(params.value);
  });

  it(`should render value property to span`, () => {
    const span = compiled.querySelector('span');
    expect(span.textContent).toContain(params.value);
  });
});
