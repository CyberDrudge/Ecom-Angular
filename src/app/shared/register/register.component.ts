import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { AuthService } from "src/app/services/auth/auth.service";
import { Router } from "@angular/router"
import { MustMatch } from "src/app/utility/helper";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  submitted: boolean = false;
  private subscriptions: any  = [];
  registerForm: FormGroup = this.formBuilder.group({
    full_name: ["", [Validators.required]],
    email: ["", [Validators.email, Validators.required]],
    password1: ["", [Validators.minLength(6), Validators.required]],
    password2: ["", [Validators.minLength(6), Validators.required]]
  },
  {
    validator: MustMatch("password1", "password2")
  });

  constructor(
    public auth: AuthService, 
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  get f() {
    return this.registerForm.controls;
  }

  register(){
    this.submitted = true;
    this.isLoading = true;
    try {
      this.subscriptions.push(
        this.auth.register(
          this.registerForm.value
        ).subscribe(res => {
          this.isLoading = false;
          if (res.type == "success") {
            // this.toast.create("success", `Registered! ${res.message}`);
            // this.isLoginVisible = true;
            // this.isRegisterVisible = false;
            this.router.navigate(["/login"]);
          } else {
            // this.toast.create("error", `Error! ${res.message}`);
            this.auth.authState = null;
            // this.currentUserSubject.next(null);
          }
        }));
    } catch (err) {
      // this.toast.create("error", `Failed: ${err.message}`);
      this.auth.authState = null;
      // this.currentUserSubject.next(null);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
