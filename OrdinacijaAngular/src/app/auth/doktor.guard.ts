import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from './auth.service';

function checkLogin(url: string, router: Router): true | UrlTree {
  let val: string | null = localStorage.getItem('doktor');

  if (val != null && val == 'true') {
    if (url == '/prijava') return router.parseUrl('/zakazivanje');
    else return true;
  } else return router.parseUrl('/prijava');
}

export const doktorGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const as: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const url: string = state.url;
  return checkLogin(url, router);
};
