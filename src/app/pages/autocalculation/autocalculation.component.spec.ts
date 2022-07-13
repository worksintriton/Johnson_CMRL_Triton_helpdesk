import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocalculationComponent } from './autocalculation.component';

describe('AutocalculationComponent', () => {
  let component: AutocalculationComponent;
  let fixture: ComponentFixture<AutocalculationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocalculationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
