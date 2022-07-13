import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTicketEditComponent } from './single-ticket-edit.component';

describe('SingleTicketEditComponent', () => {
  let component: SingleTicketEditComponent;
  let fixture: ComponentFixture<SingleTicketEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleTicketEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTicketEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
