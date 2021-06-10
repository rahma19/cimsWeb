import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-imprimer-recu',
  templateUrl: './imprimer-recu.component.html',
  styleUrls: ['./imprimer-recu.component.css']
})
export class ImprimerRecuComponent implements OnInit {
  display: boolean;

  @Input() rdv:any;

  constructor(private bnIdle:BnNgIdleService,private activateroute:ActivatedRoute,private restaurantService:DataService,private http:HttpClient,private router:Router) {

  }
  closeModal() {
   this.display=false;
 }
 ngOnInit() {
  this.bnIdle.startWatching(7200).subscribe((isTimedOut: boolean) => {
    if (isTimedOut) {
      this.router.navigate(['/login']);
      console.log('session expired');
    }
  });
   this.display = true;
     console.log(this.rdv);
 }

}
