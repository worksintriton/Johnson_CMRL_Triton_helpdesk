import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditUserDetailsFormComponent } from './add-edit-user-details-form.component';

describe('AddEditUserDetailsFormComponent', () => {
  let component: AddEditUserDetailsFormComponent;
  let fixture: ComponentFixture<AddEditUserDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditUserDetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditUserDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
