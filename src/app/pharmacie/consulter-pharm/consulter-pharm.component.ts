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

// list of categories
categories: any[] = [
{id: 1, categoryName:"Schools"},
{id: 2, categoryName:"Colleges"},
{id: 3, categoryName:"Doctors"},
{id: 4, categoryName:"Hospitals"},
{id: 5, categoryName:"Advocates"}
]

customerData = [
  {"name": 'Anil kumar', "Age": 34, "blog" :'https://code-view.com'},
  {"name": 'Sunil Kumar Singh', "Age": 28, "blog" :'https://code-sample.xyz'},
  {"name": 'Sushil Singh', "Age": 24, "blog" :'https://code-sample.com'},
  {"name": 'Aradhya Singh', "Age": 5, "blog" :'https://code-sample.com'},
  {"name": 'Reena Singh', "Age": 28, "blog" :'https://code-sample.com'},
  {"name": 'Alok Singh', "Age": 35, "blog" :'https://code-sample.com'},
  {"name": 'Dilip Singh', "Age": 34, "blog" :'https://code-sample.com'}];

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
