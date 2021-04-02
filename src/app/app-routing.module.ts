import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ListMedecinComponent } from './list-medecin/list-medecin.component';
import { ListeHopitalComponent } from './liste-hopital/liste-hopital.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'signUp', component:SignupComponent},
  {path:'', redirectTo:'signUp', pathMatch:'full'},
  {path:'Liste hopital', component:ListeHopitalComponent},
  {path:'Liste medecins', component:ListMedecinComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
