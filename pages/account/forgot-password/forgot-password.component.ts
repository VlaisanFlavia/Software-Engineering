import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
    selector: 'forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

    form!: FormGroup;
    submitted = false;
    loading = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        public accountService: AccountService,
        public alertService: AlertService
    ) { }
    ngOnInit() {
        this.form = this.formBuilder.group({
            email: ['', Validators.required],
        });
    }

    get f() {
        return this.form.controls;
    }

    onSubmit() {
        console.log(this.f['email'].value);
        this.submitted = true;
        this.alertService.clear();
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.forgotPassword(this.f['email'].value).pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success("Vă rugăm să vă verificati e-mail-ul.")
                    this.loading = false;

                },
                error: error => {
                    this.loading = false;
                    this.alertService.success("Vă rugăm să vă verificati e-mail-ul.")
                }
            });
    }
}