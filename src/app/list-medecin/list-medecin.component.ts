import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
cod_hop:any;
 selDmn:any; 
 user:any=null;
role:any="";
  constructor(private activatedRoute : ActivatedRoute,private messageService:MessageService,private router:Router,private dataService: AuthService) { }

  ngOnInit(): void { 
    this.user=this.dataService.user;
    this.role=this.dataService.role;
    this.identifiant = this.activatedRoute.snapshot.params['cod_hop'];
    console.log(this.identifiant);
    this.dataService.getAllMedecinsHop(this.identifiant).subscribe(data=>{
      console.log(data['data']);
      this.medecins=data['data'];
      console.log(this.medecins);
    })
  }
  fixezrdv(medecin:any){
    if (this.user != null ){
      if(this.role=="M" || this.role=="P")
        this.router.navigate(['/fixer-rendezvous',medecin._id]);
      }
      else
        this.messageService.add({severity:'error', summary: ' Message', detail:'Erreur'});

  }

}


