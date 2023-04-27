import { User } from './../../../models/category';
// import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  invalidConfirmPass: boolean = false;
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[A-Za-z].*'),
        ],
      ],
      lastname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[A-Za-z].*'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      mobile: [
        '',
        [
          Validators.required,
          Validators.pattern('[0-9].*'),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      address: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    });
  }

  register() {
    if (this.registerForm.valid) {
      let user: User = {
        id: 0,
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        email: this.Email.value,
        address: this.Address.value,
        mobile: this.Mobile.value,
        password: this.Password.value,
        createdDate: '',
        updatedDate: '',
      };
      this.navigationService.registerUser(user).subscribe((res: any) => {
        this.message = res.toString();
      });
    } else {
      Object.values(this.registerForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  get firstName(): FormControl {
    return this.registerForm.get('firstname') as FormControl;
  }
  get lastName(): FormControl {
    return this.registerForm.get('lastname') as FormControl;
  }
  get Email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }
  get Mobile(): FormControl {
    return this.registerForm.get('mobile') as FormControl;
  }
  get Address(): FormControl {
    return this.registerForm.get('address') as FormControl;
  }
  get Password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }
  get confirmPassword(): FormControl {
    return this.registerForm.get('confirmPassword') as FormControl;
  }
}
