import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AwardedComponent } from './awarded/awarded.component';
import { AddComponent } from './add/add.component';
import { RegistrationComponent } from './registration/registration.component';
import { LogInComponent } from './log-in/log-in.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/Główna', pathMatch:'full' },
  { path: 'Główna', component: MainComponent },
  { path: 'Wyróżnione', component: AwardedComponent },
  { path: 'Dodaj', component: AddComponent },
  { path: 'Rejestracja', component: RegistrationComponent },
  { path: 'Logowanie', component: LogInComponent }

];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]

})
export class AppRoutingModule {

}
