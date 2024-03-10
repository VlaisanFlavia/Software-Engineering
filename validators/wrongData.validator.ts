import { FormControl } from "@angular/forms";

export function dateNotInFutureValidator(control: FormControl): { [key: string]: boolean } | null {
    const date = new Date(control.value);
    const now = new Date();
    if (date > now) {
      return { dateNotInFuture: true };
    }
    return null;
  }