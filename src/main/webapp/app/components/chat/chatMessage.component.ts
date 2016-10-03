/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
 
import { Component, Input } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';

import { IMessage } from './chatMessage';

import { chatMessageTemplate } from './chatMessage.html'

@Component({
    moduleId: module.id,
    selector: 'ovt-chatMessage',
    directives: [CORE_DIRECTIVES],
    styleUrls: ["../../../assets/styles/main.css", "chatMessage.css"],
    template: chatMessageTemplate
})

export class ChatMessageComponent implements IMessage{

    @Input() sender: string;
    @Input() message: string;
    @Input() date: string;
   
    constructor() {

        console.log("");
        console.log(`% Message constructor ${new Date().toLocaleTimeString()}`);
    }    

}