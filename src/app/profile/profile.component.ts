import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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
pass:any="";
mdp:any="";
hist=false;
isup=false;
rendezvous:any;
edit=false;
cons=false;
codhop:any;
prof=true;
choix:any;

  constructor(private http:HttpClient,private dataService:AuthService,private router:Router,private messageService:MessageService) {

  }
  ngOnInit(): void {
    this.user=this.dataService.user;
    this.role=this.dataService.role;
    this.codhop=this.dataService.codhop;
    this.edit=true;
      this.choix = this.dataService.check;
      console.log(this.choix);



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

  render(){
    this.pat=false;
    this.hist=false;
    this.edit=false;
    this.test=true;
    this.cons=false;

  }

  editer(){
    this.edit=true;
    this.test=false;
    this.pat=false;
    this.hist=false;
    this.cons=false;
    this.prof=true;
  }

  renderList(){
    this.test=false;
    this.edit=false;
    this.pat=true;
    this.hist=false;
    this.cons=false;
    this.prof=false;
  }

  medic(){
    this.test=false;
    this.edit=false;
    this.pat=false;
    this.hist=false;
    this.cons=true;
  }

  historique(){
    this.test=false;
    this.edit=false;
    this.pat=false;
    this.hist=true;
    this.cons=false;

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
          this.messageService.add({severity:'success', summary: ' Message', detail:'modification enregistrée avec succés'});

      },
        (error) =>{
          console.log("error");
          this.messageService.add({severity:'danger', summary: ' Erreur', detail:'erreur lors de la modification'});

    });

    else
    if(this.role=="M")
       {
        if(this.mdp!=""){
          if(this.mdp==f.value.password)
          {
            this.dataService.update(f.value,this.user._id,"auth/modifMed").subscribe( (Response) => {
              console.log("success");
              this.messageService.add({severity:'success', summary: ' Message', detail:'modification enregistrée avec succés'});

          },
            (error) =>{
              console.log("error");
              this.messageService.add({severity:'danger', summary: ' Erreur', detail:'erreur lors de la modification'});

        });
          }
          else
          console.log("incorrect mdp");
          this.messageService.add({severity:'danger', summary: ' Erreur', detail:'erreur lors de la modification'});

        }
        else
        if(this.user.password==f.value.password)
          {
            this.dataService.update(f.value,this.user._id,"auth/modifMed").subscribe( (Response) => {
              console.log("success");
              this.messageService.add({severity:'success', summary: ' Message', detail:'modification enregistrée avec succés'});

          },
            (error) =>{
              console.log("error");
              this.messageService.add({severity:'danger', summary: ' Erreur', detail:'erreur lors de la modification'});

        });
       }
       }

       else
       if(this.role=="A")
          {
           if(this.mdp!=""){
             if(this.mdp==f.value.password)
             {
               this.dataService.update(f.value,this.user._id,"auth/modifpharm").subscribe( (Response) => {
                 console.log("success");
                 this.messageService.add({severity:'success', summary: ' Message', detail:'modification enregistrée avec succés'});

             },
               (error) =>{
                 console.log("error");
                 this.messageService.add({severity:'danger', summary: ' Erreur', detail:'erreur lors de la modification'});

           });
             }
             else
             console.log("incorrect mdp");
             this.messageService.add({severity:'danger', summary: ' Erreur', detail:'erreur lors de la modification'});

           }
           else
          {
            if(this.user.password==f.value.password)
             {
               this.dataService.update(f.value,this.user._id,"auth/modifpharm").subscribe( (Response) => {
                 console.log("success");
                 this.messageService.add({severity:'success', summary: ' Message', detail:'modification enregistrée avec succés'});

             },
               (error) =>{
                 console.log("error");
                 this.messageService.add({severity:'danger', summary: ' Erreur', detail:'erreur lors de la modification'});

           });
          }}
  }
}
}
