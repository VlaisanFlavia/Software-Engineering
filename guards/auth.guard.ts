import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { AccountService } from "../services/account.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard{
    constructor(
        private router: Router,
        private accountService: AccountService
    ) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.checkLogin(state.url);
    }

    checkLogin(url: string): boolean {
        const user = this.accountService.userValue;
        if (user.token == "") {
            this.router.navigate(['/login']);
            return false;
        }
        return true; 

        
    }
}