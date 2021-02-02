import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/login/login-service/login.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  isloggedInUser = false
  private token: string | null;
  constructor(@Inject(DOCUMENT) private document: Document, private loginService: LoginService, private route: ActivatedRoute) { 
    this.token = this.route.snapshot.queryParams['token'];
    if(this.token) {
      loginService.setToken(this.token);
      this.document.location.href = "http://localhost:4200/home";
    }
  }

  ngOnInit(): void {
    
    this.loginService.isloggedUser().subscribe((result) => {
      this.isloggedInUser = result;
    });
  }

  logout(): void {
    this.loginService.logout().subscribe((result) => {
      this.isloggedInUser = !result;
      // TODO check if redirect is required or not
      this.document.location.href = "http://localhost:4200/home";
    });
  }  


}
