import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {GlobalHttpInterceptorService} from "./GlobalHttpInterceptorService";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PrimeNGConfig } from 'primeng/api';
import { CreerCompteComponent } from './authentification/creer-compte/creer-compte.component';
import { NavbarComponent } from './accueil/navbar/navbar.component';
import {TabMenuModule} from 'primeng/tabmenu';
import { ListeHopitalComponent } from './liste-hopital/liste-hopital.component';

import { ListMedecinComponent } from './list-medecin/list-medecin.component';
import {CheckboxModule} from 'primeng/checkbox';


@NgModule({
  declarations: [
    AppComponent,
    CreerCompteComponent,
    NavbarComponent,
    ListeHopitalComponent,
    ListMedecinComponent,
 
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TabMenuModule,
    CheckboxModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {  constructor(private primengConfig: PrimeNGConfig) {}
  ngOnInit() {
  
}
}
