import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTicketDetailsComponent } from './add-ticket-details.component';

describe('AddTicketDetailsComponent', () => {
  let component: AddTicketDetailsComponent;
  let fixture: ComponentFixture<AddTicketDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTicketDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTicketDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
