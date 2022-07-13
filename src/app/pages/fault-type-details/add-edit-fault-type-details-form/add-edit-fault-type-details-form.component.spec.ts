import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFaultTypeDetailsFormComponent } from './add-edit-fault-type-details-form.component';

describe('AddEditFaultTypeDetailsFormComponent', () => {
  let component: AddEditFaultTypeDetailsFormComponent;
  let fixture: ComponentFixture<AddEditFaultTypeDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditFaultTypeDetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditFaultTypeDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
