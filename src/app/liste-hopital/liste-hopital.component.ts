import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-liste-hopital',
  templateUrl: './liste-hopital.component.html',
  styleUrls: ['./liste-hopital.component.css']
})
export class ListeHopitalComponent implements OnInit {
  codhop?:any="";
  hopitals:any[];
  user:any=null;
  search="";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  } 
  constructor(private dataService: AuthService,private router:Router,private http:HttpClient) { }

  ngOnInit(): void {
    this.user=this.dataService.user;
    this.dataService.getAllHopitals().subscribe(data=>{
      console.log(data['data']);
      this.hopitals=data['data'];
      console.log(this.hopitals);
    })
  }
  afficheMed(hopital){
    console.log(hopital);
this.router.navigate(['ListeMedecins',hopital.cod_hop]);
  }
}
