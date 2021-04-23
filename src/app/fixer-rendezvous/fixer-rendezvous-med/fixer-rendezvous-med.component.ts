import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  codben:any="";
  medecin:any=null;
  selectedValue: string;
  heurs: any[] = [];
  user:any="";
  tel:any="";
  eta:any=true;
  heur:any="";
  hidde:any=false;
  test:boolean=true;
  res:boolean=true;
  aff:boolean=true;
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

    constructor(private activatedRoute:ActivatedRoute,private messageService:MessageService,private dataService:DataService,private authService:AuthService) { }


  affiche(date:any){
    this.tab=[];
    this.test=false;
  
    let month=date.getMonth()+1;
    let dt=date.getDate()+"-"+month+"-"+date.getFullYear();
    this.dataService.getHeurMedecin(this.medecin._id,dt).subscribe(data=>{
      console.log(data['data']);
      this.heurs=data['data'];   
      console.log(this.heurs);
      this.afficheDateDispo();
    });
     console.log(this.tab);
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
  }

Submit(f){
  console.log(f.value);
  let month=f.value.date_rdv.getMonth()+1;
  let date =f.value.date_rdv.getDate()+"-"+month+"-"+f.value.date_rdv.getFullYear();
  f.value.date_rdv=date;
  this.dataService.fixerRdv(f).subscribe((res:any) => {
    this.messageService.add({severity:'success', summary: ' Message', detail:'Ajout avec succes'});
  },
  err =>{
    this.messageService.add({severity:'error', summary: ' Message', detail:'Erreur'});

  });
}

  ngOnInit(): void {
    this.medecin=this.authService.user;
  }    
}
