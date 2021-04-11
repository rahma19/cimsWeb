import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user:any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  
  constructor(private http: HttpClient,private router:Router) { }

  getAllRdvs(): Observable<any[]> {
    return this.http.get<any[]>(environment.api+"rdv/rdvs");
  }

  getAllHopitals(): Observable<any[]> {
    return this.http.get<any[]>(environment.api+"rdv");
}
getAllMedecinsHop(cod_hop): Observable<any[]> {
  return this.http.get<any[]>(environment.api+"users/medecins"+`/${cod_hop}`);
}


getMedecinById(id): Observable<any[]> {
  return this.http.get<any[]>(environment.api+"users/medecin"+`/${id}`);
}

getCurrentUser(f:any,path:any){
  let addedData = JSON.stringify(f.value);
         console.log ("addedData", addedData);
    return this.http.post(environment.api+path, addedData,this.httpOptions).subscribe((res:any) => {
          localStorage.setItem("token",res.token)
          this.user=res.user;
          console.log(this.user);
          this.router.navigate(['/ListeHopital']);
        });
        }

     
}
