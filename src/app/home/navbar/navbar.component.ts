import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth.service';
import { DataService } from 'src/app/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user:any="";
  role:any="";
test:boolean=true;
auth:boolean=false;
decon:boolean=false;
display=false;
unite:boolean=true;
societe:boolean=true;
isup:any=false;
notifs:any[]=[];
late:any[]=[];
new:any[]=[];
  msg:String="";
  constructor(private cookieService:CookieService,private dataService:AuthService,private router:Router,private datePipe:DatePipe) {
   // this.user=JSON.parse(this.cookieService.get('data'));

   }

logout(){
 this.dataService.logout();
 this.user="";
 this.role="";
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
    this.isup=false;
   this.user=this.dataService.user;
   console.log(this.user);
 if(this.user!="")
   {console.log("gn");
    this.auth=true;
    this.test=false;
    this.role=this.dataService.role;
    if(this.role=="M"){
this.societe=false;
    }
   }
   this.dataService.getNotfId(this.user._id).subscribe((data)=>{
    console.log(data['notification']);
    this.notifs=data['notification'][0]['notification_list'];
    console.log(this.notifs);

    for(let i=0;i<this.notifs.length;i++){
      let date=new Date();
      var ddMMyyyy = this.datePipe.transform(date, "yyyy-MM-dd");
      var dt = this.datePipe.transform(this.notifs[i].date, "yyyy-MM-dd");
      var comp=ddMMyyyy.localeCompare(dt);

      if(comp>=1){
          this.new.push(this.notifs[i]);
          this.new.reverse();

      }
      else{
        this.late.push(this.notifs[i]);
        this.late.reverse();

      }
    }
  });
  }

}
