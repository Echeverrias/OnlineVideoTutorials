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
        /*
        this.constraints = {
            audio: true,
            video: {
                mandatory: {
                    maxWidth: 320,
                    maxFrameRate: 15,
                    minFrameRate: 15
                }
            }
        };
        */
        console.log(`/ Participant constructor ${new Date().toLocaleTimeString()}`);
        console.log("");
    }

    ngOnInit() { 
        //console.log(`Participnat.onInit - userType: ${this.userType}`);
       // this.myUserType = this.userType;
        //this._userName = this.id;

        //this.participant.signIn(this); 

    }

    ngAfterViewInit() {
        console.log("   ngAfterViewInit");
        console.log(`* Participant.afterViewInit: ${this.id} ${new Date().toLocaleTimeString()}`);

        this._userName = this.id;


        this.participant.init(this.id, this.video.nativeElement, this.roomName);
        //this.participant.signIn(this);

        /*
       // console.log("@ {onicecandidate: participant.onIceCandidate.bind(participant)}");
        this.options = {
            onicecandidate: this.onIceCandidate.bind(this)
        }
     //   console.log("# {onicecandidate: participant.onIceCandidate.bind(participant)}");
        
        let participant = this;
        // It is me
        if (this.appService.myUserName === this.id) {
       
            this.options.localVideo = this.video.nativeElement;

          //  console.log("video:");
            //console.log(this.video.nativeElement);
            
            this.options.mediaConstraints = this.constraints;

          //  console.log("@ creating rtcPeer");
            this._rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(this.options,
                function(error) {
                    if (error) {
                        return console.error(error);
                    }
                    this.generateOffer(participant.offerToReceiveVideo.bind(participant));
                });
         //   console.log(this._rtcPeer);    
           // console.log("# created rtcPeer");
        }
        
        else {
            
            this.options.remoteVideo = this.video.nativeElement;
           // console.log("@ creating rtcPeer");
            this._rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(this.options,
                function(error) {
                    if (error) {
                        return console.error(error);
                    }
                    this.generateOffer(participant.offerToReceiveVideo.bind(participant));
                });
           // console.log(this._rtcPeer);    
            //console.log("# creating rtcPeer");
        }
       // console.log("constraints: " + JSON.stringify(this.constraints));
        //console.log("options: " + JSON.stringify(this.options));
       // console.log(`I'm ${this._userName} with ${this._rtcPeer}`);
        console.log(`/ Participant.afterViewInit ${new Date().toLocaleTimeString()}`);
        console.log("");
    */
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

    /*
    offerToReceiveVideo(error, offerSdp, wp): void {
        console.log("");
        console.log(`*-> Participant.offerToReceiveVideo  ${this.id} ${new Date().toLocaleTimeString()}`);
        //console.log(`offerSdp: ...`);
        //console.log(offerSdp);
        //alert(`I'm ${this._userName} and i'm going to send an offer`);
        //console.log('Invoking SDP offer callback function');
        let message = {
            id: "receiveVideoFrom",
            userName: this._userName,
            offer: offerSdp,
            roomName: this.roomName
        };

        this.connection.sendMessage(message);

        console.log(`/ Participant.offerToReceiveVideo ${new Date().toLocaleTimeString()}`);
        console.log("");
    }

    onIceCandidate(candidate, wp): void {
       // console.log("");
       // console.log(`* -> Participant.onIceCandidtae - Local candidate: ${JSON.stringify(candidate)} ${new Date().toLocaleTimeString()}`);

        let message = {
            id: 'receiveAddress',
            address: candidate,
            userName: this._userName,
            roomName: this.roomName
        };

        this.connection.sendMessage(message);
       // console.log(`/ Local candidate ${new Date().toLocaleTimeString()}`);
        console.log("");

    }
    
    receiveVideoResponse(sdpAnswer): void {
        console.log("");
        console.log(`* Participant.receiveVideoResponse ${this.id} ${new Date().toLocaleTimeString()}`);
       // console.log(`* Participant.receiveVideoResponse - sdpAnswer: ${sdpAnswer} ${new Date().toLocaleTimeString()}`);
        //console.log(`sdpAnswer: ...`);
         //console.log(sdpAnswer);
        //console.log(`my rtcPeer: `);
       // console.log(this._rtcPeer);
        
     //   console.log("@ processing answer");
        this._rtcPeer.processAnswer(sdpAnswer, function(error) {
            if (error) {
                console.error(`!! ERROR:Participant.receiveVideoResponse`);
                console.error(error);
                
            }
        });
      //  console.log("# processed answer");
        console.log(`/ Participant.receiveVideoResponse ${new Date().toLocaleTimeString()}`);
        console.log("");
    }

    addIceCandidate(candidate): void {
       // console.log("");
      //  console.log(`* Participant.addIceCandidate  ${new Date().toLocaleTimeString()}`);
       // console.log(`* Participant.addIceCandidate  - candidate: ${JSON.stringify(candidate)} ${new Date().toLocaleTimeString()}`);
       // console.log("@ addIceCandidate");
        //console.log(`my rtcPeer: `);
        //console.log(this._rtcPeer);

	    this._rtcPeer.addIceCandidate (candidate, function (error) {
    		if (error){ 
                        console.error(`!! ERROR:Participant.addIceCandidate`);
                        console.error(error);
                        return;
                    }
        });

       // console.log("# addIceCandidate");
        //console.log(`/ Participant.addIceCandidate ${new Date().toLocaleTimeString()}`);
       // console.log("");
    } 
    
    private dispose(): void {
        console.log("");
        console.log(`* Participant.dispose I'm ${this.id} and i'm disposed ${new Date().toLocaleTimeString()}`);
        
        this._rtcPeer.dispose();
        
        console.log(`/ Participant.dispose I'm ${this.id} and i'm disposed ${new Date().toLocaleTimeString()}`);
        console.log("");
    }
    */
    ngOnDestroy() {
        console.log(`* Participant(${this._userName}).onDestroy ${new Date().toLocaleTimeString()}`);
        //this.dispose();
        this.participant.destroy();
    }
     
}