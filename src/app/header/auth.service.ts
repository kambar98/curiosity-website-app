import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}



@Injectable({ providedIn: 'root' })

export class AuthService {
  user = new Subject<User>();

  constructor(private http: HttpClient) { }

  signup(email: string, password: string, nick: string) {
    return this.http.post < AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBoYIPz6cs3kYqEyxArWiwBJ4660DoWsYw',
      {
        nick: nick,
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(errorResponse => {
      let errorMessage = 'Wystąpił nieznany błąd';
      if (!errorResponse.error || !errorResponse.error.error) {
        return throwError (errorMessage);

      }
      switch (errorResponse.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'Ten email jest już używany'
      }
      return throwError(errorMessage);
    }), tap(responseData => {
      const expirationDate = new Date(new Date().getTime() + + responseData.expiresIn * 1000);
      const user = new User(responseData.email, responseData.localId, responseData.idToken, expirationDate);
      this.user.next(user);

    })
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBoYIPz6cs3kYqEyxArWiwBJ4660DoWsYw', {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(errorResponse => {
      let errorMessage = 'Wystąpił nieznany błąd';
      if (!errorResponse.error || !errorResponse.error.error) {
        return throwError(errorMessage);

      }
      switch (errorResponse.error.error.message) {
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'Wskazany email nie istnieje'
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'Nieprawidłowe hasło'
          break;
        
      }
      return throwError(errorMessage);
    }),tap(responseData => {
      const expirationDate = new Date(new Date().getTime() + + responseData.expiresIn * 1000);
      const user = new User(responseData.email, responseData.localId, responseData.idToken, expirationDate);
      this.user.next(user);

    })
    );
  }
  logout() {
    this.user.next(null);
  }
 
}

