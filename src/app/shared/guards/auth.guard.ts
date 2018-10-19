import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth/auth.service';
import { of } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService,
                private toastr: ToastrService,
                private router: Router
            ) {}

            canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
                // check if user is logged in
                if(this.authService.authState) {
                    console.log(this.authService.authState);
                    return true;
                } else {
                    this.toastr.error('Please log in to continue!');
                    this.router.navigate(['login']);
                    return of(false);
                }

            }  
}


