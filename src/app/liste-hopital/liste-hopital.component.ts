import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
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
  constructor(private dataService: AuthService,private router:Router,private http:HttpClient,private bnIdle:BnNgIdleService) { }

  ngOnInit(): void {
    this.bnIdle.startWatching(7200).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        this.router.navigate(['/login']);
        console.log('session expired');
      }
    });
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
