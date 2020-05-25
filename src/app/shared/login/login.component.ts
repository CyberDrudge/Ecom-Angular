import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoggingIn = false;
  submitted = false;
  loginForm: FormGroup = this.formBuilder.group({
    login: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    keep_logged_in: [false]
  });

  constructor(
    public auth: AuthService, 
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {}
  
  get f() {
    return this.loginForm.controls;
  }
  async login() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    if (this.isLoggingIn) return;
    this.isLoggingIn = true;
    await this.auth.login(this.loginForm.value);
    this.isLoggingIn = false;
    
  }

}
