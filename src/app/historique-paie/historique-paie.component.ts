import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-historique-paie',
  templateUrl: './historique-paie.component.html',
  styleUrls: ['./historique-paie.component.css']
})
export class HistoriquePaieComponent implements OnInit {
  user:any;
  role:any;
  codhop:any;
rdv:any[]=[];
isup=false;
rendezvous:any;
    constructor(private http:HttpClient,private dataService:AuthService,private router:Router,private bnIdle:BnNgIdleService) {

    }
    ngOnInit(): void {
      this.bnIdle.startWatching(7200).subscribe((isTimedOut: boolean) => {
        if (isTimedOut) {
          this.router.navigate(['/login']);
          console.log('session expired');
        }
      });
      this.user=this.dataService.user;
      this.role=this.dataService.role;
      this.codhop=this.dataService.codhop;

      this.dataService.getRdvBenef(this.user.cod_benef,this.codhop).subscribe(data=>{
        console.log(data['data']);
        for(let i=0;i<data['data'].length;i++)
      {
         if (data['data'][i].etat==true){
            console.log(data['data']);
            this.rdv.push(data['data'][i]);
             console.log(this.rdv);
            }
        }
      },
      (error) =>{
        console.log("error");
      } );
    }

    imprimer(rdv){
      this.isup=true;
      this.rendezvous=rdv;
    }
}
