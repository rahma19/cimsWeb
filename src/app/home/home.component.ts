import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user = null;
  role: any = '';

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  fileInfos?: Observable<any>;
  url: any;
  thumbnail: any;

  uploadedFiles: Array<File>;
  imagePath: any;

  constructor(private http: HttpClient, private authService: AuthService, private dataService: DataService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.fileInfos = this.dataService.getFiles();

    this.user = this.authService.user;
    this.role = this.authService.role;
  }

  selectFile(event: any): void {

    this.selectedFiles = event.target.files;
    /*if(event.target.files){
        const reader = new FileReader();
       for(let i=0;i<event.target.files.length;i++){
        reader.readAsDataURL(event.target.files[i]);
       
        reader.onload=(event:any)=>{
          this.url=event.target.files[i];
  
        }
        }
      }*/
  }
  /* upload(): void {
     this.progress = 0;
   
     if (this.selectedFiles) {
       
       const file: File | null = this.selectedFiles.item(0);
   
       if (file) {
         this.currentFile = file;
   
         this.dataService.upload(this.currentFile).subscribe(
           (event: any) => {
             if (event.type === HttpEventType.UploadProgress) {
               this.progress = Math.round(100 * event.loaded / event.total);
             } else if (event instanceof HttpResponse) {
               this.message = event.body.message;
               this.fileInfos = this.dataService.getFiles();
             }
           },
           (err: any) => {
             console.log(err);
             this.progress = 0;
   
             if (err.error && err.error.message) {
               this.message = err.error.message;
             } else {
               this.message = 'Could not upload the file!';
             }
   
             this.currentFile = undefined;
           });
       }
   
       this.selectedFiles = undefined;
     }
   }*/






}
