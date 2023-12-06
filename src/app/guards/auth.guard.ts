import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private apiService: AuthService, private router: Router) { }

  canActivate(): Promise<boolean> {
    const token = localStorage.getItem('token');
    return new Promise(resolve => {
      if (token) {
        resolve(true);
      } else {
        this.router.navigate(['/login']);
        resolve(false);
      }
    });


  }

}