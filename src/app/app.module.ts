import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {GlobalHttpInterceptorService} from "./GlobalHttpInterceptorService";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimeNGConfig } from 'primeng/api';
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
import { FixerRendezvousComponent } from './fixer-rendezvous/fixer-rendezvous.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { FooterComponent } from './home/footer/footer.component';
import { PayerRendezvousComponent } from './fixer-rendezvous/payer-rendezvous/payer-rendezvous.component';
import { AncienComponent } from './ancien/ancien.component';
import { NgxStripeModule } from 'ngx-stripe';
import {NgxPrintModule} from 'ngx-print';
import { FixerRendezvousMedComponent } from './fixer-rendezvous/fixer-rendezvous-med/fixer-rendezvous-med.component';
import { SuccessComponent } from './success/success.component';
import { FailureComponent } from './failure/failure.component';
import { ImprimerRecuComponent } from './fixer-rendezvous/imprimer-recu/imprimer-recu.component';

import {CascadeSelectModule} from 'primeng/cascadeselect';
import {DialogModule} from 'primeng/dialog';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FilterPipe } from './filter.pipe';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [

    AppComponent,
    ListMedecinComponent,
    StepperComponent,FilterPipe,
    AppComponent,ListeHopitalComponent,
    LoginComponent,ListMedecinComponent,
    SignupComponent,FooterComponent,
    HomeComponent,
    FixerRendezvousComponent,
    NavbarComponent,
    PayerRendezvousComponent,
    AncienComponent,
    FixerRendezvousMedComponent,
    SuccessComponent,
    FailureComponent,
    ImprimerRecuComponent,
    ProfileComponent
  ],
 
  imports: [HttpClientModule,FormsModule,StepsModule,ToastModule,InputSwitchModule,
    BrowserModule,BrowserAnimationsModule,RadioButtonModule,MatTabsModule,MatInputModule,
    AppRoutingModule,TableModule,TabMenuModule,MatFormFieldModule,CalendarModule,
    ConfirmDialogModule,InputTextModule,MultiSelectModule,ReactiveFormsModule,
    FileUploadModule,ToggleButtonModule,ButtonModule,NgxPrintModule,
    TabMenuModule,DialogModule,Ng2SearchPipeModule,
    CheckboxModule,CascadeSelectModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatToolbarModule,
    CalendarModule,
    ToastModule,
    DropdownModule,MatSelectModule,CardModule,SidebarModule,
    NgxStripeModule.forRoot('pk_test_51Ij5m9IPiJHJ7ZlG94Xwog7FwWTBzW7P2b7Ikx3yyIoVYqD08gTA2owW2b0NGZPi538y1As1nRb8eJvX8wlVHPqQ004GAY8dTY')
  ],
  exports :[
    MatFormFieldModule,MatInputModule,MatStepperModule,BrowserAnimationsModule,MatToolbarModule, MatCardModule,MatSelectModule
  ],
  providers: [ AuthService,{ provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true  }   ],

  bootstrap: [AppComponent]
})
export class AppModule {  constructor(private primengConfig: PrimeNGConfig) {}
  ngOnInit() {
  
}
}
