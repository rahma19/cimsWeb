import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AncienComponent } from './ancien/ancien.component';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ErrorComponent } from './error/error.component';
import { FailureComponent } from './failure/failure.component';
import { FixerRendezvousMedComponent } from './fixer-rendezvous/fixer-rendezvous-med/fixer-rendezvous-med.component';
import { FixerRendezvousComponent } from './fixer-rendezvous/fixer-rendezvous.component';
import { ImprimerRecuComponent } from './fixer-rendezvous/imprimer-recu/imprimer-recu.component';
import { HistoriquePaieComponent } from './historique-paie/historique-paie.component';
import { HomeComponent } from './home/home.component';

import { ListMedecinComponent } from './list-medecin/list-medecin.component';
import { ListeHopitalComponent } from './liste-hopital/liste-hopital.component';
import { ListePatientComponent } from './liste-patient/liste-patient.component';
import { EditRdvComponent } from './liste-rdv/edit-rdv/edit-rdv.component';
import { ListeRdvComponent } from './liste-rdv/liste-rdv.component';
import { ConsulterPharmComponent } from './pharmacie/consulter-pharm/consulter-pharm.component';
import { EditPharmComponent } from './pharmacie/edit-pharm/edit-pharm.component';
import { ProfileComponent } from './profile/profile.component';
import { StepperComponent } from './stepper/stepper.component';

const routes: Routes = [
  {path: 'Home', component:HomeComponent},
  {path: 'listMedic', component:EditPharmComponent},
  {path: 'Medicament', component: ConsulterPharmComponent},
  {path:'profile', component:ProfileComponent},
  {path:'fixer-rendezvous/:id', component:FixerRendezvousComponent},
  {path:'login', component:LoginComponent},
  {path:'loginAncien',component:AncienComponent},
  {path:'signUp', component:SignupComponent},
  {path:'priseRdvMed', component:FixerRendezvousMedComponent},
  {path:'imprimer', component:ImprimerRecuComponent},
  {path:'ListeHopital', component:ListeHopitalComponent},
  {path:'ListeMedecins/:cod_hop', component:ListMedecinComponent},
  {path:'stepper', component:StepperComponent},
  {path:'historique', component:HistoriquePaieComponent},
  {path:'listRdv', component:ListeRdvComponent},
  {path:'editRdv/:cod_med', component:EditRdvComponent},
  {path:'listPat', component:ListePatientComponent},
  {path: 'imprimer', component : ImprimerRecuComponent},
  {path:'', redirectTo:'Home', pathMatch:'full'},
  {path:'**',component:ErrorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
