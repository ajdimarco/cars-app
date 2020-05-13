import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericSpecComponent } from './numeric-spec.component';

describe('NumericSpecComponent', () => {
  let component: NumericSpecComponent;
  let fixture: ComponentFixture<NumericSpecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumericSpecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumericSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
