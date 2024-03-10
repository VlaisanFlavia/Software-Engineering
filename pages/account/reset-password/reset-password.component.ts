
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from 'src/app/services/alert.service';
import { AccountService } from 'src/app/services/account.service';
import { ConfirmedValidator } from 'src/app/validators/confirmed.validator';

@Component({
    selector: 'reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

    form!: FormGroup;
    submitted = false;
    loading = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }
    ngOnInit() {
        this.form = this.formBuilder.group({
                password: ['', [Validators.required, Validators.minLength(8)]],
                confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
            },
            {validator : ConfirmedValidator('password', 'confirmPassword')});
    }

    get f() {
        return this.form.controls;
    }

    onSubmit() {
        console.log(this.f['password'].value);
        console.log(this.f['confirmPassword'].value);
        const resetPasswordToken = this.route.snapshot.queryParamMap.get('token');
        this.submitted = true;
        this.alertService.clear();
        if (this.form.invalid) {
            return;
        }

        if(resetPasswordToken === null){
            return;
        }

        this.loading = true;
        this.accountService.resetPassword(this.f['password'].value, resetPasswordToken).pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Change password succesful', {keepAfterRouteChange: true});
                    this.router.navigate(['../login'], {relativeTo: this.route});
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}