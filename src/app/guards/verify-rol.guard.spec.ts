import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { verifyRolGuard } from './verify-rol.guard';

describe('verifyRolGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => verifyRolGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
