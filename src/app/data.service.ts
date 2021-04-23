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
}