import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  Patient: FormGroup;
  img: any;
  nom_pren_benef:any;
  pren_benef:any;
  email:any;
  tel_benef:any;
  patients:any[];
  constructor(private formBuilder : FormBuilder,private http:HttpClient,private dataService:AuthService,private router:Router,private messageService:MessageService) {
   /* this.Patient = this.formBuilder.group({
      img: [null],
      nom_pren_benef: "",
      pren_benef: "",
      email: "",
      tel_benef: "",

  });*/
  }
  closeModal() {
    this.display=false;
  }
  ngOnInit() {
    this.display = true;
    this.user=this.dataService.user;
    this.role=this.dataService.role;
  }

/*  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.Patient.get('img').setValue(file);

    }
  }
  onUpload(event) {
    this.img.push(event);
           console.log(event);

  }*/

  Submit(f){
    console.log(f.value);
    if(this.role=="P"){
     /* const formData = new FormData();
    formData.append('img',this.Patient.get('img').value);
    formData.append('nom_pren_benef', this.Patient.get('nom_pren_benef').value);
    formData.append('pren_benef', this.Patient.get('pren_benef').value);
    formData.append('email', this.Patient.get('email').value);
    formData.append('tel_benef', this.Patient.get('tel_benef').value);*/
        this.dataService.update(f,this.user._id,"auth/modifPat").subscribe( (Response) => {
          console.log("success");
          this.messageService.add({severity:'success', summary: ' Message', detail:'modification enregistrée avec succés'});

      },
        (error) =>{
          console.log("error");
          this.messageService.add({severity:'warn', summary: ' Erreur', detail:'erreur lors de la modification'});

    });

    }

    else
    if(this.role=="M")
       {
        if((this.mdp!="" && f.value.password!="") || (this.mdp=="" && f.value.password=="")){
          if(this.mdp==f.value.password || (this.mdp=="" && f.value.password==""))
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
          this.messageService.add({severity:'danger', summary: ' Erreur', detail:'mot de passe erroné'});

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
       }else {
        this.messageService.add({severity:'danger', summary: ' Erreur', detail:'mot de passe erroné'});

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
