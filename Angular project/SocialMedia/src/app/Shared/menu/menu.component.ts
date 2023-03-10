import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import firebase from "firebase/compat/app";
import {AuthService} from "../services/auth.service";
import {FormControl, FormGroup} from "@angular/forms";
import { NotificationsService } from '../services/notifications.service';
import { Notification } from '../../Model/notification';
import { first, Observable } from 'rxjs';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  //Tomb az ertesiteseknek
  notifications: Notification[] = [

  ]

  searchedText='';
  userRole: string = '';

  @Input() loggedInUser?: firebase.User | null;

  constructor(public router: Router, private authService: AuthService, private notificationService: NotificationsService, private userService: UserService) { }

  ngOnInit() {
    this.authService.isUserLoggedIn().subscribe(user => {
      this.loggedInUser = user;
      this.userService.getByID(this.loggedInUser.uid).subscribe(curruser => {
        this.userRole = curruser.role;
      })
      localStorage.setItem('user', JSON.stringify(this.loggedInUser));
      //Lekerjuk az adatbazisbol az osszes ertesitest es taroljuk a tombunkben.
      this.notificationService.getAll(this.loggedInUser.uid).pipe(first()).subscribe(notifications => {
        notifications.forEach(noti => {
          this.notifications.push(noti);
        });
      });
    }, error => {
      console.error(error);
      localStorage.setItem('user', JSON.stringify('null'));
    });

  }

  onSearch(){
    this.router.navigateByUrl("/kovetok/" + this.searchedText).then(()=>{window.location.reload()})
  }

  //Ha a torles gombra kattintunk akkor ez a fuggveny hivodik meg
  //1, Kitoroljuk az adatbazisbol az ertesitest
  //2, Majd kitoroljuk a tombunkbol is.
  onDelete(noti: Notification) {
    this.notificationService.delete(noti);
    const index = this.notifications.indexOf(noti, 0);
    if (index > -1) {
      this.notifications.splice(index, 1);
    }
  }

  logout(){
    this.authService.logout();
  }

  ngOnChanges(){
  }

  close() {
  }

  open() {

  }

}
