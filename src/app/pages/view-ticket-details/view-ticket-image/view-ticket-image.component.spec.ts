import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTicketImageComponent } from './view-ticket-image.component';

describe('ViewTicketImageComponent', () => {
  let component: ViewTicketImageComponent;
  let fixture: ComponentFixture<ViewTicketImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTicketImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTicketImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
