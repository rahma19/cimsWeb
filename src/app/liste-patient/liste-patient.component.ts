import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-liste-patient',
  templateUrl: './liste-patient.component.html',
  styleUrls: ['./liste-patient.component.css']
})
export class ListePatientComponent implements OnInit {

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
