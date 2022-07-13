import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmrlautocalescComponent } from './cmrlautocalesc.component';

describe('CmrlautocalescComponent', () => {
  let component: CmrlautocalescComponent;
  let fixture: ComponentFixture<CmrlautocalescComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmrlautocalescComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmrlautocalescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
