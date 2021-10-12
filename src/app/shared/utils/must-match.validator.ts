import {FormGroup} from "@angular/forms";

export function MustMatch(controlName: string,
                          matchingControlName: string) {

  return (formGroup: FormGroup) => {
    const controller = formGroup.controls[controlName];
    const matchingController = formGroup.controls[matchingControlName];

    if ( matchingController.errors && ! matchingController.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    return controller.value !== matchingController.value ? matchingController.setErrors({mustMatch: true}) : matchingController.setErrors(null);

  };
}
