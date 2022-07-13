import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJobNoDetailsComponent } from './edit-job-no-details.component';

describe('EditJobNoDetailsComponent', () => {
  let component: EditJobNoDetailsComponent;
  let fixture: ComponentFixture<EditJobNoDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditJobNoDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditJobNoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
