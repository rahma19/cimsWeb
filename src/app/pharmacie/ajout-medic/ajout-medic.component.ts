import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { DataService } from 'src/app/data.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-ajout-medic',
  templateUrl: './ajout-medic.component.html',
  styleUrls: ['./ajout-medic.component.css']
})
export class AjoutMedicComponent implements OnInit {
   @Input() upp:any;
img:any="";
nom:any="";
qtte:any="";
desc:any="";
display:any;
medicament:any="";
codhop:any;
  Medic: FormGroup;
  img_medic: any;
  constructor(private formBuilder : FormBuilder,private dataService:DataService,private authService:AuthService, private http: HttpClient) {
    this.Medic = this.formBuilder.group({
      img_medic: [null],
      cod_hop: "",
       nom_medic: "",
      desc_medic: "",
      quantite: "",

  });}

  ngOnInit(): void {


    this.codhop=this.authService.codhop;
    this.display = true;
    console.log(this.codhop);
  }
  closeModal() {
    this.display=false;
    this.upp=false;
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.Medic.get('img_medic').setValue(file);

    }
  }
  onUpload(event) {
    this.img_medic.push(event);
           console.log(event);

  }
  onEnvoyer(f){
    const formData = new FormData();
    formData.append('img_medic',this.Medic.get('img_medic').value);
    formData.append('cod_hop', this.codhop);
    formData.append('nom_medic', this.Medic.get('nom_medic').value);
    formData.append('desc_medic', this.Medic.get('desc_medic').value);
    formData.append('quantite', this.Medic.get('quantite').value);
    return this.http.post(environment.api+"users/medics", formData).subscribe(
      (Response) => {
           // this.msgs = [{severity:'info', summary:'Succés de modification', detail:''}];

        console.log(formData);
        console.log("success");
      },
        (error) =>{
             //   this.msgs = [{severity:'error', summary:'Erreur lors de la modification du restaurant', detail:''}];

      console.log("error");
    });

  }
}
