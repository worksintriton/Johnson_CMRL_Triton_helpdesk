import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStationDetailsComponent } from './add-station-details.component';

describe('AddStationDetailsComponent', () => {
  let component: AddStationDetailsComponent;
  let fixture: ComponentFixture<AddStationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
