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
  users: Observable<any[]>;
  constructor(private authService: AuthService) { 
  }

  ngOnInit() {
  }

  signup() {
    this.authService.signup(this.user.email, this.user.password).subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.log(error);
      }
    )
  }

}
