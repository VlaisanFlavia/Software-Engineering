import { FormGroup } from "@angular/forms";

export function ConfirmedValidator(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
        const passwordControl = formGroup.controls[password];
        const confPasswordControl = formGroup.controls[confirmPassword];
        if (confPasswordControl.errors && !confPasswordControl.errors['confirmedValidator']) {
            return;
        }
        if (passwordControl.value !== confPasswordControl.value) {

            confPasswordControl.setErrors({ confirmedValidator: true });

        } else {

            confPasswordControl.setErrors(null);

        }
    }
}   