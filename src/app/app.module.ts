import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {GlobalHttpInterceptorService} from "./GlobalHttpInterceptorService";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PrimeNGConfig } from 'primeng/api';
import { NavbarComponent } from './accueil/navbar/navbar.component';
import {TabMenuModule} from 'primeng/tabmenu';
import { ListeHopitalComponent } from './liste-hopital/liste-hopital.component';
import { ListMedecinComponent } from './list-medecin/list-medecin.component';
import {CheckboxModule} from 'primeng/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StepperComponent } from './stepper/stepper.component';
import {MatStepperModule} from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListeHopitalComponent,
    ListMedecinComponent,
    StepperComponent
 
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TabMenuModule,
    CheckboxModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
   
  ],
  exports :[
    MatFormFieldModule,MatInputModule,MatStepperModule,BrowserAnimationsModule
  ],


 
    
 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {  constructor(private primengConfig: PrimeNGConfig) {}
  ngOnInit() {
  
}
}
