
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from 'src/app/services/alert.service';
import { AccountService } from 'src/app/services/account.service';
import { ConfirmedValidator } from 'src/app/validators/confirmed.validator';
import { dateNotInFutureValidator } from 'src/app/validators/wrongData.validator';
import { minimumAgeValidator } from 'src/app/validators/minimAge.validator';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;
    cabinete: string[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) {
        this.getCabinet();
    }
    ngOnInit() {
        this.form = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            email: ['', [Validators.email, Validators.required]],
            cnp: ['', [Validators.required, Validators.maxLength(13), Validators.minLength(13), Validators.pattern("^[0-9]*$")]],
            birthDate: ['', [Validators.required, dateNotInFutureValidator, minimumAgeValidator(18)]],
            medicalOfficeAddress: '',
            password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
            role: ['ROLE_PATIENT', Validators.required],
            speciality: '',
            medicalOfficeName: '',
        },
            { validator: ConfirmedValidator('password', 'confirmPassword') });
        this.setType();
    }

    getCabinet() {
        this.accountService.getCabinets().subscribe(cabinets => {
            this.cabinete = [];
            for (let i = 0; i < cabinets.length; i++) {
                this.cabinete.push(cabinets[i]['name']);
            }
        });
    }

    changeCabinet(e: any) {
        this.f["medicalOfficeName"]?.setValue(e.target.value, { onlySelf: true, });
    }

    setType() {
        this.form.get('role')?.valueChanges.subscribe(userRole => {
            if (userRole === 'ROLE_PATIENT') {
                this.form.get('speciality')?.clearValidators();
                this.form.get('speciality')?.updateValueAndValidity();
                this.form.get('medicalOfficeName')?.clearValidators();
                this.form.get('medicalOfficeName')?.updateValueAndValidity();
                this.form.get('medicalOfficeAddress')?.clearValidators();
                this.form.get('medicalOfficeAddress')?.updateValueAndValidity();
            }
            if (userRole === 'ROLE_DOCTOR') {
                this.form.get('speciality')?.setValidators([Validators.required]);
                this.form.get('speciality')?.updateValueAndValidity();
                this.form.get('medicalOfficeName')?.setValidators([Validators.required]);
                this.form.get('medicalOfficeName')?.updateValueAndValidity();
                this.form.get('medicalOfficeAddress')?.setValidators([Validators.required]);
                this.form.get('medicalOfficeAddress')?.updateValueAndValidity();
            }
            if (userRole === 'ROLE_NURSE') {
                this.form.get('speciality')?.clearValidators();
                this.form.get('speciality')?.updateValueAndValidity();
                this.form.get('medicalOfficeName')?.setValidators([Validators.required]);
                this.form.get('medicalOfficeName')?.updateValueAndValidity();
                this.form.get('medicalOfficeAddress')?.clearValidators();
                this.form.get('medicalOfficeAddress')?.updateValueAndValidity();
            }
        });
    }
    get f() {
        return this.form.controls;
    }

    onSubmit() {
        this.submitted = true;
        this.alertService.clear();
        if (this.form.invalid) {
            return;
        }
        this.loading = true;
        console.log(this.form.value);
        this.accountService.register(this.form.value).pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Inregistrare cu succes', { keepAfterRouteChange: true });
                    this.router.navigate(['../login'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}