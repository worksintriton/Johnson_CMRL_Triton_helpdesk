import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTicketDetailsFormComponent } from './add-edit-ticket-details-form.component';

describe('AddEditTicketDetailsFormComponent', () => {
  let component: AddEditTicketDetailsFormComponent;
  let fixture: ComponentFixture<AddEditTicketDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditTicketDetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditTicketDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
