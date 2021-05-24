import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
email:any="";
password:any="";
sexe:any;
hopitals:any[]=[];
selDmn:any;

constructor(private authService:AuthService) { }

ngOnInit(): void {
  this.authService.getAllHopitals().subscribe(data=>{
    console.log(data['data']);
    this.hopitals=data['data'];
    console.log(this.hopitals);
  })
}
  Submit(form) {
    console.log(form.value);


    if(form.value.sexe=="M")
    {    this.authService.getCurrentUser(form,"auth/loginMed","M",form.value.cod_hop);
  }
  else if(form.value.sexe=="A")
  {    this.authService.getCurrentUser(form,"auth/loginPharmacien","A",form.value.cod_hop);
}
  }
}
