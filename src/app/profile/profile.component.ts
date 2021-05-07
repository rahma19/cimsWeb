import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { DataService } from 'src/app/data.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
user:any;
role:any;
rdv:any[]=[];
test=false;
pat=false;
hist=false;
isup=false;
rendezvous:any;
edit=false;

  constructor(private http:HttpClient,private dataService:AuthService,private router:Router) {

  }
  ngOnInit(): void {
    this.user=this.dataService.user;
    this.role=this.dataService.role;
    this.edit=true;

    this.dataService.getRdvBenef(this.user.cod_benef).subscribe(data=>{
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

  render(){
    this.pat=false;
    this.hist=false;
    this.edit=false;
    this.test=true;
  }

  editer(){
    this.edit=true;
    this.test=false;
    this.pat=false;
    this.hist=false;
  }

  renderList(){
    this.test=false;
    this.edit=false;
    this.pat=true;
    this.hist=false;
  }

  historique(){
    this.test=false;
    this.edit=false;
    this.pat=false;
    this.hist=true;
  }

  imprimer(rdv){
    this.isup=true;
    this.rendezvous=rdv;
  }

  Submit(f){
    console.log(f.value);
    if(this.role=="P")
        this.dataService.update(f.value,this.user._id,"auth/modifPat").subscribe( (Response) => {
          console.log("success");
      },
        (error) =>{
          console.log("error");
    });
    else
    if(this.role=="M")
        this.dataService.update(f.value,this.user._id,"auth/modifMed").subscribe( (Response) => {
          console.log("success");
      },
        (error) =>{
          console.log("error");
    });
  }
}
