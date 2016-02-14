/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
 
 import {Component, ViewChild} from 'angular2/core';
 import {AfterViewInit} from 'angular2/common';
 
 import {Connection} from '../../services/connection.ts';
 
 @Component ({
     selector:'participant',
     inputs:['id', 'class', 'name', 'userType'],
     templateUrl: "scripts/app/components/participant/participant.html"
 })
 
 export class ParticipantComponent {
    
    private @ViewChild('video') video;
 
    private _rtcPeer;
     
    constructor(private connection: Connection){
         console.log(`% Participant constructor`);
    }
     
    ngAfterViewInit(){
        this.video = document.getElement
         
    }
     
    get rtcPeer() {
        return this._rtcPeer;
    } 
     
    set rtcPeer(rtcPeer2) {
        this._rtcPeer = rtcPeer2;
    } 
     
    
    dispose(){
         console.log(`I'm ${this.id} and i'm disposed`);
         this._rtcPeer.dispose();
    }
     
 }


