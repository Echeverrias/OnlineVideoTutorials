/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */

import { Component, ViewChild, ElementRef, AfterViewInit, Input, OnInit } from '@angular/core';

import { ParticipantService } from '../../services/participant.service';

import { participantComponentTemplate } from './participant.html'




@Component({
    moduleId: module.id,
    selector: 'ovt-participant',
    styleUrls: ["participant.css"],
    template: participantComponentTemplate,
    providers: [ParticipantService]
    
})

export class ParticipantComponent implements AfterViewInit, OnInit{

    @ViewChild('video') video : ElementRef;
    @Input() id : string;
    @Input() class : string;
    @Input() name : string;
    @Input() userType : string;
    @Input() roomName : string;
    
    private _userName: string;
    private important: boolean;
   
    
    constructor(private participant: ParticipantService) {

        console.log("");
        console.log(`% Participant constructor ${new Date().toLocaleTimeString()}`);
        
        this.important = false;
        
        console.log(`/ Participant constructor ${new Date().toLocaleTimeString()}`);
        console.log("");
    }

    ngOnInit() { 
        //console.log(`Participant.onInit - userType: ${this.userType}`);
    }

    ngAfterViewInit() {
        console.log("   ngAfterViewInit");
        console.log(`* Participant.afterViewInit: ${this.id} ${new Date().toLocaleTimeString()}`);

        this._userName = this.id;


        this.participant.init(this.id, this.video.nativeElement, this.roomName);
        //this.participant.signIn(this);
    }

    get userName():string{
        return this._userName;
    }

    setClasses(){
        let classes = {
            'important': this.important,
        };
        return classes;
    }

    ngOnDestroy() {
        console.log(`* Participant(${this._userName}).onDestroy ${new Date().toLocaleTimeString()}`);
        
        this.participant.destroy();
    }
     
}