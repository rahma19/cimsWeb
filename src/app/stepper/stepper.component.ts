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
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { environment } from 'src/environments/environment';
import { formatCurrency } from '@angular/common';
import { loadStripe } from '@stripe/stripe-js';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],

  providers: [MessageService,{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})

export class StepperComponent implements OnInit {

//stripe elements
title = 'angular-stripe';
priceId = 'price_1IkbegIPiJHJ7ZlGzziXTGtn';
product = {
  title: 'Consultation',
  subTitle: 'payer votre rendez-vous',
  description: '',
  price: 0
};
quantity = 1;
stripePromise = loadStripe(environment.stripe_key);

//app
reg:any="";
numC:any="";
numA:any="";
dateV:any="";

  test:boolean=true;
firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  montantrdv: any;
  isup: boolean;
  eta:boolean=false;
  testsoin: any;

  handler:any = null;
rdv:any[]=[];
user:any="";
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
rendezvous:any="";
soins:any[]=[];
soin:any;
disabled: boolean = true;
 somme:Number=0;
fiche:any[];
codhop:any="";
dateval:any="";

  constructor(private cookieService:CookieService,private messageService:MessageService,private _formBuilder: FormBuilder, private authService: AuthService,private router:Router,private http:HttpClient, private dataservice: DataService, private stripeService: StripeService) { }

  ngOnInit(): void {
    this.user=JSON.parse(this.cookieService.get('data'));
    this.codhop=this.user.cod_hop;
console.log(this.codhop,this.user);
    this.authService.getRdvBenef(this.user.cod_benef,this.codhop).subscribe(data=>{
      console.log(data['data']);
      for(let i=0;i<data['data'].length;i++)
    {
       if (data['data'][i].etat==false){
          console.log(data['data']);
          this.rdv.push(data['data'][i]);
           console.log(this.rdv);
          }
      }
    },
    (error) =>{
      console.log("error");
    } );

    this.http.get(environment.api+"rdv/soin"+`/${this.user.cod_benef}`).subscribe(data=>{
      console.log(data['data']);
      this.soins=data['data'];
      this.soin=this.soins[0];
      console.log(this.soin);

      if(this.soins.length==0)
        this.testsoin=false
      else
      if(this.soins.length!=0)
        {
        this.testsoin=true;
        this.reg=this.soins[0].regime;
       // this.dateV=this.soin[0].date_valide;
        }
    });
console.log(this.testsoin);

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
        this.somme=data['data'][0].montant;
        console.log(this.montant);
      })

  }

//fonction paiement stripe
async checkout() {
  // Call your backend to create the Checkout session.

  // When the customer clicks on the button, redirect them to Checkout.
  const stripe = await this.stripePromise;

  const { error } = await stripe.redirectToCheckout({
    mode: 'payment',
    lineItems: [{ price: this.priceId, quantity: this.quantity }],
    successUrl: 'http://localhost:4200/#/historique',

    cancelUrl: 'http://localhost:4200/' ,
  });
  this.isup=true;
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




 /* if(this.soins==null){
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

  calculerMontant(somme){
  console.log(somme);
  console.log(this.rendezvous.specialite);
    if(this.rendezvous.specialite=="generaliste")
    somme+=5000;
  else
  if(this.rendezvous.specialite=="specialiste")
    somme+=7000;
    this.somme=somme;
    console.log(this.somme);
  }

  verifFiche(f){
    this.dataservice.getFichePatient(this.rendezvous.cod_med,this.user.cod_benef).subscribe((res)=>{
      console.log(res['data']);
      this.fiche=res['data'];
      console.log(this.fiche);
      if(this.fiche.length==0){
        this.dataservice.ajouterFichePatient(f).subscribe((res)=>{
          console.log("succeess");
        },(error)=>{
          console.log("erreur");
        });
      }
    });
  }

  verifdate(f){
    let datejour = new Date();
    console.log(f.value.dateV,datejour)
    if (f.value.dateV < datejour) {
      this.messageService.add({severity:'warning', summary: ' Message', detail:'Votre carnet n est plus valable'});
    }
}

Submit(f){
   f.value.etat=true;
   this.dataservice.updateRdv(f.value,this.rendezvous._id).subscribe((res:any) => {
     console.log("succes");
     this.messageService.add({severity:'success', summary: ' Message', detail:'Votre rendez-vous est confirmé'});
     this.rdv=f.value;
     this.isup=true;
    if(this.testsoin==true)

         this.dataservice.updateSoinBenef(f.value,this.soin._id).subscribe( (Response) => {
         console.log("success");
      },
       (error) =>{
         console.log("error");
   });
   else
   if(this.testsoin==false)
       this.dataservice.ajoutSoin(f).subscribe((res) => {
         console.log("success");
          },
           error => {
             console.log("error");
           });
 this.verifFiche(f);
   },
   err =>{
     this.messageService.add({severity:'error', summary: ' Message', detail:'Erreur lors du paiement'});
 console.log(err);
   });
 }

}


