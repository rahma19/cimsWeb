import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
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
