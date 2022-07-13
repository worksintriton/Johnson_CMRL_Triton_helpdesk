import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmrlautocalliftComponent } from './cmrlautocallift.component';

describe('CmrlautocalliftComponent', () => {
  let component: CmrlautocalliftComponent;
  let fixture: ComponentFixture<CmrlautocalliftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmrlautocalliftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmrlautocalliftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
