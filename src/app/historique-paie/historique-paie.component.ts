import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-historique-paie',
  templateUrl: './historique-paie.component.html',
  styleUrls: ['./historique-paie.component.css']
})
export class HistoriquePaieComponent implements OnInit {
  user:any;
  role:any;

    constructor(private http:HttpClient,private dataService:AuthService,private router:Router) {

    }
    ngOnInit(): void {
      this.user=this.dataService.user;
      this.role=this.dataService.role;
    }

}
