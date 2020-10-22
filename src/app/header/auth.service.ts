import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
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
    );
  }

}

