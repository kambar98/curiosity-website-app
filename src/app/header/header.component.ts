import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin = false;
  error: string = null;
  constructor(private authService: AuthService) { }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const nick = form.value.nick;
    const email = form.value.email;
    const password = form.value.password;
    if (this.isLogin) {

    } else {
      this.authService.signup(email, password, nick).subscribe(resData => {
        console.log(resData);
      },
        errorResponse => {
          console.log(errorResponse);
          switch (errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
              this.error='Ten email jest już używany'
          }
          
        }
      );

      form.reset();
    }
  }

  

  ngOnInit(): void {
  }


}
