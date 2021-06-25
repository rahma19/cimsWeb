import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user:any="";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  role:any="";
  codhop:any="";
test:any=true;
check:any="";

  constructor(private http: HttpClient,private router:Router,private cookieService:CookieService) {
    if(this.cookieService.get('data')!='')
    {
      this.user=JSON.parse(this.cookieService.get('data'));
      this.role=this.cookieService.get('role');
}
  }

  getAllRdvs(){
    return this.http.get<any[]>(environment.api+"rdv/rdvs");

  }

  getAllHopitals(): Observable<any[]> {
    return this.http.get<any[]>(environment.api+"rdv");
}

getAllMedecinsHop(code_hop): Observable<any[]> {
  return this.http.get<any[]>(environment.api+"users/medecins"+`/${code_hop}`);
}

logout(){
  this.cookieService.deleteAll();
  this.user="";
  this.role="";
  this.router.navigate(['/loginAncien']);
}

getCurrentUser(f:any,path:any,role:any,codhop:any){
  let addedData = JSON.stringify(f.value);
         console.log ("addedData", addedData);
    return this.http.post(environment.api+path, addedData,this.httpOptions).subscribe((res:any) => {
         // localStorage.setItem("token",res.token)
          if(res.user!=null){
            this.cookieService.set('data', JSON.stringify(res.user));
            this.cookieService.set('role',role);
            this.cookieService.set('codhop',codhop);
        //this.cookieService.set('password', res.user.password);
            console.log(this.cookieService.get('data'));
            this.user=JSON.parse(this.cookieService.get('data'));
            this.role=this.cookieService.get('role');
          this.codhop=this.cookieService.get('codhop');;
          console.log(this.user);
         // this.router.navigate(['/Home']);
          }
          else
          this.test=false;
        });
        }

getBenef(cod_benef,code_hop){
  return this.http.get<any[]>(environment.api+"auth/benef"+`/${cod_benef}`+`/${code_hop}`);
}

getRdvBenef(cod_benef,cod_hop):  Observable<any[]> {
  return this.http.get<any[]>(environment.api+"rdv/RdvBenef"+`/${cod_benef}`+`/${cod_hop}`);
}

update(f,id,path){
  console.log(f)
  return this.http.patch(environment.api+path+`/${id}`,f);
 }

 getNotfId(id:any){
  return this.http.get<any[]>(environment.api+"notifications/getnotificationbyuser"+`/${id}`);
}

}


