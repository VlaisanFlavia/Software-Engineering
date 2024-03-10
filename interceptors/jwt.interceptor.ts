import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AccountService } from '../services/account.service';

@Injectable()

export class JwtInterceptor implements HttpInterceptor{
    constructor(private accountService:AccountService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = this.accountService.userValue;
        const isLoggedIn = user && user.token;
        const isApiUrl= req.url.startsWith(`${environment.apiUrl}`);
        if(isLoggedIn && isApiUrl){
            req = req.clone({
                setHeaders:{
                    Authorization: `Bearer ${user.token}`
                }
            });
        }
        return next.handle(req);
    }
}