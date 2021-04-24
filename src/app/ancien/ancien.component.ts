import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-ancien',
  templateUrl: './ancien.component.html',
  styleUrls: ['./ancien.component.css'],
  providers: [MessageService]
})
export class AncienComponent implements OnInit {
hopitals:any[]=[];
email:any;
codhop:any;
confemail:any;
selDmn:any;
sexe:any;
cod_benef:any;
code=Math.floor(Math.random() * 999999) + 100000;
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}
  test: boolean=true;
  constructor(private authService: AuthService,private router:Router,private http:HttpClient, private messageService: MessageService) { }

  ngOnInit(): void {
    this.authService.getAllHopitals().subscribe(data=>{
      console.log(data['data']);
      this.hopitals=data['data'];
      console.log(this.hopitals);
    })
  }

  notify(){
    this.test=false;
    let object={"to":this.email,"sub":"Confirmation","text":this.code+" est le code de confirmation de votre nouveau compte sur CIMS "};
    return this.http.post(environment.api+"users/mailing", object).subscribe((res:any) => {
      console.log("success");
      console.log(this.code);
      this.messageService.add({severity:'success', summary: 'Success', detail: 'email envoyée avec succées'});
     },
       error => {
        this.messageService.add({severity:'error', summary: ' Message', detail:'Erreur'});
        console.log("error");
    })
  }

  
  Submit(form){
    console.log(this.code);
    console.log(form.value.code);
  
   if(this.code==form.value.code){
   console.log ("form.value", form.value)
   let addedData = JSON.stringify(form.value);
   console.log ("addedData", addedData);
    this.authService.getCurrentUser(form,"auth/loginPatientanc","P");
   
 /*this.http.post(environment.api+"auth/loginPatientanc", addedData,this.httpOptions).subscribe((res) => {
   this.messageService.add({severity:'success', summary: 'Message', detail:'Succes'}); 
   this.router.navigate(['/Home']);
   },
     error => {
     this.messageService.add({severity:'error', summary: ' Message', detail:'Erreur'});
     });*/
     } else {
   this.messageService.add({severity:'error', summary: ' Message', detail:'Erreur'});
    console.log("erreruurr"); 
  }}
   }


