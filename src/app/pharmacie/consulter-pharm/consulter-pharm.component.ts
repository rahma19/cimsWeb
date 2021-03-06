import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { AuthService } from 'src/app/auth.service';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-consulter-pharm',
  templateUrl: './consulter-pharm.component.html',
  styleUrls: ['./consulter-pharm.component.css']
})
export class ConsulterPharmComponent implements OnInit {
codhop:any="h11";
medics:any[]=[];
hopitals;
searchText: string;
user:any="";
searc:any;
hop:any="mahmoud el matri";
  constructor(private authService:AuthService,private dataService:DataService,private router:Router,private bnIdle:BnNgIdleService) { }

  ngOnInit(): void {
    this.bnIdle.startWatching(7200).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        this.router.navigate(['/login']);
        console.log('session expired');
      }
    });
    this.user=this.authService.user;
    this.authService.getAllHopitals().subscribe(data=>{
      console.log(data['data']);
      this.hopitals=data['data'];
      console.log(this.hopitals);
     // this.searchText=this.hopitals[0].nom_hop;
    });

    this.dataService.getAllMedicament(this.codhop).subscribe((data)=>{
        this.medics=data['data'];
        console.log(this.medics);
    });
    console.log(this.medics);
  }

  selecthop(codhop){
    this.dataService.getHopitalByCode(codhop).subscribe((data)=>{
      this.hop=data['data'][0].nom_hop;
      console.log(this.hop);

    });
  }
}
