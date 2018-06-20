import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mimetype'
})
export class MimeTypePipe implements PipeTransform {

  constructor() {}
 
    public transform(resource: string): string {
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

            typeFile="application/pdf";    
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
}