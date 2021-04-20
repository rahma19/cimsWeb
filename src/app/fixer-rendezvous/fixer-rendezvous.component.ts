import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
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
  selectedValue: string;
  heurs: any[] = [];
  user:any="";
  role:any="";
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

    /*hide(heur:any){
      let test=false;
      for(let i=0;i<this.heurs.length;i++){
        
          if(heur==this.heurs[i].heur)
             {console.log(this.heurs[i].heur);
            test=true;}
      return test;
      }
    }*/

  affiche(date:any){
    this.tab=[];
    this.test=false;
    if(this.role=="M")
      this.aff=false;
    let month=date.getMonth()+1;
    let dt=date.getDate()+"-"+month+"-"+date.getFullYear();
    this.dataService.getHeurMedecin(this.identifiant,dt).subscribe(data=>{
      console.log(data['data']);
      this.heurs=data['data'];
      console.log(this.heurs);
      this.afficheDateDispo()
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
    if(this.role=="P")
    this.res=false;   
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

   /* this.es = {
      firstDayOfWeek: 1,
      dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
      dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
      dayNamesMin: [ "D","L","M","X","J","V","S" ],
      monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
      monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
      today: 'Hoy',
      clear: 'Borrar'
  }
  let today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();
  let prevMonth = (month === 0) ? 11 : month -1;
  let prevYear = (prevMonth === 11) ? year - 1 : year;
  let nextMonth = (month === 11) ? 0 : month + 1;
  let nextYear = (nextMonth === 0) ? year + 1 : year;
  this.minDate = new Date();
  this.minDate.setMonth(prevMonth);
  this.minDate.setFullYear(prevYear);
  this.maxDate = new Date();
  this.maxDate.setMonth(nextMonth);
  this.maxDate.setFullYear(nextYear);
  
  let invalidDate = new Date();
  invalidDate.setDate(today.getDate() - 1);
  this.invalidDates = [today,invalidDate];*/
  }

}
