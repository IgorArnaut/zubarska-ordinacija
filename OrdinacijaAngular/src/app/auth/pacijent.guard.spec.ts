import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { pacijentGuard } from './pacijent.guard';

describe('pacijentGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => pacijentGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
