import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFaultTypeDetailsComponent } from './add-fault-type-details.component';

describe('AddFaultTypeDetailsComponent', () => {
  let component: AddFaultTypeDetailsComponent;
  let fixture: ComponentFixture<AddFaultTypeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFaultTypeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFaultTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
