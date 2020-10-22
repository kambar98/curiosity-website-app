import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
    })
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBoYIPz6cs3kYqEyxArWiwBJ4660DoWsYw', {
      email: email,
      password: password,
      returnSecureToken: true
    });
  }

}

