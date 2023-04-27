import { UtilityService } from 'src/app/services/utility.service';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isVisible = false;
  loginForm!: UntypedFormGroup;
  message: string = '';

  constructor(
    private fb: UntypedFormBuilder,
    private navigationService: NavigationService,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userEmail: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  submitLogin(): void {
    if (this.loginForm.valid) {
      this.navigationService
        .loginUser(this.Email.value, this.Password.value)
        .subscribe((res: any) => {
          if (res.toString() !== 'invalid') {
            this.utilityService.setUser(res.toString());
            this.isVisible = false;
          } else {
            this.message = 'Invalid Credentials';
          }
        });
    } else {
      Object.values(this.loginForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  get Email() {
    return this.loginForm.get('userEmail') as FormControl;
  }
  get Password() {
    return this.loginForm.get('password') as FormControl;
  }
}
