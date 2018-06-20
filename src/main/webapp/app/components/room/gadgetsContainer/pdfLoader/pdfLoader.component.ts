import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { PdfLoaderService } from './pdfLoader.service';
import { FileService } from '../../../../core/file.service';
import { pdfLoaderTemplate } from './pdfLoader.html';
import { NgUploaderOptions, UploadedFile } from 'ngx-uploader';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';


//b import { DownloadDirective } from '../../../../directives/download.directive';

import { AccessFile } from '../../../../models/types';


@Component({
  moduleId : module.id,
  selector: 'ovt-pdf-loader',
  template: pdfLoaderTemplate,
  styleUrls: ['pdfLoader.css'],
  providers: [PdfLoaderService]
})

export class PdfLoaderComponent implements OnInit, OnDestroy{
  
  @Input("ovt-address") address: string;
  @Input("ovt-valid-mime-types") validMimeTypes: string[] | {[key: string]: boolean}
  @Output("ovt-file") sharedFile: EventEmitter<string>; 
  @Output("ovt-new-file") newFile: EventEmitter<string>;

  private uploadFile: string;
  private options: NgUploaderOptions ;
  private sizeLimit: number; 
  private files : AccessFile [];
  

  private destroyed$: Subject<boolean> = new Subject<boolean>();
 

  constructor (private pdfLoader: PdfLoaderService){
    console.log("*** new PdfLoaderComponent");
     this.sizeLimit = this.pdfLoader.sizeLimit;
     
     this.sharedFile = new EventEmitter<string>();
     this.newFile = new EventEmitter<string>();

    // this.files = []; //*
  }
  
  ngOnInit(){
    console.log("PdfLoaderComponent.ngOnInit");
    console.log(`address: ${this.address}`);
    //this.file.init(this.address);
    this.pdfLoader.init(this.address);
    console.log(`uploadFileUrl: ${this.pdfLoader.uploadRoomFileUrl}`); 
    this.options = {
      url: this.pdfLoader.uploadRoomFileUrl
    }
    this.getExistingFiles(this.address);
    this.getIncomingFiles();
  }
  
  getExistingFiles(idRoom: string){
    /*
    this.file.getExistingFiles()
      .subscribe(files => { this.files = files.slice(0) });
    */
    console.log(`PdfLoaderComponent.getExistingFiles(${idRoom})`);
    this.pdfLoader.getRoomFiles(idRoom)
    .takeUntil(this.destroyed$)
    .subscribe((availableFiles: AccessFile[]): void => { 
      console.log('Available files:');
      console.log(availableFiles); 
      this.files = availableFiles;
      if (availableFiles && availableFiles.length > 0) {
        this.alertOfANewFile(`Available files of ${idRoom} room`);
      }  
    });
  }

  getIncomingFiles(){
    //this.file.getSharedFiles()
    this.pdfLoader.getIncomingFile()
    .takeUntil(this.destroyed$)
    .subscribe((file: AccessFile): void => {
      console.log('files:');
      console.log(this.files);
      this.files.push(file);
      let fileName = file.name;
      console.log(`shared file: ${fileName}`);
      console.log(`uploaded file: ${this.uploadFile}`);
      setTimeout(() => {
        if (this.uploadFile !== fileName) {
          this.alertOfANewFile(fileName);
        }
      }, 1500); // Wait for the execution of the handleUpload function
    },
    error => console.log(error),
    ()=>console.log('complete')
  );
  }

  beforeUpload(uploadingFile): void {
    if (uploadingFile.size > this.sizeLimit) {
      uploadingFile.setAbort();
      alert('El archivo no puede pesar más de 2 MB');
    }
  }
  
  handleUpload(data: UploadedFile): void {
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

   // console.log('downloadEvent');
   // sessionStorage.setItem('downloadEvent', 'true'); 
  }

  alertOfANewFile(fileName: string){
    console.log(`PdfLoader.alertOfANewFile(${fileName})`);
    this.newFile.emit(fileName);
  }
  
  getExtension(fileName: string): string{
      return fileName.split('.').pop();
  } 
  
  ngOnDestroy(){
    this.destroyed$.next(true);
    this.destroyed$.complete();
  //  this.file.destroy();
    this.pdfLoader.destroy();
  }
 
}