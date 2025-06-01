import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // This is a placeholder for actual authentication logic
  // In a real app, you would check if the user is logged in
  const isLoggedIn = localStorage.getItem('token') !== null;

  if (!isLoggedIn) {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  return true;
};
