import {Component, OnInit} from '@angular/core';
import {AuthService} from './header/auth.service';
import {AddService} from './add/add.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'curiosity';
  constructor(private authService: AuthService, private service: AddService) {}
  ngOnInit() {
    this.authService.autoLogin();
    this.service.getImageDetailList();
  }
}
