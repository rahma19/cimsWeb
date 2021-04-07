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

  getAllHopitals(): Observable<any[]> {
    return this.http.get<any[]>(environment.api+"rdv");
}

getAllMedecinsHop(code_hop): Observable<any[]> {
  return this.http.get<any[]>(environment.api+"users/medecins"+`/${code_hop}`);
}

getCurrentUser(f:any){
  let addedData = JSON.stringify(f.value);
         console.log ("addedData", addedData);
    return this.http.post(environment.api+"auth/loginPatient", addedData,this.httpOptions).subscribe((res:any) => {
          localStorage.setItem("token",res.token)
          this.user=res.user;
          console.log(this.user);
          this.router.navigate(['/home']);
        });
        }
}
