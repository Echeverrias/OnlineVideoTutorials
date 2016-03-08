/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */

import {Component, ViewChild} from 'angular2/core';
import {AfterViewInit} from 'angular2/common';

import {Connection} from '../../services/connection.ts';
import {MyService} from '../../services/myService.ts';

@Component({
    selector: 'participant',
    inputs: ['id', 'class', 'name', 'userType', 'roomName'],
     styleUrls: ["assets/styles/room.css"],
    templateUrl: "scripts/app/components/participant/participant.html"
})

export class ParticipantComponent {

    private @ViewChild('video') video;
    private userName: String;
    private options: Object;
    private constraints: Object;
    private rtcPeer: any;

    constructor(private connection: Connection, private appService: MyService) {

        console.log("");
        console.log("* " + new Date().toLocaleTimeString());
        console.log(`% Participant constructor`);

        this.userName = this.id;

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
        
        

        console.log(`/ Participant constructor`);
        console.log("/ " + new Date().toLocaleTimeString());
        console.log("");

    }

    ngAfterViewInit() {
        console.log("");
        console.log("*" + new Date().toLocaleTimeString());
        console.log(`* Participant.afterViewInit`);

        this.userName = this.id;
        console.log("1");
        let participant = this;
        console.log("@ {onicecandidate: participant.onIceCandidate.bind(participant)}");
        this.options = {
            onicecandidate: this.onIceCandidate.bind(this)
        }
        console.log("# {onicecandidate: participant.onIceCandidate.bind(participant)}");
        
        // It is me
        if (this.appService.me.userName === this.id) {
            
            console.log("@ get video element");
            this.options.localvideo = this.video.nativeElement;
            console.log("video:" + this.video.nativeElement);
            console.log("video:" + JSON.stringify(this.video.nativeElement));
            console.log("video properties:" + Object.getOwnPropertyNames(this.video.nativeElement));
            console.log("# get video element");
            this.options.mediaConstraints = this.constraints;
            console.log("@ creating rtcPeer");
            this.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(this.options,
                function(error) {
                    if (error) {
                        return console.error(error);
                    }
                    this.generateOffer(participant.offerToReceiveVideo.bind(participant));
                });
            console.log("# createdrtcPeer");
        }
        
        else {
            
            this.options.remotevideo = this.video.nativeElement;
            console.log("@ creating rtcPeer");
            this.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(this.options,
                function(error) {
                    if (error) {
                        return console.error(error);
                    }
                    this.generateOffer(participant.offerToReceiveVideo.bind(participant));
                });
            console.log("# creating rtcPeer");
        }
        console.log("constraints: " + JSON.stringify(this.constraints));
        console.log("options: " + JSON.stringify(this.options));
        console.log(`/ Participant.afterViewInit`);
        console.log("/" + new Date().toLocaleTimeString());
        console.log("");

    }


    private onIceCandidate(candidate, wp): void {
        console.log("");
        console.log("*" + new Date().toLocaleTimeString());
        console.log(`-> Participant.onIceCandidtae - Local candidate: ${JSON.stringify(candidate)}`);

        let message = {
            id: 'onIceCandidate',
            candidate: candidate,
            userName: this.userName,
            roomName: this.roomName
        };

        this.connection.sendMessage(message);
        console.log(`/ Local candidate`);
        console.log("/" + new Date().toLocaleTimeString());
        console.log("");

    }

    private offerToReceiveVideo(error, offerSdp, wp): void {
        console.log("");
        console.log("*" + new Date().toLocaleTimeString());
        console.log(`-> Participant.offerToReceiveVideo - offerSdp: ${offerSdp}`);

        if (error) return console.error("sdp offer error");
        console.log('Invoking SDP offer callback function');
        let message = {
            id: "receiveVideoFrom",
            userName: this.userName,
            sdpOffer: offerSdp,
            roomName: this.roomName
        };
        this.connection.sendMessage(message);

        console.log(`/ Participant.offerToReceiveVideo`);
        console.log("/" + new Date().toLocaleTimeString());
        console.log("");

    }

    receiveVideoResponse(sdpAnswer): void {

        console.log("");
        console.log("*" + new Date().toLocaleTimeString());
        console.log(`* Participant.receiveVideoResponse - sdpAnswer: ${sdpAnswer}`);
        console.log("@ processing answer");
        this.rtcPeer.processAnswer(sdpAnswer, function(error) {
            if (error) {
                console.error(error);
            }
        });
        console.log("# processing answer");


        console.log(`/ Participant.receiveVideoResponse`);
        console.log("/" + new Date().toLocaleTimeString());
        console.log("");
    }

    addIceCandidate(candidate): void {
        console.log("");
        console.log("*" + new Date().toLocaleTimeString());
        console.log(`* Participant.addIceCandidate  - candidate: ${JSON.stringify(candidate)}`);
        console.log("@ addIceCandidate");
	this.rtcPeer.addIceCandidate (candidate, function (error) {
		if (error){ 
                    console.error("Error adding candidate: " + error);
                    return;
                }
        });
        console.log("@ addIceCandidate");
         console.log(`/ Participant.addIceCandidate `);
          console.log("/" + new Date().toLocaleTimeString());
           console.log("");
       
       
        
    } 
    
    dispose() : void{
         console.log("");
        console.log("*" + new Date().toLocaleTimeString());
         console.log(`Participant.dispose I'm ${this.id} and i'm disposed`);
         console.log("/" + new Date().toLocaleTimeString());
           console.log("");
         this.rtcPeer.dispose();
    }
     
 }


