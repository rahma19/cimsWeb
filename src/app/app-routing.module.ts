import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMedecinComponent } from './list-medecin/list-medecin.component';
import { ListeHopitalComponent } from './liste-hopital/liste-hopital.component';
import { StepperComponent } from './stepper/stepper.component';

const routes: Routes = [

  {path:'Liste hopital', component:ListeHopitalComponent},
  {path:'Liste medecins', component:ListMedecinComponent},
  {path:'stepper', component:StepperComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
