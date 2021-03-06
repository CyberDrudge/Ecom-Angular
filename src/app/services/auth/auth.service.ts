import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
// import { ApiService } from "../api/api.service";
import { Subject, BehaviorSubject, Observable } from "rxjs";
// import { NzMessageService } from "ng-zorro-antd";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURL: string = environment.apiUrl;
  registerURL: string = "/register"
  authState: any = null;
  isLoggedIn: boolean = false;
  isAdmin: Subject<boolean> = new Subject<boolean>();
  currentUserSubject: BehaviorSubject<any>;
  public redirectUrl: string = "";
  // public currentUser: Observable<any>;


  constructor(
    private router: Router,
    // private apiService: ApiService,
    // private toast: NzMessageService,
    private httpClient: HttpClient
  ) {
    this.authState = JSON.parse(localStorage.getItem("user"));
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem("user"))
    );
  }

  login_api(login: string, pass: string) {
    localStorage.clear();
    return this.httpClient.post<{ type: string; data: any }>(
      `${this.apiURL}/login`,
      { email: login, password: pass }
    );
  }

  login(usercreds) {
    this.login_api(usercreds.login, usercreds.password)
      .subscribe(res => {
        if (res.type == "success") {
          // this.toast.create("success", `Logged in`);
          this.authState = res.data;
          console.log(res.data);
          this.isLoggedIn = true;
          localStorage.setItem("user", JSON.stringify(res.data.token));
          this.currentUserSubject.next(res.data);
          if(this.redirectUrl) {
            this.router.navigate([this.redirectUrl]);
          }
          this.redirectUrl = "";
        } else {
          // this.toast.create("error", `Invalid login details!`);
          this.authState = null;
          this.currentUserSubject.next(null);
        }
      });
  }

  register(data){
    localStorage.clear();
    return this.httpClient.post<any>(
      this.apiURL + this.registerURL, data
    )
  }

  // createProfile(usercreds) {
  //   // let user: UserDetails;
  //   // Object.keys(usercreds).map( (index) => {
  //   //   user[index] = usercreds[index];
  //   // })
  //   this.apiService.updateProfile(usercreds).subscribe((res) => {
  //     if(res && res.type=='success') {
  //       this.toast.create("success", `${res.message}`);
  //       res.data.token = this.authState.token;
  //       localStorage.setItem('user', JSON.stringify(res.data));
  //     } else {
  //       this.toast.create("error", `${res.message}`);
  //     }
  //   })
  //   this.authUser();
  //   this.openDashBoard();
  // }


  // forgotPassword({email}) {
  //   try {
  //     this.apiService
  //       .forgotPassword(email)
  //       .subscribe(res => {
  //         if (res.type == "success") {
  //           this.toast.create("success", `Success! ${res.message}`);
  //           this.isForgotPasswordVisible = false;
  //         } else {
  //           this.toast.create("error", `Error! ${res.message}`);
  //           this.authState = null;
  //           this.currentUserSubject.next(null);
  //         }
  //       });
  //   } catch (err) {
  //     console.log(err)
  //     this.toast.create("error", `Failed: ${err.message}`);
  //     this.authState = null;
  //     this.currentUserSubject.next(null);
  //   }
  // }

  // async openDashBoard() {
  //   this.router.navigate(["/dashboard/profile"]);
  // }

  // async logout() {
  //   this.router.navigate(["/home"]);
  //   await localStorage.clear();
  //   this.authState = null;
  //   this.currentUserSubject.next(null);
  //   this.toast.create("info", `Logged out`);
  // }

  authUser(): boolean {
    if (localStorage.getItem("user")) {
      this.authState = JSON.parse(localStorage.getItem("user"));
      this.currentUserSubject.next(JSON.parse(localStorage.getItem("user")));
    }
    return this.authState !== null && this.authState !== undefined
      ? true
      : false;
  }

  // isProfileAdded(): boolean {
  //   return this.authUser() && this.authState.is_profile_addded
  //     ? true
  //     : false;
  // }

  // addProfileDetails(profileDetails) {

  // }

  getToken() {
    if (this.authUser()) {
      let token = JSON.parse(localStorage.getItem("user"));
      return token;
    } else {
      return "";
    }
  }
}

