import { Component, OnInit } from '@angular/core';
//import {getAuth, sendPasswordResetEmail} from '@angular/fire/auth';
import {FormControl, FormGroup} from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Shared/services/auth.service';
import {getAuth} from "@angular/fire/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LoginForm = new FormGroup({
    password: new FormControl(''),
    email: new FormControl('')
  });

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe(curruser => {
      if (curruser) {
        this.router.navigateByUrl("/feed");
      }
    })
  }

  onSubmit() {
    this.authService.login(this.LoginForm.get('email')?.value as string, this.LoginForm.get('password')?.value as string).then(cred => {
      console.log(cred);
      const auth = getAuth().currentUser.reload();
      auth.then(() => {
      }).catch(error => {
        console.log(error);
      })
      this.router.navigateByUrl('/profile');
    }).catch(error => {
      console.error(error);
    });
  }

  goToLoginWithPhoneNumber(){
    this.router.navigateByUrl('/loginphonenumber')
  }

  goToReg() {
    this.router.navigateByUrl('/registration')
  }

  goToRePassw() {
    this.router.navigateByUrl('/passreset')
  }
}
