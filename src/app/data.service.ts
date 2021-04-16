import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient,private router:Router) { }


getMedecinById(id): Observable<any[]> {
  return this.http.get<any[]>(environment.api+"users/medecin"+`/${id}`);
}
}