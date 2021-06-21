import { DatePipe } from '@angular/common';
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
notifs:any[]=[];
late:any[]=[];
new:any[]=[];
  msg:String="";
  constructor(private http:HttpClient,private dataService:AuthService,private router:Router,private datePipe:DatePipe) {

   }

logout(){
   this.http.delete(environment.api+"logout" +`/${this.user._id}`);
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
