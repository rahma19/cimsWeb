import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-rdv',
  templateUrl: './detail-rdv.component.html',
  styleUrls: ['./detail-rdv.component.css']
})
export class DetailRdvComponent implements OnInit {
@Input() rv:any;
display: boolean;

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.display = true;
  }
envoyer(){
  this.router.navigate(['editRdv',this.rv._id]);

}

closeModal() {
  this.display=false;
}
}
