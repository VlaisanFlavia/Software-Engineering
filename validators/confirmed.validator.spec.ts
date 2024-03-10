import { FormGroup, FormControl } from "@angular/forms";
import { ConfirmedValidator } from "./confirmed.validator";

describe('ConfirmedValidator', () => {
    let formGroup: FormGroup;
    beforeEach(() => {
        formGroup = new FormGroup({
            password: new FormControl('password1'),
            confirmPassword: new FormControl('password2'),
        });
    });

    it('should set error if passwords do not match', () => {
        const formGroup = new FormGroup({
            password: new FormControl('password1'),
            confirmPassword: new FormControl('password2')
        });
        const validatorFn = ConfirmedValidator('password', 'confirmPassword');
        if (validatorFn) { // Add a null check to avoid error
            validatorFn(formGroup);
        }
        expect(formGroup.controls['confirmPassword'].errors).toEqual({ confirmedValidator: true });
    });

    it('should set no error if passwords match', () => {
        const formGroup = new FormGroup({
            password: new FormControl('password1'),
            confirmPassword: new FormControl('password1')
        });
        const validatorFn = ConfirmedValidator('password', 'confirmPassword');
        if (validatorFn) { // Add a null check to avoid error
            validatorFn(formGroup);
        }
        expect(formGroup.controls['confirmPassword'].errors).toBeNull();
    });

    it('should set error if confirm password control is null', () => {
        const formGroup = new FormGroup({
            password: new FormControl('password1'),
            confirmPassword: new FormControl('')
        });
        const validatorFn = ConfirmedValidator('password', 'confirmPassword');
        if (validatorFn) {
            validatorFn(formGroup);
        }
        expect(formGroup.controls['confirmPassword'].errors).toEqual({ confirmedValidator: true });
    });

    it('should clear error if passwords match', () => {
        const formGroup = new FormGroup({
            password: new FormControl('password1'),
            confirmPassword: new FormControl('password1')
        });
        const validatorFn = ConfirmedValidator('password', 'confirmPassword');
        if (validatorFn) {
            validatorFn(formGroup);
        }
        expect(formGroup.controls['confirmPassword'].errors).toBeNull();
    });
    it('should not set error if confirm password control has other errors', () => {
        formGroup.controls['confirmPassword'].setErrors({ required: true });
        const validatorFn = ConfirmedValidator('password', 'confirmPassword');
        if (validatorFn) {
            validatorFn(formGroup);
        }
        expect(formGroup.controls['confirmPassword'].errors).toEqual({ required: true });
    });
});