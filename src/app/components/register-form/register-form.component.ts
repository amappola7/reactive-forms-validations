import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.min(4)]],
        firstName: ['', [Validators.required, Validators.max(80), Validators.pattern('/^[a-zA-Z]+$/')]],
        secondName: ['', [Validators.max(80), Validators.pattern('/^[a-zA-Z]+$/')]],
        surname: ['', [Validators.required, Validators.max(80), Validators.pattern('/^[a-zA-Z]+$/')]],
        secondSurname: ['', [Validators.max(80), Validators.pattern('/^[a-zA-Z]+$/')]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.min(6), Validators.pattern('/^[A-Za-z\d#$%&-_.]+$/')]],
      }
    )
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log("Successfully registered", this.registerForm.value);
      this.registerForm.reset();
    } else {
      console.log("Invalid form", this.registerForm.value);
    }
  }
}
