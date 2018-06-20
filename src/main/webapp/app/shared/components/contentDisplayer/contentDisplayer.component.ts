import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { contentDisplayerTemplate } from './contentDisplayer.html';


@Component({
    moduleId: module.id,
    selector:'ovt-content-displayer',
    styleUrls: ['contentDisplayer.css'],
    template: contentDisplayerTemplate
})

export class ContentDisplayerComponent{

    @Input("ovt-file-url") fileUrl: string;
    @Output("ovt-close") eeClose: EventEmitter<boolean>;
    
    private showCloseButton: boolean;
    private typeFile: string; 
    private  static _validMimeTypes: string[] = [
        "application/pdf", "text/plain", "image/jpeg"
    ]
    mimeType: string;
    validMimeType: boolean;
    //private saveFileUrl: SafeResourceUrl
    
    constructor(private sanitizer: DomSanitizer){
        console.log('ContentDisplayerComponent.constructor');
        this.eeClose = new EventEmitter<boolean>();
        console.log('fileUrl: ', this.fileUrl);
    }

    ngOnInit(){
        console.log('ContentDisplayerComponent.onInit()');
        console.log('fileUrl: ', this.fileUrl);
     //   console.log('type: ', this.type);
      //  this.typeFile = this.type;
        this.mimeType = this.getMimeType(this.fileUrl);
        this.validMimeType = ContentDisplayerComponent._validMimeTypes.some(mt => mt === this.mimeType);
        this.showCloseButton = false;
        
       // this.saveFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileUrl);
        //this.typeFile=this.getTypeFile(this.fileUrl);
    }
/*
    private getTypeFile (fileUrl:string): string{
        console.log("ContentDisplayerComponent.getTypeFile(fileUrl)", fileUrl);
        let extension: string = "";
        let typeFile: string;
        switch(extension){
            case "pdf":
            typeFile="application/pdf";
                break;
            default:
            typeFile="application/pdf";    
        }    
        console.log(`return ${typeFile}`);
        return typeFile;
     }
*/

public static getValidMimeTypes(): string []{
    return ContentDisplayerComponent._validMimeTypes.slice();
}

private getMimeType(resource: string): string {
    let extension = this.getExtension(resource);
    let typeFile: string;

    switch(extension){
        case "pdf":
            typeFile="application/pdf";
            break;
        case "txt":
            typeFile="text/plain";
            break;
        case "doc":
            typeFile="application/msword";
            break;
        case "odt":
            typeFile="application/vnd.oasis.opendocument.text";
            break;
        case "jpeg":
        case "jpg":
            typeFile="image/jpeg"
            break;
        case "ppt":
            typeFile="application/vnd.ms-powerpoint";
            break;
        default:
        typeFile="";    
    }    
    console.log(`MimeTypePipe(${resource}):${typeFile}`);
    return typeFile;
 
}

private getExtension(fileName: string): string{
    try{
        return fileName.split('.').pop();
    }
    catch(e){
        return '';
    }    
} 


    onLoadFile(fileUrl: string){
        console.log(`RoomComponent.onLoadFile(${fileUrl})`); 
      
    }
  
    onMouseOverFile(){
          console.log("onMouseOverFile");
          this.showCloseButton = true;
    }
      
    onCloseFile(event: Event): boolean{
       // this.saveFileUrl = undefined;
        this.fileUrl = undefined;
        this.showCloseButton = false;
        this.eeClose.emit(true);
        event.stopPropagation();
        return false;
      }

     
    
}