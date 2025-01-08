import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = 'your-auth-token'; // Cambia esto por tu token real
  // Clona la solicitud y agrega el token de autorización
  const clonedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return next(clonedReq);
};
