import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import {HeaderComponent} from './header/header.component';
import {StoriesComponent} from './stories/stories.component';
import {AddComponent} from './add/add.component';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {SidebarComponent} from './sidebar/sidebar.component';

import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {PostsComponent} from './components/posts/posts.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {JwPaginationModule} from 'jw-angular-pagination';

@NgModule({
  declarations: [AppComponent, MainComponent, HeaderComponent, StoriesComponent, AddComponent, SidebarComponent, PostsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    NoopAnimationsModule,
    NgxPaginationModule,
    JwPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
