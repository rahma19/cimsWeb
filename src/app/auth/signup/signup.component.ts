import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import {Validators,FormControl,FormGroup,FormBuilder, NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth.service';
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [MessageService]
})
export class SignupComponent implements OnInit {

  name?:any="";
  prenom?:any="";
  password?:any="";
  email?:any="";
  service?:any="";
  codhop?:any="";
  status?:any="pending"; 
  nom_pren_benef:any="";
  pren_benef:any="";
  pren_pere_benef:any="";
  pren_mere_benef:any="";
  pass:any="";
  jour:any="";
  capacite:any="";
  psdo:any="";
  pas:any="";
  psseudo:any="";
  confemail:any=""
  date_nai_benef:any="";
  sexe_benef:any="";
  tel_benef:any="";
role:any="F";
test:boolean=true;
code=Math.floor(Math.random() * 999999) + 100000;
  enabled?:boolean=false;
  medecins:any[];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  jours: any[] = [
    {value: '1', viewValue: 'lundi'},
    {value: '2', viewValue: 'mardi'},
    {value: '3', viewValue: 'mercredi'},
    {value: '4', viewValue: 'jeudi'},
    {value: '5', viewValue: 'vendredi'},
    {value: '6', viewValue: 'samedi'},
    {value: '7', viewValue: 'dimanche'}
  ];

  hopitals:any[];
  
    constructor(private dataService: AuthService,private router:Router,private http:HttpClient, private messageService: MessageService) { }
  
    ngOnInit() {
      this.dataService.getAllHopitals().subscribe(data=>{
        console.log(data['data']);
        this.hopitals=data['data'];
        console.log(this.hopitals);
      })
    }

    notify(){
      this.test=false;
      let ch=this.psseudo;
      
      let object={"to":ch,"sub":"Confirmation","text":this.code+" est le code de confirmation de votre nouveau compte sur CIMS"};
      return this.http.post(environment.api+"users/mailing", object).subscribe((res:any) => {
        console.log("success");
        console.log(this.code);
        this.messageService.add({severity:'success', summary: 'Success', detail: 'email envoyée avec succées'});
       },
         error => {
          this.messageService.add({severity:'error', summary: ' Message', detail:'Erreur'});
          console.log("error");
      })
    }

  

  Submit(form) {
    
    console.log ("form.value", form.value)
         let addedData = JSON.stringify(form.value);
         console.log ("addedData", addedData);
       this.http.post(environment.api+"auth/signupMedecin", addedData,this.httpOptions).subscribe((res) => {
        this.router.navigate(['/login']);
          this.messageService.add({severity:'success', summary: 'Message', detail:'Succes'});  
          
         },
           error => {
             this.messageService.add({severity:'error', summary: ' Message', detail:'Erreur'});
           });
   }

   SubmitPat(form){
     console.log(this.code);
     console.log(form.value.code);
    if(this.code==form.value.code){
    console.log ("form.value", form.value)
    let addedData = JSON.stringify(form.value);
    console.log ("addedData", addedData);
  this.http.post(environment.api+"auth/signupPatient", addedData,this.httpOptions).subscribe((res) => {
    this.messageService.add({severity:'success', summary: 'Message', detail:'Succes'}); 
    this.router.navigate(['/login']);
    },
      error => {
      this.messageService.add({severity:'error', summary: ' Message', detail:'Erreur'});
      });
   } else {
     console.log("erreruurr"); 
   }}

   SubmitUser(form){
    console.log ("form.value", form.value)
    let addedData = JSON.stringify(form.value);
    console.log ("addedData", addedData);
  this.http.post(environment.api+"auth/signupPharmacien", addedData,this.httpOptions).subscribe((res) => {
    this.messageService.add({severity:'success', summary: 'Message', detail:'Succes'}); 
   this.router.navigate(['/login']); 
    },
      error => {
      this.messageService.add({severity:'error', summary: ' Message', detail:'Erreur'});
      });
   }


  
}
