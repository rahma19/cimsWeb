import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AncienComponent } from './ancien/ancien.component';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FailureComponent } from './failure/failure.component';
import { FixerRendezvousMedComponent } from './fixer-rendezvous/fixer-rendezvous-med/fixer-rendezvous-med.component';
import { FixerRendezvousComponent } from './fixer-rendezvous/fixer-rendezvous.component';
import { ImprimerRecuComponent } from './fixer-rendezvous/imprimer-recu/imprimer-recu.component';
import { PayerRendezvousComponent } from './fixer-rendezvous/payer-rendezvous/payer-rendezvous.component';
import { HomeComponent } from './home/home.component';

import { ListMedecinComponent } from './list-medecin/list-medecin.component';
import { ListeHopitalComponent } from './liste-hopital/liste-hopital.component';
import { ProfileComponent } from './profile/profile.component';
import { StepperComponent } from './stepper/stepper.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  {path: 'Home', component: HomeComponent},
  {path:'profile/:id', component:ProfileComponent},
  {path:'fixer-rendezvous/:id', component:FixerRendezvousComponent},
  {path:'payer-rendezvous/:id', component:PayerRendezvousComponent},
  {path:'login', component:LoginComponent},
  {path:'loginAncien',component:AncienComponent},
  {path:'signUp', component:SignupComponent},
  {path:'priseRdvMed', component:FixerRendezvousMedComponent},
  {path:'imprimer', component:ImprimerRecuComponent},
  {path:'ListeHopital', component:ListeHopitalComponent},
  {path:'ListeMedecins/:cod_hop', component:ListMedecinComponent},
  {path:'stepper', component:StepperComponent},
  {path: 'imprimer', component : ImprimerRecuComponent},
  {path:'failure', component: FailureComponent},
  {path:'success', component: SuccessComponent},
  {path:'**', redirectTo:'Home', pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
