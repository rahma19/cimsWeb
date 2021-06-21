import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CalendarOptions, EventClickArg } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import timeGridPlugin from '@fullcalendar/timegrid';
import { DataService } from '../data.service';
import { environment } from 'src/environments/environment';
import { BnNgIdleService } from 'bn-ng-idle';
import { DatePipe } from '@angular/common';
import frLocale from '@fullcalendar/core/locales/fr'; //French language

@Component({
  selector: 'app-liste-rdv',
  templateUrl: './liste-rdv.component.html',
  styleUrls: ['./liste-rdv.component.css']
})
export class ListeRdvComponent implements OnInit {

  test=false;
  pat=false;
  pass:any="";
  mdp:any="";
  hist=false;
  rendezvous:any;
  edit=false;
  cons=false;
  user:any;
  role:any;
  prof=false;
  idMed:any="";
  events: any[]=[];
  locales = [frLocale];
isup:any=false;
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    eventClick: function(info) {
      alert('clicked ' + info.event.title);
    },
        selectable: true

  };

rdv:any[]=[];
  options: any;
rv:any="";
id:any="";
codhop:any;

    constructor(private datePipe: DatePipe,private http:HttpClient,private dataService:DataService,private router:Router, private authService:AuthService,private bnIdle:BnNgIdleService) {

    }
    handleEventClick(clickInfo: EventClickArg) {
      /*if (confirm(`Vous etes sur de vouloir annuler ce rendez-vous? '${clickInfo.event.title}'`)) {
        clickInfo.event.remove();
      }*/
      console.log(clickInfo.event.id);
      this.id=clickInfo.event.id;
     //console.log(clickInfo.event.id);
     this.dataService.getRdvById(clickInfo.event.id).subscribe((data:any)=>{
      console.log(data['data']);
       this.rv=data['data'];
       console.log(this.rv);
       this.idMed=this.rv.cod_med;
       this.returnRdv();
     });
     }

    /*this.events=[
  { title: 'event 1', date: '2021-05-06 11:00' },
  { title: 'event 2', date: '2021-04-02' }
];*/
    returnRdv(){
      this.isup=true;
    }
    ngOnInit(): void {
      this.bnIdle.startWatching(7200).subscribe((isTimedOut: boolean) => {
        if (isTimedOut) {
          this.router.navigate(['/login']);
          console.log('session expired');
        }
      });
      this.user=this.authService.user;
      this.role=this.authService.role;
      this.codhop=this.authService.codhop;

     if(this.role=="M"){
       this.idMed=this.user._id;
      this.dataService.getRdvMed(this.user._id).subscribe((data)=>{
        this.rdv=data['data'];
        console.log(this.rdv);
        let datejour = new Date();
        let dt = this.datePipe.transform(datejour, "yyyy-MM-dd");
        for(let i=0;i<this.rdv.length;i++){ //this.rdv[i].title
          if(this.rdv[i].cod_hop==this.codhop && this.rdv[i].date_rdv > dt)
            this.events.push({id:this.rdv[i]._id,title:this.rdv[i].nom_pren_benef+" "+this.rdv[i].pren_benef,date:this.rdv[i].date_rdv+' '+this.rdv[i].heure_rdv });
        }
        console.log(this.events);

        this.calendarOptions={
          locale: frLocale,
          headerToolbar: {
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          },
          eventClick:this.handleEventClick.bind(this)
          /*function(info) {
            alert('clicked ' + info.event.id);
            this.isup=true;
          }*/,
              selectable: true,
          events: this.events,
         /* dateClick: (e) =>  {
            console.log(e.dateStr);
          },*/
        }
      });
     }
     else
     if(this.role=="P"){
      this.authService.getRdvBenef(this.user.cod_benef,this.codhop).subscribe((data)=>{
        this.rdv=data['data'];
        console.log(this.rdv);
        let datejour = new Date();
        let dt = this.datePipe.transform(datejour, "yyyy-MM-dd");
        for(let i=0;i<this.rdv.length;i++){ //this.rdv[i].title
          if(this.rdv[i].cod_hop==this.codhop && this.rdv[i].date_rdv > dt)
          {this.events.push({id:this.rdv[i]._id,title:this.rdv[i].nom_med+" "+this.rdv[i].prenom_med,date:this.rdv[i].date_rdv+' '+this.rdv[i].heure_rdv });
        }
      }
        console.log(this.events);
        this.calendarOptions={
          locale: frLocale,
          headerToolbar: {
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          },
          eventClick:this.handleEventClick.bind(this)
          /*function(info) {
            alert('clicked ' + info.event.id);
            this.isup=true;
          }*/,
              selectable: true,
          events: this.events,
         /* dateClick: (e) =>  {
            console.log(e.dateStr);
          },*/
        }
      });
     }

    }

    modif(f){
      console.log(f);
      this.http.patch(environment.api+"rdv/updaterdv"+`/${this.id}`, f).subscribe((res) => {
        console.log("Le rendezvous a été modifié avec succès");
       // this.msgs = [{severity:'info', summary:'Succés de modification', detail:''}];

      },
        error => {
          console.log('Erreur lors de la modification du rendez vous');
    //this.msgs = [{severity:'error', summary:'Erreur lors de la modification du restaurant', detail:''}];

        })
     }

     historique(){
      this.test=false;
      this.edit=false;
      this.pat=false;
      this.hist=true;
      this.cons=false;

    }


  renderList(){
    this.test=false;
    this.edit=false;
    this.pat=true;
    this.hist=false;
    this.cons=false;
    this.prof=false;
  }


  render(){
    this.pat=false;
    this.hist=false;
    this.edit=false;
    this.test=true;
    this.cons=false;

  }
}
