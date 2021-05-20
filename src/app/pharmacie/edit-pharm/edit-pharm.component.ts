import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/auth.service';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-edit-pharm',
  templateUrl: './edit-pharm.component.html',
  styleUrls: ['./edit-pharm.component.css']
})
export class EditPharmComponent implements OnInit {
 // @Input() codhop:any;
medics:any[]=[];
codhop:any="";
clonedProducts: { [s: string]: any; } = {};
user:any="";
upp:any=false;
  constructor(private dataService: DataService , private confirmationService:ConfirmationService,private authService:AuthService) { }

  ngOnInit(): void {
    this.user=this.authService.user;
    this.codhop=this.authService.user.cod_hop;
    console.log(this.codhop);
    this.dataService.getAllMedicament(this.codhop).subscribe(data=>{
      console.log(data['data']);
      this.medics=data['data'];
      console.log(this.medics);
    })
  }

  onRowEditInit(product: any) {
    this.clonedProducts[product.id] = {...product};
    console.log(product);
 }

 onRowEditSave(f: any) {
    console.log(f);
    this.dataService.updateMedicament(f,f._id).subscribe((data)=>{
      console.log("success");
    },
    (erreur)=>{
      console.log("errrr");
    });
  //  this.messageService.add({severity:'success', summary: ' Message', detail:'tache ajouté'});
 }

 onRowEditCancel(product: any, index: number) {
     this.medics[index] = this.clonedProducts[product.id];
   //  this.messageService.add({severity:'info', summary: ' Message', detail:'Annulé'});
 }

add(){
this.upp=true;
}

 onRowDrop(F:any){
  this.confirmationService.confirm({
    message: 'Voulez vous supprimer ce medicament?',
    header: 'Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
      //this.dataService.deleterest(id);
      //this.msgs = [{severity:'info', summary:'confirmé', detail:'Restaurant supprimé'}];
      this.dataService.deleteMedicament(F._id).subscribe(
        (Response) => {
          console.log("success");
        },
        (error) => {
          console.log("error");
       })
      //  this.msgs = [{severity:'info', summary:'confirmé', detail:'Restaurant supprimé'}];
    },
    reject: () => {
       // this.msgs = [{severity:'info', summary:'Annulation', detail:''}];
    }
});
   //this.messageService.add({severity:'success', summary: ' Message', detail:'Vous avez supprimé cette tache'});

 }
}
