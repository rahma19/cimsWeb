import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-ajouter-fiche',
  templateUrl: './ajouter-fiche.component.html',
  styleUrls: ['./ajouter-fiche.component.css']
})
export class AjouterFicheComponent implements OnInit {
  @Input() rdv:any;
maladie:any="";
rapport:any="";
display:any;
medicament:any="";

  constructor(private router:Router,private bnIdle:BnNgIdleService,private dataService:DataService) { }

  ngOnInit(): void {
    this.bnIdle.startWatching(7200).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        this.router.navigate(['/login']);
        console.log('session expired');
      }
    });
    this.display = true;
    console.log(this.rdv);
  }
  closeModal() {
    this.display=false;
  }
  onEnvoyer(f){
    console.log(f.value);
    this.dataService.ajouterFichePatient(f).subscribe((response)=>{
      console.log("success")
    },(error)=>
    {
      console.log("errr");
    });
  }
}
