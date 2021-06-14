import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {GlobalHttpInterceptorService} from "./GlobalHttpInterceptorService";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
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
import { AncienComponent } from './ancien/ancien.component';
import { NgxStripeModule } from 'ngx-stripe';
import {NgxPrintModule} from 'ngx-print';
import { FixerRendezvousMedComponent } from './fixer-rendezvous/fixer-rendezvous-med/fixer-rendezvous-med.component';
import { FailureComponent } from './failure/failure.component';
import { ImprimerRecuComponent } from './fixer-rendezvous/imprimer-recu/imprimer-recu.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import {DialogModule} from 'primeng/dialog';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FilterPipe } from './filter.pipe';
import { ProfileComponent } from './profile/profile.component';
import { ListeRdvComponent } from './liste-rdv/liste-rdv.component';
import { ListePatientComponent } from './liste-patient/liste-patient.component';
import { ModifFicheComponent } from './fiche/modif-fiche/modif-fiche.component';
import { AjouterFicheComponent } from './fiche/ajouter-fiche/ajouter-fiche.component';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import timeGridPlugin from '@fullcalendar/timegrid';
import { HistoriquePaieComponent } from './historique-paie/historique-paie.component';
import {DatePipe} from '@angular/common';
import { EditRdvComponent } from './liste-rdv/edit-rdv/edit-rdv.component';
import { ConsulterPharmComponent } from './pharmacie/consulter-pharm/consulter-pharm.component';
import { EditPharmComponent } from './pharmacie/edit-pharm/edit-pharm.component';
import {InputNumberModule} from 'primeng/inputnumber';
import { AjoutMedicComponent } from './pharmacie/ajout-medic/ajout-medic.component';
import {PaginatorModule} from 'primeng/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ErrorComponent } from './error/error.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ModifProfilComponent } from './modif-profil/modif-profil.component';
import { BnNgIdleService } from 'bn-ng-idle';
import { DetailRdvComponent } from './liste-rdv/detail-rdv/detail-rdv.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);
@NgModule({
  declarations: [

    AppComponent,DetailRdvComponent,
    ListMedecinComponent,
    StepperComponent,FilterPipe,
    AppComponent,ListeHopitalComponent,
    LoginComponent,ListMedecinComponent,
    SignupComponent,FooterComponent,
    HomeComponent,
    FixerRendezvousComponent,
    NavbarComponent,
    AncienComponent,
    FixerRendezvousMedComponent,
    FailureComponent,
    ImprimerRecuComponent,
    ProfileComponent,
    ListeRdvComponent,
    ListePatientComponent,
    ModifFicheComponent,
    AjouterFicheComponent,
    HistoriquePaieComponent,
    EditRdvComponent,
    ConsulterPharmComponent,
    EditPharmComponent,
    AjoutMedicComponent,
    ErrorComponent,
    ModifProfilComponent,
  ],

  imports: [HttpClientModule,FormsModule,StepsModule,ToastModule,InputSwitchModule,
    BrowserModule,BrowserAnimationsModule,RadioButtonModule,MatTabsModule,MatInputModule,
    AppRoutingModule,TableModule,TabMenuModule,MatFormFieldModule,CalendarModule,
    ConfirmDialogModule,InputTextModule,MultiSelectModule,ReactiveFormsModule,
    FileUploadModule,ToggleButtonModule,ButtonModule,NgxPrintModule,
    TabMenuModule,DialogModule,Ng2SearchPipeModule,
    CheckboxModule,CascadeSelectModule,FullCalendarModule,
    BrowserAnimationsModule,InputNumberModule,
    MatStepperModule,PaginatorModule,
    ReactiveFormsModule,NgxPaginationModule,
    MatCardModule,
    MatToolbarModule,MatIconModule,
    CalendarModule,MatDatepickerModule,
    ToastModule,MDBBootstrapModule.forRoot(),
    DropdownModule,MatSelectModule,CardModule,SidebarModule,
    NgxStripeModule.forRoot('pk_test_51Ij5m9IPiJHJ7ZlG94Xwog7FwWTBzW7P2b7Ikx3yyIoVYqD08gTA2owW2b0NGZPi538y1As1nRb8eJvX8wlVHPqQ004GAY8dTY')
  ],
  exports :[MatIconModule,MatDatepickerModule,
    MatFormFieldModule,MatInputModule,MatStepperModule,BrowserAnimationsModule,MatToolbarModule, MatCardModule,MatSelectModule
  ],
  providers: [ DatePipe,AuthService,MessageService,BnNgIdleService,ConfirmationService,{ provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true  }   ],

  bootstrap: [AppComponent]
})
export class AppModule {  constructor(private primengConfig: PrimeNGConfig) {}
  ngOnInit() {

}
}
