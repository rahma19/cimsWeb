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
constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }
  Submit(form) {
    console.log(form.value);
    
     
    if(form.value.sexe=="M")
    {    this.authService.getCurrentUser(form,"auth/loginMed","M");
  }
  else if(form.value.sexe=="A")
  {    this.authService.getCurrentUser(form,"auth/loginPharmacien","A");
}
  }
}
