import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaultTypeDetailsComponent } from './fault-type-details.component';

describe('FaultTypeDetailsComponent', () => {
  let component: FaultTypeDetailsComponent;
  let fixture: ComponentFixture<FaultTypeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaultTypeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaultTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
