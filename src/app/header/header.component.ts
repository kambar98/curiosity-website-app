import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService, AuthResponseData} from './auth.service';
import {from, Observable, Subscription} from 'rxjs';
import {User} from './user.model';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLogin = true;
  isAuth = false;
  error: string = null;
  user: User;

  constructor(private authService: AuthService) {}

  onLogin() {
    this.isLogin = true;
    this.error = null;
  }
  onSignIn() {
    this.isLogin = false;
    this.error = null;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const nick = form.value.nick;
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    if (this.isLogin) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password, nick);
    }

    authObs.subscribe(
      (resData) => {
        console.log(resData);

        if (this.error == null) {
          $('#rejestracja').modal('hide');
          $('#logowanie').modal('hide');
        }
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
      },
    );

    form.reset();
  }

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.isAuth = !!user;
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.authService.user.unsubscribe();
  }
  onlogout() {
    this.authService.logout();
  }
}
