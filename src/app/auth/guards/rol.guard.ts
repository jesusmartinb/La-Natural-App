import { CanActivateFn } from '@angular/router';

export const rolGuard: CanActivateFn = (route, state) => {
  const rol: string | null = localStorage.getItem('rol');
  if (rol !== 'admin') {
    return false;
  }
  return true;
};
