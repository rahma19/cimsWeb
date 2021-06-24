import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { CookieService } from 'ngx-cookie-service';
import { ConfirmationService, MessageService } from 'primeng/api';
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
fich:any[];
upp=false;
rdv:any;
edit=false;
pat=false;
hist=true;
cons=false; 
prof=false;
    constructor(private cookieService:CookieService,private messageService:MessageService,private bnIdle:BnNgIdleService,private confirmationService: ConfirmationService,private activateroute:ActivatedRoute,private http:HttpClient,private authService:AuthService,private dataService:DataService,private router:Router) {

       }
    ngOnInit(): void {
      this.bnIdle.startWatching(7200).subscribe((isTimedOut: boolean) => {
        if (isTimedOut) {
          this.router.navigate(['/login']);
          console.log('session expired');
        }
      });
     this.user=JSON.parse(this.cookieService.get('data'));
      console.log(this.user);
      this.dataService.getBenefMed(this.user._id).subscribe((data)=>{
        this.patients=data['data'];

          console.log(this.patients);
       // this.patients=data['data'];
      },
      (err)=>{
        console.log('errr');
      });
      //this.pat=this.user;
      this.role=this.authService.role;
      this.cols = [
        {field:'nom_pren_benef', header:'Nom du patient'},
        {field:'email',header:'email'},
       { field: 'tel_benef', header: 'Telephone' },
        ];


    }

    add(pat){
      this.rdv=pat;
     this.upp=true;
   }

   confirm2(pat) {
     this.showFiche(pat);
    this.confirmationService.confirm({
        message: 'Voulez vous supprimer cette fiche?',
        header: 'Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          //this.dataService.deleterest(id);
          //this.msgs = [{severity:'info', summary:'confirmé', detail:'Restaurant supprimé'}];
          this.dataService.deleteFiche(this.fiche._id).subscribe(
            (Response) => {
              this.dataService.getBenefMed(this.user._id).subscribe((data)=>{
                this.patients=data['data'];
                this.messageService.add({ severity: 'success', summary: ' Message', detail: 'La fiche de cet patient a été supprimer avec succées' });
              });
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
this.fich=res['data'];
this.fiche=this.fich[0];
console.log(this.fiche);
  },
    error => {
      console.log('Erreur');

    })
}

modif(f:any){
  console.log ("form.value", f)
   this.activateroute.queryParams.subscribe((params) => {
     this.http.patch(environment.api+"users/fiche"+`/${this.fiche._id}`, f).subscribe((res) => {
        console.log("Le patient a été modifié avec succès");
        this.dataService.getBenefMed(this.user._id).subscribe((data)=>{
          this.patients=data['data'];
          this.messageService.add({ severity: 'success', summary: ' Message', detail: 'Succés de modification' });
        });

      },
        error => {
          console.log('Erreur lors de la modification de la fiche');
//this.msgs = [{severity:'error', summary:'Erreur lors de la modification du restaurant', detail:''}];

        })
    });
  }

  historique(){
    this.test=false;
    this.edit=false;
    this.pat=false;
    this.hist=true;
    this.cons=false;

  }


renderList(){
  this.test=false;
  this.edit=false;
  this.pat=true;
  this.hist=false;
  this.cons=false;
  this.prof=false;
}


render(){
  this.pat=false;
  this.hist=false;
  this.edit=false;
  this.test=true;
  this.cons=false;

}
}
