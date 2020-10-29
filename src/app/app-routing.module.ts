import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AwardedComponent } from './awarded/awarded.component';
import { AddComponent } from './add/add.component';
import { AuthGuard } from './header/auth.guard';


const appRoutes: Routes = [
  { path: '', redirectTo: '/Główna', pathMatch:'full' },
  { path: 'Główna', component: MainComponent },
  { path: 'Wyróżnione', component: AwardedComponent },
  { path: 'Dodaj', component: AddComponent, canActivate: [AuthGuard] }
 

];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]

})
export class AppRoutingModule {

}
