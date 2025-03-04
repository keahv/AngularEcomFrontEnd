import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  
   const authService = inject(AuthServiceService);
  
  const token = authService.authToken();
  // console.log(token);
  const clonedReq = req.clone({
    setHeaders:{
      Authorization: `Bearer ${token}`
    }
  })

  return next(clonedReq);
};