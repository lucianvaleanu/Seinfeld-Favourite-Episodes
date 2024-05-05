import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  signinForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signinForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      nameOrEmail: new FormControl("", [Validators.required, Validators.minLength(4)]),
      password: new FormControl("", [Validators.required, Validators.minLength(7)])
    })
  }

  login(): void {
    if (this.signinForm.valid) {
      const { nameOrEmail, password } = this.signinForm.value;
      this.authService.signin(nameOrEmail, password).subscribe((msg => {
        console.log(msg);
        this.router.navigate(["episodes"]);
      }));
    }
  }
}
