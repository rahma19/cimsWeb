import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-list-medecin',
  templateUrl: './list-medecin.component.html',
  styleUrls: ['./list-medecin.component.css'],
  providers: [MessageService]

})
export class ListMedecinComponent implements OnInit {
  identifiant: any;
  medecins:any[];
 selDmn:any;
 user:any=null;
role:any="";
codhop:any;
service:any[]=[{value:"pneumologie"},
                {value:"cardiologie"},
                {value:"Pédiatrie"},
                {value:"Chirurgie Orthopédique"},
                {value:"Gynécologie "},
                {value:"Allergologie"},
                {value:"cytologie "}
              ]
  constructor(private bnIdle:BnNgIdleService,private activatedRoute : ActivatedRoute,private messageService:MessageService,private router:Router,private dataService: AuthService) { }

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
    console.log(this.codhop);
    this.identifiant = this.activatedRoute.snapshot.params['cod_hop'];
    console.log(this.identifiant);
    this.dataService.getAllMedecinsHop(this.identifiant).subscribe(data=>{
      console.log(data['data']);
      this.medecins=data['data'];
      console.log(this.medecins);
    })
  }

  fixezrdv(medecin:any){
    if (medecin.cod_hop==this.codhop){
      this.router.navigate(['/fixer-rendezvous',medecin._id]);
    }
    else
    this.messageService.add({severity:'error', summary: ' Message', detail:"Vous n'etes pas inscrit dans cet hopital"});

  }

}


