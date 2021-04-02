import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreerCompteComponent } from './authentification/creer-compte/creer-compte.component';
import { ListMedecinComponent } from './list-medecin/list-medecin.component';
import { ListeHopitalComponent } from './liste-hopital/liste-hopital.component';

const routes: Routes = [
  {path:'Créer Compte', component:CreerCompteComponent},
  {path:'Liste hopital', component:ListeHopitalComponent},
  {path:'Liste medecins', component:ListMedecinComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
