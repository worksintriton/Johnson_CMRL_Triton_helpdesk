import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocalculationEscComponent } from './autocalculation-esc.component';

describe('AutocalculationEscComponent', () => {
  let component: AutocalculationEscComponent;
  let fixture: ComponentFixture<AutocalculationEscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocalculationEscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocalculationEscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
