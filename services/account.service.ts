import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, identity, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';


import { User } from '../models/User';
import { LoginInformation } from '../models/LoginInformation';

@Injectable({ providedIn: 'root' })
export class AccountService {
    public userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;
    user_dummy: User;

    constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')));
        if(this.userSubject.value==null){
            this.user_dummy ={
                id:"",
                role:"",
                email:"",
                password:"",
                firstName:"",
                lastName:"",
                medicalOfficeAddress:"",
                cnp:"",
                //birthDate:new Date(11),
                specialization:"",
                medicalOfficeName:"",
                medicalOfficeId:"",
                token:""
            };
            this.userSubject = new BehaviorSubject(this.user_dummy);
        }
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    public get userId(): string {
        return this.userSubject.value.id;
    }

    public get firstName(): string {
        return this.userSubject.value.firstName;
    }

    public get lastName(): string {
        return this.userSubject.value.lastName;
    }

    public get email(): string {
        return this.userSubject.value.email;
    }

    public get medicalOfficeId(): string {
        return this.userSubject.value.medicalOfficeId;
    }
    login(loginInfo: LoginInformation) {
        return this.http.post<User>(`${environment.apiUrl}/api/auth/v1/signin`, loginInfo).pipe(
            map(user => {
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            })
        );
    }

    register(user: User) {
        if (user.medicalOfficeName.split(":")[1] !== undefined) {
            let str = user.medicalOfficeName.split(":")[1].substring(1);
            user.medicalOfficeName = str;
        }
        return this.http.post(`${environment.apiUrl}/api/auth/v1/signup`, user);
    }

    resetPassword(newPassword: string, tokenOfUser: string) {
        return this.http.post<User>(`${environment.apiUrl}/api/auth/v1/changePassword?token=${tokenOfUser}`, { newPassword })
    }

    forgotPassword(emailForResetPassword: string) {
        return this.http.post<any>(`${environment.apiUrl}/api/auth/v1/resetPassword?email=${emailForResetPassword}`, {});
    }

    logout() {
        localStorage.removeItem('user');
        this.userSubject.next({});
    }

    getCabinets() {
        return this.http.get<any>(`${environment.apiUrl}/api/v1/medicaloffices`);
    }
}