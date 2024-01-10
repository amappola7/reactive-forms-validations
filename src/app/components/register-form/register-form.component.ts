import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { userMapper } from 'src/app/utils/user-mapper';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.min(4)]],
      firstName: [
        '',
        [
          Validators.required,
          Validators.max(80),
          Validators.pattern('[a-zA-Z ]*'),
        ],
      ],
      secondName: ['', [Validators.max(80), Validators.pattern('[a-zA-Z ]*')]],
      surname: [
        '',
        [
          Validators.required,
          Validators.max(80),
          Validators.pattern('[a-zA-Z ]*'),
        ],
      ],
      secondSurname: [
        '',
        [Validators.max(80), Validators.pattern('[a-zA-Z ]*')],
      ],
      email: ['', [Validators.required, Validators.email, this.existentEmailValidator()]],
      password: [
        '',
        [
          Validators.required,
          Validators.min(6),
          Validators.pattern('^(?=.*[a-zA-Z])(?=.*d)(?=.*[#$%&_-]).*$'),
        ],
      ],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Successfully registered', this.registerForm.value);
      this.userService.addUser(userMapper(this.registerForm.value));
      this.registerForm.reset();
      console.log(this.userService.getUsers());
    } else {
      console.log('Invalid form', this.registerForm.value);
    }
  }

  existentEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isEmailUnique = this.userService.isEmailUnique(control.value);
      return isEmailUnique ? null : { existentEmail: {value: `${control.value}, the email already exists`}};
    };
  }
}
