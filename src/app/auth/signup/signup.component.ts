import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import {Validators,FormControl,FormGroup,FormBuilder, NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth.service';
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [MessageService]
})
export class SignupComponent implements OnInit {

  name?:any="";
  prenom?:any="";
  password?:any="";
  email?:any="";
  specialite?:any="";
  service?:any="";
  codhop?:any="";
  status?:any="pending";
  nom_pren_benef:any="";
  pren_benef:any="";
  pren_pere_benef:any="";
  pren_mere_benef:any="";
  pass:any="";
  jour:any="";
  capacite:any="";
  psdo:any="";
  pas:any="";
  psseudo:any="";
  confemail:any=""
  date_nai_benef:any="";
  sexe_benef:any="";
  tel_benef:any="";
role:any="F";
test:boolean=true;
code=Math.floor(Math.random() * 999999) + 100000;
  enabled?:boolean=false;
  medecins:any[];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  jours: any[] = [
    {value: 'S', viewValue: 'Specialiste'},
    {value: 'P', viewValue: 'Professeur'},
    {value: 'G', viewValue: 'Generaliste'},
  ];

  hopitals:any[];
  Patient: FormGroup;
  img: any;

    constructor(private formBuilder : FormBuilder,private dataService: AuthService,private router:Router,private http:HttpClient, private messageService: MessageService) {
      this.Patient = this.formBuilder.group({
        img: [null],
        cod_benef: "",
        nom_pren_benef: "",
        pren_benef: "",
        sexe_benef: "",
        date_nai_benef:"",
        cod_hop:"",
        email:"",
        tel_benef:"",
        code:"",
    });
     }

    ngOnInit() {
      this.dataService.getAllHopitals().subscribe(data=>{
        console.log(data['data']);
        this.hopitals=data['data'];
        console.log(this.hopitals);
      })
    }

    envoiCode(){
      this.code=Math.floor(Math.random() * 999999) + 100000;
      console.log(this.code);
      this.notify('est le code de confirmation de votre nouveau compte sur CIMS ',this.code);
    }

    notify(subject,code){
      this.test=false;
      let ch=this.psseudo;

      let object={"to":ch,"sub":"Confirmation","text":code+subject};
      return this.http.post(environment.api+"users/mailing", object).subscribe((res:any) => {
        console.log("success");
        console.log(code);

        this.messageService.add({severity:'success', summary: 'Success', detail: 'email envoyée avec succées'});
       },
         error => {
          this.messageService.add({severity:'error', summary: ' Message', detail:'Erreur'});
          console.log("error");
      });

    }

    onFileSelect(event) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.Patient.get('img').setValue(file);
  
      }
    }
    onUpload(event) {
      this.img.push(event);
             console.log(event);
  
    }


   SubmitPat(form){
     console.log(this.code);
     console.log(form.value.code);
    if(this.code==this.Patient.get('code').value){
      let codbenef = this.Patient.controls['cod_benef'].value.name;
      codbenef=Math.floor(Math.random() * 999999) + 100000+this.Patient.controls['nom_pren_benef'].value.name;
    console.log ("form.value", form.value)
    let month=this.Patient.controls['date_nai_benef'].value.getMonth();
    let date =this.Patient.controls['date_nai_benef'].value.getDate()+"-"+month+"-"+this.Patient.controls['date_nai_benef'].value.getFullYear();
    this.Patient.controls['date_nai_benef'].value.name=date;
    let addedData = JSON.stringify(form.value);
    console.log ("addedData", addedData);
    const formData = new FormData();
    formData.append('img',this.Patient.get('img').value);
    formData.append('cod_hop', this.codhop);
    formData.append('nom_pren_benef', this.Patient.get('nom_pren_benef').value);
    formData.append('pren_benef', this.Patient.get('pren_benef').value);
    formData.append('sexe_benef', this.Patient.get('sexe_benef').value);
    formData.append('date_nai_benef', this.Patient.get('date_nai_benef').value);
    formData.append('email', this.Patient.get('email').value);
    formData.append('tel_benef', this.Patient.get('tel_benef').value);
    formData.append('code', this.Patient.get('code').value);
  this.http.post(environment.api+"auth/signupPatientanc", formData).subscribe((res) => {
    this.messageService.add({severity:'success', summary: 'Message', detail:'Succes'});
    //this.notify("voici votre index",res['user']._id);
    this.notify("voici votre index",form.value.cod_benef);
    this.router.navigate(['/loginAncien']);
    },
      error => {
      this.messageService.add({severity:'error', summary: ' Message', detail:'Erreur'});
      });
   } else {
    this.messageService.add({severity:'error', summary: ' Message', detail:'Erreur'});
     console.log("erreruurr");
   }}

}
