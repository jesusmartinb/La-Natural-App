import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, UrlSegment, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

const checkAuthStatus = (): boolean | Observable<boolean> => {

  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthStatus()
    .pipe(
      tap(isAuth => {
        if (!isAuth) router.navigate(['./auth/login']);
      })
    );
};

export const CanActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
  return checkAuthStatus();
};

export const CanMatch: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  return checkAuthStatus();
}

export const AuthGuard = {
  CanActivate, CanMatch
}

