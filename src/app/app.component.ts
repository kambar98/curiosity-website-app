import { Component, OnInit } from '@angular/core';
import { AuthService } from './header/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'curiosity';
  constructor(private authService: AuthService) {

  }
  ngOnInit() {
    this.authService.autoLogin();

  }
}
