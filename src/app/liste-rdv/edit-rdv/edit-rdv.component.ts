import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() onChange= new EventEmitter<number>();

rdv:any='';
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
heurs: any[] = [];

  constructor(private dataService:DataService, private http:HttpClient) {

  }
  closeModal() {
   this.display=false;
 }

 onEnvoyer(f) {
  this.onChange.emit(f);
 this.closeModal();
 console.log(f.value);
}

 ngOnInit() {
   this.display = true;
     console.log(this.rv);

 }

 affiche(date:any){
  this.tab=[];
  let month=date.getMonth()+1;
  let dt=date.getFullYear()+"-"+month+"-"+date.getDate();
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
}
