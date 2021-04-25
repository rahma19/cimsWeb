import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { StripeService } from "ngx-stripe";

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})

export class StepperComponent implements OnInit {
//stripe
  elements: any;
  card: any;
  elementsOptions: any = {
    locale: 'es'
  };
  stripeTest: FormGroup;

//app
  test:boolean=true;
firstFormGroup: FormGroup;
  secondFormGroup: FormGroup; 
  isEditable = false;
  value = 'Clear me';
  affiche(){
    this.test=false;
  }
  handler:any = null;
rdv:any[]=[];
user:any;
i:any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  } 
//champs des paiement
montant:any[]=[];
regime:any;
num_assure:any;
date_valide:any;
num_carnet:any;


  constructor(private _formBuilder: FormBuilder, private authService: AuthService,private router:Router,private http:HttpClient, private dataservice: DataService, private stripeService: StripeService) { }
  
  ngOnInit(): void {
    this.user=this.authService.user;
    console.log(this.user);
   
    this.authService.getRdvBenef(this.user.cod_benef).subscribe(data=>{
      for(let i=0;i<data['data'].length;i++)
{
  if (data['data'][i].etat==false){
      console.log(data['data']);
      this.rdv.push(data['data'][i]);
      console.log(this.rdv);}
      (error) =>{
        console.log("error");
      } } })



    this.test=true;
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

//Stripe
    this.stripeTest = this._formBuilder.group({
      name: ['', [Validators.required]]
    });
    this.stripeService.elements(this.elementsOptions)
      .subscribe(elements => {
        this.elements = elements;
        // Only mount the element the first time
        if (!this.card) {
          this.card = this.elements.create('card', {
            style: {
              base: {
                iconColor: '#666EE8',
                color: '#31325F',
                lineHeight: '40px',
                fontWeight: 300,
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSize: '18px',
                '::placeholder': {
                  color: '#CFD7E0'
                }
              }
            }
          });
          this.card.mount('#card-element');
        }
      });


      //recuperer tout les type du regime
      this.dataservice.getAllRegime().subscribe(data=>{
        console.log(data['data']);
        this.montant=data['data'];
        console.log(this.montant);
      })

  }

//fonction paiement stripe
  buy() {
    const name = this.stripeTest.get('name').value;

    this.stripeService
      .createToken(this.card, { name })
      .subscribe(obj => {
        if (obj) {
          console.log("Token is --> ",obj.token.id);

this.http.post(environment.api+"rdv/payme",{
  token : obj.token.id
}).subscribe(
(res)=>{
  console.log("The response from server is ",res);
  console.log('Payment Done')
},
(err)=>{
  console.log('The error is ',err)
})
 } else  {
          // Error creating the token
           console.log("Error comes ");
        }
      });
  }
 


  
  
 
  }

  
  




