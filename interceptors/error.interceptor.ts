import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AccountService } from '../services/account.service';

@Injectable()
export class ErrorInterception implements HttpInterceptor{
    constructor(private accountService:AccountService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(err=>{
                if([401, 403].includes(err.status)&&this.accountService.userValue){
                    this.accountService.logout();
                }
                const error = err.error||err.statusText||err.message;
                console.error(err);
                console.error(err.error);
                return throwError(() => error);
            }
        ))
    }
}