import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-fixer-rendezvous',
  templateUrl: './fixer-rendezvous.component.html',
  styleUrls: ['./fixer-rendezvous.component.css'],
  providers: [MessageService]
})
export class FixerRendezvousComponent implements OnInit {
  identifiant:any="";
  medecin:any=null;
  soin:any[];
  montant:any;
  selectedValue: string;
  heurs: any[] = [];
  user:any="";
  role:any="";
  heur:any="";
  hidde:any=false;
  test:boolean=true;
  res:boolean=true;
  aff:boolean=true;
  eta:any=false;
  value:any="";
  tab:any[]=[];
heurMed:any[]=[
  {heur:'8:00',value:'8:00'},
  {heur:'8:30',value:'8:30'},
  {heur:'9:00',value:'9:00'},
  {heur:'9:30',value:'9:30'},
  {heur:'10:00',value:'10:00'},
  {heur:'10:30',value:'10:30'},
  {heur:'11:00',value:'11:00'},
  {heur:'11:30',value:'11:30'},
  {heur:'12:00',value:'12:00'},
]
  date: Date;
    
    dates: Date;

    rangeDates: Date[];

    minDate: Date;

    maxDate: Date;

    es: any;

    invalidDates: Array<Date>

    constructor(private http:HttpClient,private activatedRoute:ActivatedRoute,private messageService:MessageService,private dataService:DataService,private authService:AuthService) { }

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
          if(this.heurMed[i].value==this.heurs[j].heur)
               { console.log(this.heurMed[i].value+"/ "+this.heurs[j].heur);
                 teste=false;
                 j++;
                }
           else
             j++;  
         }
           if(j>=this.heurs.length )
                { this.tab.push(this.heurMed[i].value);}          
 }
}

  afficher(){
    this.res=false;   
    console.log(this.soin[0].regime);

    this.dataService.getRegime(this.soin[0].regime).subscribe(data=>{
      console.log(data['data'][0].montant_rdv);
      this.montant=data['data'][0].montant_rdv;
      console.log(this.montant);
      if(this.medecin.specialite=="generaliste")
         this.montant+=5000;
      else
      if(this.medecin.specialite=="specialiste")
         this.montant+=7000;
    });

  }

Submit(f){
  console.log(f.value);
  let month=f.value.date.getMonth()+1;
  let date =f.value.date.getDate()+"-"+month+"-"+f.value.date.getFullYear();
  f.value.date=date;
  this.dataService.ajouterHeurMed(f).subscribe((res:any) => {
    this.messageService.add({severity:'success', summary: ' Message', detail:'Ajout avec succes'});
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
    });

    this.user=this.authService.user;
    this.role=this.authService.role;
    this.http.get(environment.api+"rdv/soin"+`/${this.user.cod_benef}`).subscribe(data=>{
      console.log(data['data']);
      this.soin=data['data'];
      console.log(this.soin);
    });
      }

  modifierSoinBenef(f){
    //this.dataService.updateSoin(f,this.soin[0]._id);
  }
}
