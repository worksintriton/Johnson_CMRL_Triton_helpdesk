import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobNoDetailsComponent } from './add-job-no-details.component';

describe('AddJobNoDetailsComponent', () => {
  let component: AddJobNoDetailsComponent;
  let fixture: ComponentFixture<AddJobNoDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddJobNoDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJobNoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
