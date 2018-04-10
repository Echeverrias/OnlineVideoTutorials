/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */

import { Component, Input, Output } from '@angular/core';

import { fileLinkTemplate } from './fileLink.html';

import {AccessFile} from './../../../models/types';

@Component({
    moduleId: module.id,
    selector:'ovt-file-link',
    styleUrls: ['fileLink.css'],
    template: fileLinkTemplate
})

export class FileLinkComponent{

    @Input("ovt-file") file: AccessFile;

    getExtension(fileName: string): string{
        return fileName.split('.').pop();
    } 
    
}