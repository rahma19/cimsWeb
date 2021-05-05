import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { DataService } from 'src/app/data.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
user:any;
role:any;

  constructor(private http:HttpClient,private dataService:AuthService,private router:Router) {

  }
  ngOnInit(): void {
    this.user=this.dataService.user;
    this.role=this.dataService.role;
  }

  Submit(f){
    console.log(f.value);
    if(this.role=="P")
        this.dataService.update(f.value,this.user._id,"auth/modifPat").subscribe( (Response) => {
          console.log("success");
      },
        (error) =>{
          console.log("error");
    });
    else
    if(this.role=="M")
        this.dataService.update(f.value,this.user._id,"auth/modifMed").subscribe( (Response) => {
          console.log("success");
      },
        (error) =>{
          console.log("error");
    });
  }
}
