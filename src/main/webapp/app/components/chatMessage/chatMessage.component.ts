/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
 
import { Component, Input } from '@angular/core';

import { IMessage } from './../../models/types';

import { chatMessageTemplate } from './chatMessage.html'

@Component({
    moduleId: module.id,
    selector: 'ovt-chatMessage',
    styleUrls: ["chatMessage.css"],
    template: chatMessageTemplate
})

export class ChatMessageComponent implements IMessage{

    @Input() sender: string;
    @Input() message: string;
    @Input() date: string;
    @Input() color: string;
   
    constructor() {

        console.log("");
        console.log(`% Message constructor ${new Date().toLocaleTimeString()}`);
       
    }    

}