import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import {Validators,FormControl,FormGroup,FormBuilder, NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  name?:any="";
  email?:any="";
  code?:any="";
  password?:any="";
  numtel?:any="";
  cin?:any="";
  prenom?:any="";
  niveau?:any="";
  mfisc?:any="";
  secteuractivite?:any="";
  emplacement?:any="";
  attestationjuridique?:any="";
  description?="";
  status?:any="en attente";
  role?:any="E";
  role1?:any="S";
  role2?:any="US";
  enabled?:boolean=false;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  constructor(private router:Router,private http:HttpClient) { }

  ngOnInit(): void {
    console.log(this.role);
  }
  Submit(form) {
  }
}
