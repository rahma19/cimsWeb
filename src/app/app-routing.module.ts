import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FixerRendezvousComponent } from './fixer-rendezvous/fixer-rendezvous.component';
import { HomeComponent } from './home/home.component';

import { ListMedecinComponent } from './list-medecin/list-medecin.component';
import { ListeHopitalComponent } from './liste-hopital/liste-hopital.component';
import { StepperComponent } from './stepper/stepper.component';

const routes: Routes = [
  {path: 'Home', component: HomeComponent},
  {path:'fixer-rendezvous', component:FixerRendezvousComponent},
  {path:'login', component:LoginComponent},
  {path:'signUp', component:SignupComponent},
  {path:'ListeHopital', component:ListeHopitalComponent},
  {path:'ListeMedecins', component:ListMedecinComponent},
  {path:'stepper', component:StepperComponent},
  {path:'', redirectTo:'Home', pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
