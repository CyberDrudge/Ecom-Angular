import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() isUserLoggedIn: boolean;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem("user"))){
      this.auth.isLoggedIn = true;
    }
  }

  logout(){
    console.log("Log Out");
    this.auth.isLoggedIn = false;
    localStorage.clear();
  }

}
