import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth.service';
import { DataService } from 'src/app/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-rdv',
  templateUrl: './edit-rdv.component.html',
  styleUrls: ['./edit-rdv.component.css']
})
export class EditRdvComponent implements OnInit {
  display: boolean;

  @Input() rv:any;
  idMed:any;

  @Output() onChange= new EventEmitter<number>();
  selectedValue:any="";
rdv:any='';
tab:any[]=[];
codhop:any;
benef:any;
heurMed:any[]=[
  {heur:'08:00',value:'08:00'},
  {heur:'08:30',value:'08:30'},
  {heur:'09:00',value:'09:00'},
  {heur:'09:30',value:'09:30'},
  {heur:'10:00',value:'10:00'},
  {heur:'10:30',value:'10:30'},
  {heur:'11:00',value:'11:00'},
  {heur:'11:30',value:'11:30'},
  {heur:'12:00',value:'12:00'},
]
heure:any;
heurs: any[] = [];
date:any="";
role:any="";
user:any;
test:any=true;
  constructor(private cookieService:CookieService,private authService:AuthService,private messageService:MessageService, private activatedRoute : ActivatedRoute,private datePipe: DatePipe,private dataService:DataService, private http:HttpClient,private bnIdle:BnNgIdleService,private router:Router) {

  }
  closeModal() {
   this.display=false;
 }

 /*onEnvoyer(f) {
  var dt = this.datePipe.transform(this.selectedValue,"yyyy-MM-dd");
  this.rv.date_rdv=dt
  //f.value.date_rdv=dt;
  this.onChange.emit(f);
 this.closeModal();
 console.log(f.value);
}*/

 ngOnInit() {
  this.bnIdle.startWatching(7200).subscribe((isTimedOut: boolean) => {
    if (isTimedOut) {
      this.router.navigate(['/login']);
      console.log('session expired');
    }
  });
  this.user=JSON.parse(this.cookieService.get('data'));
  this.codhop=this.user.cod_hop;  this.role=this.authService.role;

  // this.display = true;
  // console.log(this.rv);
  this.idMed = this.activatedRoute.snapshot.params['cod_med'];

   console.log(this.idMed);
  // this.selectedValue=this.rv.date_rdv;
  // this.date=this.rv.date_rdv;
  // console.log(this.date);

  this.dataService.getRdvById(this.idMed).subscribe((data:any)=>{
    console.log(data['data']);
     this.rv=data['data'];
     console.log(this.rv);
     this.authService.getBenef(this.rv.cod_benef,this.codhop).subscribe((data)=>{
      this.benef=data['data'];
      console.log(this.benef);
    });
  });

 }

 affiche(date:any){
   console.log(date);
  this.tab=[];
  let datejour = new Date();
  if (date > datejour) {
    if(date.getDay() == 6 || date.getDay() == 0){
      this.messageService.add({ severity: 'warn', summary: ' Message', detail: 'Veuillez selectionner une date valide' });
    }
    else{
      this.test = false;
  var dt = this.datePipe.transform(date,"yyyy-MM-dd");
  console.log(dt);
  this.dataService.getHeurMedecin(this.idMed,dt).subscribe(data=>{
    console.log(data['data']);
    this.heurs=data['data'];
    console.log(this.heurs);

    this.afficheDateDispo()

    console.log(this.heurMed.length)  ;
  console.log(this.heurs.length);
  });
    }
} else {
  this.messageService.add({ severity: 'warn', summary: ' Message', detail: 'Veuillez selectionner une date valide' });
}
}
afficheDateDispo() {

  for (let i = 0; i < this.heurMed.length; i++) {
    let j = 0;
    let teste = true;
    while (j < this.heurs.length ) {

      if (this.heurMed[i].value == this.heurs[j].heure_rdv) {
        console.log(this.heurMed[i].value + "/ " + this.heurs[j].heure_rdv);
        teste = false;
        break;
      }
      j++;
    }
    if (teste==true) { this.tab.push(this.heurMed[i].value); }
  }
  console.log(this.tab);
}

 Submit(f,benef){
   console.log(this.benef._id,benef._id);
  var dt = this.datePipe.transform(this.date,"yyyy-MM-dd");
  f.value.date_rdv=dt

    if(this.role=="P"){
      f.value.userId=this.rv.cod_med;
  f.value.title=this.rv.nom_pren_benef+" "+this.rv.pren_benef;
  f.value.message=f.value.date_rdv+" a "+f.value.heure_rdv;
    }
    else
    if(this.role=="M"){
console.log(benef[0]._id);
      f.value.userId=benef[0]._id;
      console.log(f.value.userId);
      f.value.title="Dr "+this.rv.nom_med+" "+this.rv.prenom_med;
      f.value.message=f.value.date_rdv+" a "+f.value.heure_rdv;
      f.value.ancrdv=this.rv.date_rdv;
    }
  //f.value.date_rdv=dt;
  console.log(f.value);
  this.http.patch(environment.api+"rdv/updaterdv"+`/${this.idMed}`, f.value).subscribe((res) => {
    console.log("Le rendezvous a été modifié avec succès");
    this.messageService.add({ severity: 'success', summary: ' Message', detail: 'Votre rendez-vous a été decalé avec succés' });

  },
    error => {
      console.log('Erreur lors de la modification du rendez vous');
      this.messageService.add({ severity: 'error', summary: ' Message', detail: 'Erreur' });

    })
}

}
