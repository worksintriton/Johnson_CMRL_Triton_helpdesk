import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFaultTypeDetailsComponent } from './edit-fault-type-details.component';

describe('EditFaultTypeDetailsComponent', () => {
  let component: EditFaultTypeDetailsComponent;
  let fixture: ComponentFixture<EditFaultTypeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFaultTypeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFaultTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
