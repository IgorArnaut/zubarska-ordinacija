import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminComponent } from './termin.component';

describe('TerminComponent', () => {
  let component: TerminComponent;
  let fixture: ComponentFixture<TerminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TerminComponent]
    });
    fixture = TestBed.createComponent(TerminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
