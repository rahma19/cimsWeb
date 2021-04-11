import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {
  test:boolean=true;
firstFormGroup: FormGroup;
  secondFormGroup: FormGroup; 
  isEditable = false;
  constructor(private _formBuilder: FormBuilder, private dataService: AuthService,private router:Router,private http:HttpClient) { }
  affiche(){
    this.test=false;
  }
rdv:any;
user:any;
i:any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  } 
  ngOnInit(): void {

    this.user=this.dataService.user;
    console.log(this.user);
   
    this.dataService.getAllRdvs().subscribe(data=>{
      for(let i=0;i<data['data'].length;i++)
      if (((this.user._id) == (data['data'][i].cod_benef)))
{
  if (data['data'][i].etat==false){
      console.log(data['data']);
      this.rdv=data['data'][i];
      console.log(this.rdv);}
      (error) =>{
        console.log("error");
      }

    }

    })
   

    this.test=true;
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

  }

}
