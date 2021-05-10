import { DatePipe } from '@angular/common';
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
  @Input() idMed:any;

  @Output() onChange= new EventEmitter<number>();
  selectedValue:any="";
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
date:any="";
  constructor(private datePipe: DatePipe,private dataService:DataService, private http:HttpClient) {

  }
  closeModal() {
   this.display=false;
 }

 onEnvoyer(f) {
  var dt = this.datePipe.transform(this.selectedValue,"yyyy-MM-dd");
  this.rv.date_rdv=dt
  //f.value.date_rdv=dt;
  this.onChange.emit(f);
 this.closeModal();
 console.log(f.value);
}

 ngOnInit() {
   this.display = true;
   console.log(this.rv);
   console.log(this.idMed);
  // this.selectedValue=this.rv.date_rdv;
  // this.date=this.rv.date_rdv;
  // console.log(this.date);
 }

 affiche(date:any){
   console.log(date);
  this.tab=[];
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

/*
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
selectedValue:any="";
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
}*/
