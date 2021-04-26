import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  constructor(private http: HttpClient,private router:Router) { }


getMedecinById(id): Observable<any[]> {
  return this.http.get<any[]>(environment.api+"users/medecin"+`/${id}`);
}

getHeurMedecin(code_med:any,date:any): Observable<any[]>{
  return this.http.get<any[]>(environment.api+"rdv/heurs/"+`/${code_med}`+`/${date}`);
}

ajouterHeurMed(f:any){
  let addedData = JSON.stringify(f.value);
  console.log ("addedData", addedData);
return this.http.post(environment.api+"rdv/heurs", addedData,this.httpOptions);
 }

 fixerRdv(f:any){
  let addedData = JSON.stringify(f.value);
  console.log ("addedData", addedData);
return this.http.post(environment.api+"rdv/rdvs", addedData,this.httpOptions);
 }

 getSoinBenef(cod_benef:any): Observable<any> {
    return this.http.get<any>(environment.api+"rdv/soin"+`/${cod_benef}`);
  }

getRegime(reg): Observable<any>{
  return this.http.get<any>(environment.api+"users/regimes"+`/${reg}`);
  
}
 getAllRegime(): Observable<any[]>{
  return this.http.get<any[]>(environment.api+"users/regimes");
 }

 getHopitalByCode(cod_hop:any): Observable<any>{
  return this.http.get<any[]>(environment.api+"users/hopital/"+`/${cod_hop}`);
 }

 updateSoinBenef(f,id){
  return this.http.patch(environment.api+"rdv/soins"+`/${id}`,f );
 }

 ajoutSoin(f){
  let addedData = JSON.stringify(f.value);
  console.log ("addedData", addedData);
return this.http.post(environment.api+"rdv/soins", addedData,this.httpOptions);
 }
}