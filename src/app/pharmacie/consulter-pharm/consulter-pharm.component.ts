import { Component, OnInit } from '@angular/core';
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

  constructor(private authService:AuthService,private dataService:DataService) { }

  ngOnInit(): void {
    this.authService.getAllHopitals().subscribe(data=>{
      console.log(data['data']);
      this.hopitals=data['data'];
      console.log(this.hopitals);
    });

    this.dataService.getAllMedicament(this.codhop).subscribe((data)=>{
        this.medics=data['data'];
        console.log(this.medics);
    });
    console.log(this.medics);
  }

}
