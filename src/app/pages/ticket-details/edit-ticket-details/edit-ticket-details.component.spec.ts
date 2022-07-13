import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTicketDetailsComponent } from './edit-ticket-details.component';

describe('EditTicketDetailsComponent', () => {
  let component: EditTicketDetailsComponent;
  let fixture: ComponentFixture<EditTicketDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTicketDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTicketDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
