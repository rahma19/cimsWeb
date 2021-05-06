import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-liste-patient',
  templateUrl: './liste-patient.component.html',
  styleUrls: ['./liste-patient.component.css'],
  providers:[ConfirmationService],

})
export class ListePatientComponent implements OnInit {
  patients:any[]=[];
  selectedPat:any;
  expandedRows: any;
  isup=false;
  single:any;
  user:any;
  role:any;
  test=false;
  cols: any[];
patient:any;
fiche:any;
upp=false;
rdv:any;

    constructor(private confirmationService: ConfirmationService,private activateroute:ActivatedRoute,private http:HttpClient,private authService:AuthService,private dataService:DataService,private router:Router) {

    }
    ngOnInit(): void {
      this.user=this.authService.user;
      this.role=this.authService.role;
      this.cols = [
        {field:'nom_pren_benef', header:'Nom du patient'},
        {field:'email',header:'email'},
       { field: 'tel_benef', header: 'Telephone' },
        ];

        this.dataService.getRdvMed(this.user._id).subscribe((res)=>{
          this.patients=res['data'];
        },
        (err)=>{
          console.log('errr');
        });
    }

    add(pat){
      this.rdv=pat;
     this.upp=true;
   }

   confirm2(id) {
    this.confirmationService.confirm({
        message: 'Voulez vous le supprimer?',
        header: 'Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          //this.dataService.deleterest(id);
          //this.msgs = [{severity:'info', summary:'confirmé', detail:'Restaurant supprimé'}];
          this.dataService.deleteFiche(id).subscribe(
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
}

select(pat:any){
  this.showFiche(pat);
 this.isup=true;
}

showFiche(pat){
  this.dataService.getFichePatient(pat.cod_med,pat.cod_benef).subscribe((res) => {
    console.log(res['data']);
this.fiche=res['data'];
console.log(this.fiche);
  },
    error => {
      console.log('Erreur');

    })
}

modif(f:any){
  console.log ("form.value", f)
   //this.dataService.restlist=Object.assign({},x);
   this.activateroute.queryParams.subscribe((params) => {
    var x:any[]=JSON.parse(JSON.stringify(f));
    //console.log(x);
      //this.dataService.updaterest(x);
      //console.log(params);
            this.http.patch(environment.api+"users/fiche"+`/${this.fiche._id}`, f).subscribe((res) => {
        console.log("Le patient a été modifié avec succès");
       // this.msgs = [{severity:'info', summary:'Succés de modification', detail:''}];

      },
        error => {
          console.log('Erreur lors de la modification de la fiche');
//this.msgs = [{severity:'error', summary:'Erreur lors de la modification du restaurant', detail:''}];

        })
    });
  
 
  }
}
