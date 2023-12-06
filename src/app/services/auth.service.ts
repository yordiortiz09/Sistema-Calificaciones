import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, retry, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { GlobalVariablesService } from './global-variables.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;
  constructor(private http: HttpClient, private router: Router, private globalVariable: GlobalVariablesService) { }

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,

    });
  }



  login(user: User) {
    return this.http.post<User>(this.globalVariable.API_URL2 + '/login', user)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Ha ocurrido un error:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(() => new Error('Vuelva a intentar más tarde.'));
  }


  logout(): void {
    localStorage.removeItem('token');
  }
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('token');

    }
    return this.token;
  }

}
