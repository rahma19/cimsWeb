import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-rdv',
  templateUrl: './edit-rdv.component.html',
  styleUrls: ['./edit-rdv.component.css']
})
export class EditRdvComponent implements OnInit {
  display: boolean;

  @Input() rv:any;
  @Output() onChange= new EventEmitter<number>();

rdv:any='';
  constructor(private dataService:DataService, private http:HttpClient) {

  }
  closeModal() {
   this.display=false;
 }

 onEnvoyer(f) {
  this.onChange.emit(f);
 this.closeModal();
 console.log(f.value);
}

 ngOnInit() {
   this.display = true;
     console.log(this.rv);
     
 }
}
