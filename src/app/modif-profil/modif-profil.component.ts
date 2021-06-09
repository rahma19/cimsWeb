import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-modif-profil',
  templateUrl: './modif-profil.component.html',
  styleUrls: ['./modif-profil.component.css']
})
export class ModifProfilComponent implements OnInit {
  display: boolean;
  user:any;
  mdp:any="";
  role:any;
  
  constructor(private http:HttpClient,private dataService:AuthService,private router:Router,private messageService:MessageService) {}
  closeModal() {
    this.display=false;
  }
  ngOnInit() {
    this.display = true;
    this.user=this.dataService.user;
    this.role=this.dataService.role;
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
