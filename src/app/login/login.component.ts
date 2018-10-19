import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {};
  user_s: any = {};
  users: Observable<any[]>;
  constructor(private authService: AuthService) { 
  }

  ngOnInit() {
  }

  signup() {
    this.authService.signup(this.user.email, this.user.password)
    .then(user =>{
      console.log(user);
    }).catch(error => {
      console.log(error)
    })
  }

  login(){
    this.authService.login(this.user_s.email, this.user_s.password)
    .then(result =>{
      console.log(result);
      this.user_s = result && result.users && result.users[0]|| {} ;
    }).catch(err => {
      console.log(err);
    })
  }

}
