import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserFile } from '../../models/types';

@Pipe({
    name: 'userImageSanitizer',
})
export class UserImageSanitizerPipe implements PipeTransform{
    
    constructor(private sanitizer: DomSanitizer){};

    transform(userFile: UserFile){
        console.log("userFileSanitizer pipe working");
        if (userFile){
            return this.sanitizer.bypassSecurityTrustResourceUrl(`data:${userFile.mimeType}; base64,${userFile.content}`);
        }
        else{
            return '';
        }    
    }
}