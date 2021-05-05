import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-liste-rdv',
  templateUrl: './liste-rdv.component.html',
  styleUrls: ['./liste-rdv.component.css']
})
export class ListeRdvComponent implements OnInit {
  user:any;
  role:any;
  test=false;

    constructor(private http:HttpClient,private dataService:AuthService,private router:Router) {

    }
    ngOnInit(): void {
      this.user=this.dataService.user;
      this.role=this.dataService.role;
    }
}
