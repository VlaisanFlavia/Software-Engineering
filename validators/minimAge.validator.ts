import { AbstractControl, ValidatorFn } from "@angular/forms";

export function minimumAgeValidator(minimumAge: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const date = new Date(control.value);
      const now = new Date();
      const ageInMilliseconds = now.getTime() - date.getTime();
      const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365);
      if (ageInYears < minimumAge) {
        return { minimumAge: { requiredAge: minimumAge } };
      }
      return null;
    };
  }