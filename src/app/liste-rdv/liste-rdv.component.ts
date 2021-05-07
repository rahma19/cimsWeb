import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CalendarOptions } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import timeGridPlugin from '@fullcalendar/timegrid';
import { DataService } from '../data.service';

@Component({
  selector: 'app-liste-rdv',
  templateUrl: './liste-rdv.component.html',
  styleUrls: ['./liste-rdv.component.css']
})
export class ListeRdvComponent implements OnInit {

  user:any;
  role:any;
  test=false;
  events: any[];

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    events: [
      { title: 'event 1', date: '2021-05-06 11:00' },
      { title: 'event 2', date: '2021-04-02' }
    ],
    dateClick: (e) =>  {
      console.log(e.dateStr);
      
    },
    editable: true

  };

rdv:any[]=[];
  options: any;

    constructor(private http:HttpClient,private dataService:DataService,private router:Router, private authService:AuthService) {

    }
    ngOnInit(): void {
      this.user=this.authService.user;
      this.role=this.authService.role;

      this.dataService.getRdvMed(this.user._id).subscribe((data)=>{
        this.rdv=data['data'];});
    }
}
