import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiftdetailComponent } from './liftdetail.component';

describe('LiftdetailComponent', () => {
  let component: LiftdetailComponent;
  let fixture: ComponentFixture<LiftdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiftdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiftdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
