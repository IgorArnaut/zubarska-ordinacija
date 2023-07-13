import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NedeljniPrikazComponent } from './nedeljni-prikaz.component';

describe('NedeljniPrikazComponent', () => {
  let component: NedeljniPrikazComponent;
  let fixture: ComponentFixture<NedeljniPrikazComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NedeljniPrikazComponent]
    });
    fixture = TestBed.createComponent(NedeljniPrikazComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
