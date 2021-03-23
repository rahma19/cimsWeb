import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor,HttpRequest,HttpResponse,HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import {catchError} from 'rxjs/operators';
import { Router } from '@angular/router';
 
@Injectable()
export class GlobalHttpInterceptorService implements HttpInterceptor {
    constructor(private router:Router) {}
 
    intercept(req: HttpRequest<any>, next: HttpHandler): 
        Observable<HttpEvent<any>> {
            req = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              });
          return next.handle(req).pipe(
             catchError( (error) => {
              if (error instanceof HttpErrorResponse) {
                if (error.error instanceof ErrorEvent) {
                    console.error("Error Event");
                } else {
                    switch (error.status) {
                        case 401:      
                          
                            break;
                    }
                } 
            } else {
                console.error(error);
            }               
            return throwError(error);
          })
        )
    }
}