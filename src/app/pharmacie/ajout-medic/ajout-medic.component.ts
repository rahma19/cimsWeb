import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-ajout-medic',
  templateUrl: './ajout-medic.component.html',
  styleUrls: ['./ajout-medic.component.css']
})
export class AjoutMedicComponent implements OnInit {
  @Input() codhop:any;
   @Input() upp:any;
img:any="";
nom:any="";
qtte:any="";
desc:any="";
display:any;
medicament:any="";

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.display = true;
    console.log(this.codhop);
  }
  closeModal() {
    this.display=false;
    this.upp=false;
  }
  onEnvoyer(f){
    console.log(f.value);
    this.dataService.ajouterMedicament(f).subscribe((response)=>{
      console.log("success");
      this.closeModal();
    },(error)=>
    {
      console.log("errr");
    });
  }
}
