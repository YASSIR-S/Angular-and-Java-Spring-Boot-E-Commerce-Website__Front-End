import { FormControl, ValidationErrors } from "@angular/forms";

export class Luv2ShopValidators {
    static notOnlyWhitespace(control: FormControl): ValidationErrors | null {
        if ((control.valid != null) && (control.value.trim().length === 0)) {
            return { 'notOnlyWhitespace': true }
        } else {
            return null;
        }

    }

}