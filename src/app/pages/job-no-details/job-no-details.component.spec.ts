import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobNoDetailsComponent } from './job-no-details.component';

describe('JobNoDetailsComponent', () => {
  let component: JobNoDetailsComponent;
  let fixture: ComponentFixture<JobNoDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobNoDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobNoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
