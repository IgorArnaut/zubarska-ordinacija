import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DnevniPrikazComponent } from './dnevni-prikaz.component';

describe('DnevniPrikazComponent', () => {
  let component: DnevniPrikazComponent;
  let fixture: ComponentFixture<DnevniPrikazComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DnevniPrikazComponent]
    });
    fixture = TestBed.createComponent(DnevniPrikazComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
