import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SigninComponent } from '../signin/signin.component';
import { SingupComponent } from '../singup/singup.component';
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isAuthenticated = false;

  constructor(private dialog : MatDialog, 
    private authService: AuthService, 
    private router: Router) { }

  ngOnInit(): void {
     this.authService.isUserLoggedIn$.subscribe((isLoggedIn) => {
      this.isAuthenticated = isLoggedIn;
    });
  }

  openSignIn() {
    this.dialog.open(SigninComponent, {
      
      panelClass: 'my-dialog',
    });
  }

  openSignUp() {
    this.dialog.open(SingupComponent, {
      panelClass: 'my-dialog',
    });
  }

  logout(): void {
    localStorage.removeItem("token");
    this.authService.isUserLoggedIn$.next(false);
    this.router.navigate([""]);
  }
}
