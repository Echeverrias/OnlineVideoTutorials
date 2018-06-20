import { SafeResourceUrl } from '@angular/platform-browser';
/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { fileLinkTemplate } from './fileLink.html';

import {AccessFile } from './../../../models/types';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    moduleId: module.id,
    selector:'ovt-links-file',
    styleUrls: ['fileLink.css'],
    template: fileLinkTemplate
})

export class FileLinkComponent implements OnInit{

    @Input("access-file") file: AccessFile;
    @Input("valid-types") validTypes: string[] | {[key: string]: boolean};
    @Output("ovt-load-file") loadFile: EventEmitter<string>;
    
    validType: boolean;

    constructor(private sanitizer: DomSanitizer){
        this.loadFile = new EventEmitter<string>();
        
     }

    ngOnInit(){
        
        this.validType = this.validTypes?
            (this.validTypes instanceof Array?
                (this.validTypes.some(mt => mt === this.file.mimeType)? true : false):
                (this.validTypes[this.file.mimeType]?  this.validTypes[this.file.mimeType] : false)
            ): true;
    } 

    getExtension(fileName: string): string{
        return fileName.split('.').pop();
    } 

    onLoadFile(event: Event):boolean{
        console.log('FileLinkComponent.onLoadFile');
        console.log('file: ', this.file);
        console.log('validTypes: ', this.validTypes);
        console.log('validType: ', this.validType);
        if(this.validType){
            console.log(`FileLinkComponent.onLoadFile`, this.file);
            this.loadFile.emit(this.file.loadUrl);
        }    
        event.stopPropagation();
        event.preventDefault();
        return false;
    }
    
}