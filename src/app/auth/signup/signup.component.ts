import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import {Validators,FormControl,FormGroup,FormBuilder, NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  name?:any="";
  prenom?:any="";
  pseudo?:any="";
  password?:any="";
  specialite?:any="";
  service?:any="";
  codhop?:any="";
  status?:any="pending";
  enabled?:boolean=false;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  hopitals:any[];
  
    constructor(private dataService: AuthService,private router:Router,private http:HttpClient) { }
  
    ngOnInit() {
      this.dataService.getAllHopitals().subscribe(data=>{
        console.log(data['data']);
        this.hopitals=data['data'];
        console.log(this.hopitals);
      })
    }
  Submit(form) {
    
    console.log ("form.value", form.value)
         let addedData = JSON.stringify(form.value);
         console.log ("addedData", addedData);
       this.http.post(environment.api+"auth/signupMedecin", addedData,this.httpOptions).subscribe((res) => {
         this.router.navigate(['/login']);
         //  this.messageService.add({severity:'success', summary: 'Message', detail:'Succes'});  
          
         },
           error => {
             //this.messageService.add({severity:'error', summary: ' Message', detail:'Erreur'});
           });
   }
}
