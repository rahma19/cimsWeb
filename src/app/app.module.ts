import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {GlobalHttpInterceptorService} from "./GlobalHttpInterceptorService";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimeNGConfig } from 'primeng/api';
import { NavbarComponent } from './accueil/navbar/navbar.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToggleButtonModule} from 'primeng/togglebutton';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TableModule } from 'primeng/table';
import {FormsModule} from '@angular/forms';
import {TabMenuModule} from 'primeng/tabmenu';
import {StepsModule} from 'primeng/steps';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputTextModule} from 'primeng/inputtext';
import {MultiSelectModule} from 'primeng/multiselect';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {MatIconModule} from '@angular/material/icon';
import {FileUploadModule} from 'primeng/fileupload';
//import {ConfirmationService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CalendarModule} from 'primeng/calendar';
import {InputSwitchModule} from 'primeng/inputswitch';
import { ListeHopitalComponent } from './liste-hopital/liste-hopital.component';
import { ListMedecinComponent } from './list-medecin/list-medecin.component';
import {CheckboxModule} from 'primeng/checkbox';
import {CardModule} from 'primeng/card';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {DropdownModule} from 'primeng/dropdown';
import {MatSelectModule} from '@angular/material/select';
import {SidebarModule} from 'primeng/sidebar';
import { StepperComponent } from './stepper/stepper.component';
import {MatStepperModule} from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import {ButtonModule} from 'primeng/button';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { FixerRendezvousComponent } from './fixer-rendezvous/fixer-rendezvous.component';

@NgModule({
  declarations: [

    AppComponent,
    NavbarComponent,
    ListeHopitalComponent,
    ListMedecinComponent,
    StepperComponent,
    AppComponent,ListeHopitalComponent,
    LoginComponent,ListMedecinComponent,
    SignupComponent,
    HomeComponent,
    FooterComponent,
    FixerRendezvousComponent

  ],
 
  imports: [HttpClientModule,FormsModule,StepsModule,ToastModule,InputSwitchModule,
    BrowserModule,BrowserAnimationsModule,RadioButtonModule,MatTabsModule,MatInputModule,
    AppRoutingModule,TableModule,TabMenuModule,MatFormFieldModule,CalendarModule,
    ConfirmDialogModule,InputTextModule,MultiSelectModule,ReactiveFormsModule,
    FileUploadModule,ToggleButtonModule,ButtonModule,
    TabMenuModule,
    CheckboxModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatToolbarModule,
    CalendarModule,
    DropdownModule,MatSelectModule,CardModule,SidebarModule
  ],
  exports :[
    MatFormFieldModule,MatInputModule,MatStepperModule,BrowserAnimationsModule,MatToolbarModule, MatCardModule,MatSelectModule
  ],
  providers: [ AuthService,{ provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true  }],

  bootstrap: [AppComponent]
})
export class AppModule {  constructor(private primengConfig: PrimeNGConfig) {}
  ngOnInit() {
  
}
}
