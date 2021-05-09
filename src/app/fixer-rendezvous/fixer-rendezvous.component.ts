import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StripeService } from 'ngx-stripe';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-fixer-rendezvous',
  templateUrl: './fixer-rendezvous.component.html',
  styleUrls: ['./fixer-rendezvous.component.css'],
  providers: [MessageService]
})
export class FixerRendezvousComponent implements OnInit {
  identifiant:any="";
  medecin?:any=null;
  soin?:any[];
  testsoin:any;
  hop:any[];
  isup=false;
  reg:any="";
  numC:any="";
  numA:any="";
  dateV:any="";
  montant:any;
  selectedValue: string;
  heurs: any[] = [];
  user:any="";
  role:any="";
  heur:any="";
  montants:any[]=[];
  hidde:any=false;
  test:boolean=true;
  res:boolean=true;
  aff:boolean=true;
  eta:any=false;
  rdv:any;
  fiche:any[];
  value:any="";
  tab:any[]=[];
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
  date: Date;


    constructor(private datePipe: DatePipe,private _formBuilder: FormBuilder,private http:HttpClient,private activatedRoute:ActivatedRoute,private messageService:MessageService,private dataService:DataService,private authService:AuthService, private stripeService: StripeService) { }

  affiche(date:any){
    this.tab=[];
    this.test=false;
    let month=date.getMonth()+1;
    let dt=date.getDate()+"-"+month+"-"+date.getFullYear();
    this.dataService.getHeurMedecin(this.identifiant,dt).subscribe(data=>{
      console.log(data['data']);
      this.heurs=data['data'];
      console.log(this.heurs);

      this.afficheDateDispo()

      console.log(this.heurMed.length)  ;
    console.log(this.heurs.length);
/*   for(let i=0;i<this.heurMed.length;i++)
    {
      let j=0;
      let test=true;
       while(j<this.heurs.length || test==true)

          {
            console.log(this.heurs[j].heur);
            if(this.heurMed[i].value==this.heurs[j].heur)
                 { console.log(this.heurMed[i].value+"/ "+this.heurs[j].heur);
                   test=false;
                   j++;
                  }
             else
               j++;
           }
             if(j>this.heurs.length)
                  { this.tab.push(this.heurMed[i].value);}
   }*/
    });
  }

afficheDateDispo(){

  for(let i=0;i<this.heurMed.length;i++)
  {
    let j=0;
    let teste=true;
     while(j<this.heurs.length && teste==true)
        {
          console.log(j+"ggg"+this.heurs[j].heure_rdv);
          if(this.heurMed[i].value==this.heurs[j].heure_rdv)
          { console.log(this.heurMed[i].value+"/ "+this.heurs[j].heure_rdv);
            teste=false;
            j++;
           }
      else
        j++;
         }
           if(j>=this.heurs.length)
                { this.tab.push(this.heurMed[i].value);}
 }
}

calculerMontant(montant){
  if(this.medecin.specialite=="generaliste")
  montant+=5000;
else
if(this.medecin.specialite=="specialiste")
  montant+=7000;
  this.montant=montant;
}

  afficher(){
    this.res=false;
   if(this.testsoin==true)
    { console.log(this.soin[0].regime);

      this.dataService.getRegime(this.soin[0].regime).subscribe(data=>{
        console.log(data['data'][0].montant);
        this.montant=data['data'][0].montant;
        console.log(this.montant);
        if(this.medecin.specialite=="generaliste")
  this.montant+=5000;
else
if(this.medecin.specialite=="specialiste")
  this.montant+=7000;
      });
    }

  }

  verifFiche(f){
    this.dataService.getFichePatient(this.medecin.cod_med,this.user.cod_benef).subscribe((res)=>{
      console.log(res['data']);
      this.fiche=res['data'];
      console.log(this.fiche);
      if(this.fiche.length==0){
        this.dataService.ajouterFichePatient(f).subscribe((res)=>{
          console.log("succeess");
        },(error)=>{
          console.log("ororo");
        });
      }
    });
  }

Submit(f){
// let month=f.value.date.getMonth()+1;
 // let date =f.value.date.getFullYear()+"-"+month+"-"+f.value.date.getDate()+" "+f.value.heure_rdv;
  //f.value.date=date;
  var ddMMyyyy = this.datePipe.transform(f.value.date_rdv,"yyyy-MM-dd");
  f.value.date_rdv=ddMMyyyy;
  f.value.etat=true;
  console.log(f.value);
  this.dataService.fixerRdv(f).subscribe((res:any) => {
    this.messageService.add({severity:'success', summary: ' Message', detail:'Ajout avec succes'});
    this.rdv=f.value;
    this.isup=true;
    if(this.testsoin==true)
        this.dataService.updateSoinBenef(f.value,this.soin[0]._id).subscribe( (Response) => {
        console.log("success");
     },
      (error) =>{
        console.log("error");
  });
  else
  if(this.testsoin==false)
 { let m=f.value.date_valide.getMonth()+1;
  let dt =f.value.date_valide.getDate()+"-"+m+"-"+f.value.date_valide.getFullYear();
  f.value.date_valide=dt;
      this.dataService.ajoutSoin(f).subscribe((res) => {
        console.log("success");
         },
          error => {
            console.log("error");
          });
        }
    this.verifFiche(f);
  },
  err =>{
    this.messageService.add({severity:'error', summary: ' Message', detail:'Erreur'});

  });
}

  ngOnInit(): void {
    this.identifiant= this.activatedRoute.snapshot.params['id'];
    console.log(this.identifiant);
    this.dataService.getMedecinById(this.identifiant).subscribe(data=>{
      console.log(data['data']);
      this.medecin=data['data'];
      console.log(this.medecin);
      this.dataService.getHopitalByCode(this.medecin.cod_hop).subscribe(data=>{
        console.log(data['data']);
        this.hop=data['data'];
        console.log(this.hop);
      });
    });

    this.user=this.authService.user;
    this.role=this.authService.role;
    this.http.get(environment.api+"rdv/soin"+`/${this.user.cod_benef}`).subscribe(data=>{
      console.log(data['data']);
      this.soin=data['data'];
      console.log(this.soin);

      if(this.soin.length==0)
        this.testsoin=false
      else
      if(this.soin.length!=0)
        {
        this.testsoin=true;
        this.reg=this.soin[0].regime;
        this.dateV=this.soin[0].date_valide;
        }
    });
console.log(this.testsoin);

    this.dataService.getAllRegime().subscribe(data=>{
      console.log(data['data']);
      this.montants=data['data'];
      console.log(this.montants);
    });



//Stripe


  }





}
