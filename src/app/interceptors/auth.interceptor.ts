import { HttpInterceptorFn } from '@angular/common/http';
import { constants } from '../shared/constants/constants';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = constants.api.key; // Cambia esto por tu token real
  // Clona la solicitud y agrega el token de autorización
  const clonedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`,
      accept: 'application/json',
    },
  });
  return next(clonedReq);
};
