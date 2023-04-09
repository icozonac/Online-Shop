// import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  invalidConfirmPass: boolean = false;
  constructor(private fb: FormBuilder) {}

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
      gender: [, [Validators.required]],
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

  register(){
    
  }

  // registerSubmited() {
  //   if (this.Password.value == this.confirmPassword.value) {
  //     console.log('Submitted');
  //     this.confirmPass = 'none';
  //     this.authSerivice.registerUser().subscribe((res) => {
  //       console.log(res);
  //     });
  //   } else {
  //     this.confirmPass = 'inline';
  //   }
  // }

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
  get Gender(): FormControl {
    return this.registerForm.get('gender') as FormControl;
  }
  get Password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }
  get confirmPassword(): FormControl {
    return this.registerForm.get('confirmPassword') as FormControl;
  }
}
