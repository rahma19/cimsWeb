import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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

constructor(private authService:AuthService, private messageService: MessageService,private router:Router) { }

ngOnInit(): void {
  this.authService.getAllHopitals().subscribe(data=>{
    console.log(data['data']);
    this.hopitals=data['data'];
    console.log(this.hopitals);
  })
}
   Submit(form) {
    console.log(form.value);
if(form.value.sexe==undefined && form.value.email=="" && form.value.password==""){
  this.messageService.add({severity:'error', summary: ' Message', detail:'Veuillez saisir des données valides'});
}
    if(form.value.sexe=="M")
    {
      setTimeout(() => {
        this.authService.getCurrentUser(form,"auth/loginMed","M",form.value.cod_hop);
        console.log(this.authService.user);
            if(this.authService.user==undefined)
            this.messageService.add({severity:'error', summary: ' Message', detail:'Données incorrectes'});
          else
      this.router.navigate(['/Home']);

      }, 1000);
  }
  else if(form.value.sexe=="A")
  {
    setTimeout(() => {
      this.authService.getCurrentUser(form,"auth/loginPharmacien","A",form.value.cod_hop);
      if(this.authService.user==undefined)
      this.messageService.add({severity:'error', summary: ' Message', detail:'Données incorrectes'});
        else
    this.router.navigate(['/Home']);

    }, 1000);

}
  }
}
