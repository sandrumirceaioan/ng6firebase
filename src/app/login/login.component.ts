import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {};
  users: Observable<any[]>;
  constructor(private authService: AuthService, private toastr: ToastrService) { 
  }

  ngOnInit() {
  }


  login(){
    this.authService.emailLogin(this.user.email, this.user.password)
    .then(result =>{
      this.toastr.success('User logged in!');
    }).catch(err => {
      this.toastr.error(err.message);
    })
  }

}
