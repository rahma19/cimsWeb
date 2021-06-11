import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';

@Component({
  selector: 'app-modif-fiche',
  templateUrl: './modif-fiche.component.html',
  styleUrls: ['./modif-fiche.component.css']
})
export class ModifFicheComponent implements OnInit {
  display: boolean;
    @Input() fiche:any;
    @Output() onChange= new EventEmitter<number>();


    retour(){
      //this.router.navigate(['/']);
      }

      onEnvoyer(f) {
       this.onChange.emit(f);
      this.closeModal();
      console.log(f.value);
    }

    constructor(private bnIdle:BnNgIdleService,private activateroute:ActivatedRoute,private http:HttpClient,private router:Router) {

     }
     closeModal() {
      this.display=false;
    }
    ngOnInit() {
      this.bnIdle.startWatching(7200).subscribe((isTimedOut: boolean) => {
        if (isTimedOut) {
          this.router.navigate(['/login']);
          console.log('session expired');
        }
      });
      this.display = true;

    }
}
