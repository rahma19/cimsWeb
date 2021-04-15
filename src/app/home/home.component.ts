import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
user=null;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
this.user=this.authService.user;
  }

}
