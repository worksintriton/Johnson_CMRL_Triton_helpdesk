import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditStationDetailsFormComponent } from './add-edit-station-details-form.component';

describe('AddEditStationDetailsFormComponent', () => {
  let component: AddEditStationDetailsFormComponent;
  let fixture: ComponentFixture<AddEditStationDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditStationDetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditStationDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
