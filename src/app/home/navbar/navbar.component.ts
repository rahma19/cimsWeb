import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { DataService } from 'src/app/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input()user:any;
  role:any="";
test:boolean=true;
auth:boolean=false;
decon:boolean=false;
display=false;
unite:boolean=true;
societe:boolean=true;
isup:any=false;
  msg:String="";
  constructor(private http:HttpClient,private dataService:AuthService,private router:Router) {

   }

logout(){
   this.http.delete(environment.api+"/logout" +`/${this.user._id}`);
   this.router.navigate(['/loginAncien']);

}

goToProfile(param){
  console.log(param);
  this.dataService.check=param;
  this.router.navigate(['profile']);
}

verifprofil(){
  this.isup=true;
  //this.router.navigate(['/profile',this.user._id]);
}

affiche(){
  this.display = true;
}

  ngOnInit(): void {

   if(this.user!=null)
   {
    this.auth=true;
    this.test=false;
    this.role=this.dataService.role;
    if(this.role=="M"){
this.societe=false;
    }
/*this.msg=this.user.name;
     console.log(this.user);
     //this.test=false;
   //  this.auth=true;
     if (this.user.role=='US')
   {this.unite=false;}

   if (this.user.role=='S')
   {this.societe=false;}*/
   }

  }

}
