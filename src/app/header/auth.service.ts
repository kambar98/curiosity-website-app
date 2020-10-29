import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
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
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTime: any;

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
      const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
      const user = new User(responseData.email, responseData.localId, responseData.idToken, expirationDate);
      this.user.next(user);
      this.autoLogout(+ responseData.expiresIn * 1000);
      localStorage.setItem('userData', JSON.stringify(user));

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
      this.autoLogout(+ responseData.expiresIn*1000);
      localStorage.setItem('userData', JSON.stringify(user));
    })
    );
  }
  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTime) {
      clearTimeout(this.tokenExpirationTime);
    }
    this.tokenExpirationTime = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTime= setTimeout(() => {
      this.logout();
    }
      , expirationDuration)
  }

  autoLogin() {

    const userData:{
    email: string;
    id: string;
    _token: string;
    _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if (loadedUser.token) {

      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }

  }

}

