import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-list-medecin',
  templateUrl: './list-medecin.component.html',
  styleUrls: ['./list-medecin.component.css']
})
export class ListMedecinComponent implements OnInit {
  identifiant: any;
  medecins:any[];
cod_hop:any;
 selDmn:any; 
  constructor(private activatedRoute : ActivatedRoute,private dataService: AuthService) { }

  ngOnInit(): void { 

    this.identifiant = this.activatedRoute.snapshot.params['cod_hop'];
    console.log(this.identifiant);
    this.dataService.getAllMedecinsHop(this.identifiant).subscribe(data=>{
      console.log(data['data']);
      this.medecins=data['data'];
      console.log(this.medecins);
    })

 


   
  }

}


