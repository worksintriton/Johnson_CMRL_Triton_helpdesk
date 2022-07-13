import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStationDetailsFormComponent } from './edit-station-details-form.component';

describe('EditStationDetailsFormComponent', () => {
  let component: EditStationDetailsFormComponent;
  let fixture: ComponentFixture<EditStationDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStationDetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStationDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
