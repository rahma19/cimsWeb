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
import { formatCurrency } from '@angular/common';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})

export class StepperComponent implements OnInit {
//stripe elements
title = "angular-stripe";
  priceId = "price_1IkbegIPiJHJ7ZlGzziXTGtn";
  product = {
    title: "Classic Peace Lily",
    subTitle: "Popular House Plant",
    description:
      "Classic Peace Lily is a spathiphyllum floor plant arranged in a bamboo planter with a blue & red ribbom and butterfly pick.",
    price: 18.0,
  };
  quantity = 1;
  stripePromise = loadStripe(environment.stripe_key);

//app

  test:boolean=true;
firstFormGroup: FormGroup;
  secondFormGroup: FormGroup; 
  isEditable = false;
  value = 'Clear me';
  montantrdv: any;
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
rendezvous:any;
soins:any[]=[];
disabled: boolean = true;
 somme:number;
 montantpayer:number;

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
      } } }
      )
      this.dataservice.getSoinsBenef(this.user.cod_benef).subscribe(data=>{
        console.log(data['data']);
        this.soins=data['data'];
        console.log(this.soins);
      })

      console.log(this.rdv);

    this.test=true;
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });


   


      //recuperer tout les type du regime
      this.dataservice.getAllRegime().subscribe(data=>{
        console.log(data['data']);
        this.montant=data['data'];
        console.log(this.montant);
      })

  }

//fonction paiement stripe
async checkout() {
  // Call your backend to create the Checkout session.
  // When the customer clicks on the button, redirect them to Checkout.
  let stripe = await this.stripePromise;

  let { error } = await stripe.redirectToCheckout({
    mode: "payment",
    lineItems: [{ price: this.priceId, quantity: this.quantity }],
    successUrl: `${window.location.href}/success`,
    cancelUrl: `${window.location.href}/failure`,
  });
  // If `redirectToCheckout` fails due to a browser or network
  // error, display the localized error message to your customer
  // using `error.message`.
  if (error) {
    console.log(error);
  }
}

passrdv(rdv){
  this.rendezvous=rdv;
  console.log(this.rendezvous);
}



Submit(f){
  if(this.soins==null){
   this.dataservice.addSoin(this.soins).subscribe((res:any) => {
      console.log("success");
     // this.messageService.add({severity:'success', summary: 'Success', detail: 'email envoyée avec succées'});
     },
       error => {
   //     this.messageService.add({severity:'error', summary: ' Message', detail:'Erreur'});
        console.log("error");
    });
  }
  /*else{
    this.dataservice.updateSoin(this.soins[0]._id,f).subscribe(
      (res :any) => {
         //   this.msgs = [{severity:'info', summary:'Succés de modification', detail:''}];
        console.log(res['data']);
        console.log("success");
       
      },
        (error) =>{
             //   this.msgs = [{severity:'error', summary:'Erreur lors de la modification du l offre ', detail:''}];

      console.log("error");
    });
  }*/
  
}



  
  


}

