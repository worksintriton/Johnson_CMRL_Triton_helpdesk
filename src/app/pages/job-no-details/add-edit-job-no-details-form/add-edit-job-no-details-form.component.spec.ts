import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditJobNoDetailsFormComponent } from './add-edit-job-no-details-form.component';

describe('AddEditJobNoDetailsFormComponent', () => {
  let component: AddEditJobNoDetailsFormComponent;
  let fixture: ComponentFixture<AddEditJobNoDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditJobNoDetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditJobNoDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
