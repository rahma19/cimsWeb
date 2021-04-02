import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-medecin',
  templateUrl: './list-medecin.component.html',
  styleUrls: ['./list-medecin.component.css']
})
export class ListMedecinComponent implements OnInit {
  selectedCities: string[] = [];

  checked: boolean = false;
  constructor() { }

  ngOnInit(): void {
 
  }

}
