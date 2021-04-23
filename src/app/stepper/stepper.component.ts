import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { StripeCardComponent } from 'ngx-stripe';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { StripeService } from "ngx-stripe";
import { StripeElement } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})

export class StepperComponent implements OnInit {

  elements: any;
  card: any;
 
  // optional parameters
  elementsOptions: any = {
    locale: 'es'
  };
 
  stripeTest: FormGroup;




  test:boolean=true;
firstFormGroup: FormGroup;
  secondFormGroup: FormGroup; 
  isEditable = false;

  constructor(private _formBuilder: FormBuilder, private dataService: AuthService,private router:Router,private http:HttpClient, private dataservices: DataService, private stripeService: StripeService) { }
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
  ngOnInit(): void {
    this.user=this.dataService.user;
    console.log(this.user);
   
    this.dataService.getAllRdvs().subscribe(data=>{
      for(let i=0;i<data['data'].length;i++)
      if (((this.user._id) == (data['data'][i].cod_benef)))
{
  if (data['data'][i].etat==false){
      console.log(data['data']);
      this.rdv.push(data['data'][i]);
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

  }


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
 

  /*pay(amount: any) {    
 
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51Ij5m9IPiJHJ7ZlG94Xwog7FwWTBzW7P2b7Ikx3yyIoVYqD08gTA2owW2b0NGZPi538y1As1nRb8eJvX8wlVHPqQ004GAY8dTY',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token)
        alert('Paiement effectué avec succées!!');
      }
    });
 
    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: amount * 100
    });

 
  }

  loadStripe() {
     
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51Ij5m9IPiJHJ7ZlG94Xwogpk_test_51Ij5m9IPiJHJ7ZlG94Xwog7FwWTBzW7P2b7Ikx3yyIoVYqD08gTA2owW2b0NGZPi538y1As1nRb8eJvX8wlVHPqQ004GAY8dTY7FwWTBzW7P2b7Ikx3yyIoVYqD08gTA2owW2b0NGZPi538y1As1nRb8eJvX8wlVHPqQ004GAY8dTY',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token)
            alert('Payment Success!!');
          }
        });
      }
       
      window.document.body.appendChild(s);
    }
  }

 /* donate() {
    this.isGettingCheckout = true;
    this.stripe = this.loadStripe();
    const createCheckoutSession = this.dataservices.createCheckoutSession;
    createCheckoutSession({
      product_name: 'Glass of Whiskey',
      quantity: 1,
      unit_amount: this.donationAmount
    })
      .toPromise()
      // Make the id field from the Checkout Session creation API response available to this file, so you can provide it as argument here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      // If `redirectToCheckout` fails due to a browser or network error, display the localized error message to your customer using `error.message`.
      .then((sessionId: string) => this.stripe.redirectToCheckout({sessionId}))
      .catch((e) => console.log('Error Buying a glass of whiskey', e))
      .finally(() => this.isGettingCheckout = false);
  }*/

 /* createToken(): void {
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          console.log(result.token.id);
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }*/
 
   


}




