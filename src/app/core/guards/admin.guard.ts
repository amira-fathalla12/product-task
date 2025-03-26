import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/feature/auth/services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router)
  const _authService = inject(AuthService)
  if(localStorage.getItem('userToken') !== null && _authService.role === 'SuperAdmin'){
    return true;
  }
  else {
    _router.navigate(['/dashboard'])
    return false
  }
};
