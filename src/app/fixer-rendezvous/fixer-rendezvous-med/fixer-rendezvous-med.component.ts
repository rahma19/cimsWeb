import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../auth.service';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-fixer-rendezvous-med',
  templateUrl: './fixer-rendezvous-med.component.html',
  styleUrls: ['./fixer-rendezvous-med.component.css'],
  providers: [MessageService]

})
export class FixerRendezvousMedComponent implements OnInit {
  codben: any = "";
  medecin: any = null;
  selectedValue: string;
  heurs: any[] = [];
  user: any = "";
  tel: any = "";
  eta: any = false;
  heur: any = "";
  hidde: any = false;
  test: boolean = true;
  res: boolean = true;
  aff: boolean = true;
  value: any = "";
  tab: any[] = [];
  heurMed: any[] = [
    { heur: '08:00', value: '08:00' },
    { heur: '08:30', value: '08:30' },
    { heur: '09:00', value: '09:00' },
    { heur: '09:30', value: '09:30' },
    { heur: '10:00', value: '10:00' },
    { heur: '10:30', value: '10:30' },
    { heur: '11:00', value: '11:00' },
    { heur: '11:30', value: '11:30' },
    { heur: '12:00', value: '12:00' },
  ]
  date: Date;
benef:any="";
  dates: Date;
hopitals:any[]=[];
  rangeDates: Date[];

  minDate: Date;

  maxDate: Date;

  es: any;
codhop:any="";
  invalidDates: Array<Date>

  constructor(private cookieService:CookieService,private router:Router,private bnIdle:BnNgIdleService,private datePipe: DatePipe, private messageService: MessageService, private dataService: DataService, private authService: AuthService) { }


  affiche(date: any) {
    this.tab = [];
    let datejour = new Date();
  if (date > datejour) {
    if(date.getDay() == 6 || date.getDay() == 0){
      this.messageService.add({ severity: 'warn', summary: ' Message', detail: 'Veuillez selectionner une date valide' });
    }
    else{
    this.test = false;
    let month = date.getMonth() + 1;
    let dt = date.getDate() + "-" + month + "-" + date.getFullYear();
    console.log(this.medecin._id, dt);
    this.dataService.getHeurMedecin(this.medecin._id, dt).subscribe(data => {
      console.log(data['data']);
      this.heurs = data['data'];
      console.log(this.heurs);
      this.afficheDateDispo();
    });
    console.log(this.tab);
  }
} else {
  this.messageService.add({ severity: 'warn', summary: ' Message', detail: 'Veuillez selectionner une date valide' });
}
  }

  afficheDateDispo() {

    for (let i = 0; i < this.heurMed.length; i++) {
      let j = 0;
      let teste = true;
      while (j < this.heurs.length && teste == true) {
        if (this.heurMed[i].value == this.heurs[j].heur) {
          console.log(this.heurMed[i].value + "/ " + this.heurs[j].heur);
          teste = false;
          j++;
        }
        else
          j++;
      }
      if (j >= this.heurs.length) { this.tab.push(this.heurMed[i].value); }
    }
  }

  afficher() {
    this.res = false;
  }

  fixerRdv(f) {
    f.value.nom_med=this.medecin.nom_med;
    f.value.prenom_med=this.medecin.prenom_med;
    f.value.service=this.medecin.service;
    f.value.specialite=this.medecin.specialite;
    f.value.nom_pren_benef=this.benef.nom_pren_benef;
    f.value.pren_benef=this.benef.pren_benef;
    f.value.date_nai_benef=this.benef.date_nai_benef;
    f.value.tel_benef=this.benef.tel_benef;
    f.value.cod_hop=this.codhop;
    f.value.nom_hop=this.hopitals[0].nom_hop;
    f.value.adr_hop=this.hopitals[0].adr_hop;

    f.value.endTime = new Date(f.value.endTime);
    var ddMMyyyy = this.datePipe.transform(f.value.date_rdv, "yyyy-MM-dd");
    f.value.date_rdv = ddMMyyyy;
    console.log(f.value);
    this.dataService.fixerRdv(f).subscribe((res: any) => {
      this.messageService.add({ severity: 'success', summary: ' Message', detail: 'rendez-vous fixé avec succés' });
    },
      err => {
        this.messageService.add({ severity: 'error', summary: ' Message', detail: 'Erreur lors de l ajout' });

      });
  }
  Submit(f) {
    console.log(this.codben, this.medecin.cod_hop);
    this.authService.getBenef(this.codben, this.medecin.cod_hop).subscribe((res) => {
      console.log(res['data'].length);
      if (res['data'].length != 0) {
        this.benef=res['data'][0];
        this.fixerRdv(f);
      }
      else {
        this.messageService.add({ severity: 'error', summary: ' Message', detail: 'Index introuvable' });
      }
    }, (erreur) => {
      this.messageService.add({ severity: 'error', summary: ' Message', detail: 'Index introuvable' });
    });

  }

  ngOnInit(): void {
    this.bnIdle.startWatching(7200).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        this.router.navigate(['/login']);
        console.log('session expired');
      }
    });
    this.medecin=JSON.parse(this.cookieService.get('data'));
    this.codhop=this.medecin.cod_hop;
    console.log(this.codhop);
    this.authService.getAllHopitals().subscribe(data=>{
      console.log(data['data']);
      this.hopitals=data['data'];
      console.log(this.hopitals);
    })
}
}
