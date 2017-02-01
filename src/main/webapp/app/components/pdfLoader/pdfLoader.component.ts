import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FileService } from '../../services/file.service';
import { pdfLoaderTemplate } from './pdfLoader.html';
import { NgUploaderOptions } from 'ngx-uploader';

import { File } from '../../models/types';


@Component({
  moduleId : module.id,
  selector: 'ovt-pdfLoader',
  template: pdfLoaderTemplate,
  styleUrls: ['pdfLoader.css'],
  providers: [FileService],
})

export class PdfLoaderComponent implements OnInit, OnDestroy{
  
  @Input("ovt-address") address: string;
  @Output("ovt-file") sharedFile: EventEmitter<string>; 
  @Output("ovt-new-file") newFile: EventEmitter<string>;

  private uploadFile: string;
  private options: NgUploaderOptions ;
  private sizeLimit: number; 
  private files : File [];

  constructor (private file: FileService){
    console.log("*** new PdfLoaderComponent");
     this.sizeLimit = 2000000;
     this.sharedFile = new EventEmitter<string>();
     this.newFile = new EventEmitter<string>();
  }
  
  ngOnInit(){
    this.file.init(this.address);
    console.log(`uploadFileUrl: ${this.file.uploadFileUrl}`); 
    this.options = {
      url: this.file.uploadFileUrl
    }
    this.file.getFiles().subscribe((files: File[]): void => {
      if (!this.files) {
        this.files = files;
       }
      let fileName = this.files[this.files.length - 1].name;
      console.log(`shared file: ${fileName}`);
      console.log(`uploaded file: ${this.uploadFile}`);
      setTimeout(() => {
        if (this.uploadFile !== fileName) {
          this.alertOfANewFile(fileName);
        }
      }, 1500); // Wait for the execution of the handleUpload function
    });
  }

  beforeUpload(uploadingFile): void {
    if (uploadingFile.size > this.sizeLimit) {
      uploadingFile.setAbort();
      alert('El archivo no puede pesar más de 2 MB');
    }
  }
  
  handleUpload(data): void {
      console.log("handleUpload");
      console.log("handleUpload - data:", data);
        console.log("handleUpload - data.status:", data.status);
        console.log("handleUpload - data.status === 200?:", data.status === 200);
        if (data && data.status === 200) {
          this.uploadFile = data.originalName;
          console.log(`uploaded file: ${this.uploadFile}`);
        }
    }

  onSelectedFile(file: string){
    console.log("selected file");
    if (this.getExtension(file) === 'pdf'){
      this.sharedFile.emit(file);
    }  
     // this.file.downloadFile(file);
  }

  onDownload(){
    // The download event trigger the beforeunload event

    console.log('downloadEvent');
    sessionStorage.setItem('downloadEvent', 'true'); 
  }

  alertOfANewFile(fileName: string){
    console.log(`PdfLoader.alertOfANewFile(${fileName})`);
      this.newFile.emit(fileName);
  }
  
  getExtension(fileName: string): string{
      return fileName.split('.').pop();
  } 
  
  ngOnDestroy(){
    this.file.destroy();
  }
 
}