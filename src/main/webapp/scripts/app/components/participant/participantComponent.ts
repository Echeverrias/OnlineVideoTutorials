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

export class ParticipantComponent implements AfterViewInit{

    private @ViewChild('video') video : ElementRef;
    private userName: String;
    private options: Object;
    private constraints: Object;
    private _rtcPeer: any;
    

    constructor(private connection: Connection, private appService: MyService) {

        console.log("");
        console.log(`% Participant constructor ${new Date().toLocaleTimeString()}`);

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
        
        console.log(`/ Participant constructor ${new Date().toLocaleTimeString()}`);
        console.log("");
    }

    ngAfterViewInit() {
        console.log("   ngAfterViewInit");
        console.log(`* Participant.afterViewInit: ${this.userName} ${new Date().toLocaleTimeString()}`);

        this.userName = this.id;
        
        console.log("@ {onicecandidate: participant.onIceCandidate.bind(participant)}");
        this.options = {
            onicecandidate: this.onIceCandidate.bind(this)
        }
        console.log("# {onicecandidate: participant.onIceCandidate.bind(participant)}");
        
        let participant = this;
        // It is me
        if (this.appService.myUserName === this.id) {
            
            this.options.localVideo = this.video.nativeElement;

            console.log("video:");
            console.log(this.video.nativeElement));
            
            this.options.mediaConstraints = this.constraints;

            console.log("@ creating rtcPeer");
            this._rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(this.options,
                function(error) {
                    if (error) {
                        return console.error(error);
                    }
                    this.generateOffer(participant.offerToReceiveVideo.bind(participant));
                });
            console.log(this._rtcPeer);    
            console.log("# created rtcPeer");
        }
        
        else {
            
            this.options.remoteVideo = this.video.nativeElement;
            console.log("@ creating rtcPeer");
            this._rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(this.options,
                function(error) {
                    if (error) {
                        return console.error(error);
                    }
                    this.generateOffer(participant.offerToReceiveVideo.bind(participant));
                });
            console.log(this._rtcPeer);    
            console.log("# creating rtcPeer");
        }
        console.log("constraints: " + JSON.stringify(this.constraints));
        console.log("options: " + JSON.stringify(this.options));
        console.log(`I'm ${this.userName} with ${this._rtcPeer}`);
        console.log(`/ Participant.afterViewInit ${new Date().toLocaleTimeString()}`);
        console.log("");

    }

    offerToReceiveVideo(error, offerSdp, wp): void {
        console.log("");
        console.log(`*-> Participant.offerToReceiveVideo  ${new Date().toLocaleTimeString()}`);
        console.log(`offerSdp: ...`);
        //console.log(offerSdp);
       
        console.log('Invoking SDP offer callback function');
        let message = {
            id: "receiveVideoFrom",
            userName: this.userName,
            offer: offerSdp,
            roomName: this.roomName
        };

        this.connection.sendMessage(message);

        console.log(`/ Participant.offerToReceiveVideo ${new Date().toLocaleTimeString()}`);
        console.log("");
    }

    onIceCandidate(candidate, wp): void {
        console.log("");
        console.log(`* -> Participant.onIceCandidtae - Local candidate: ${JSON.stringify(candidate)} ${new Date().toLocaleTimeString()}`);

        let message = {
            id: 'receiveAddress',
            address: candidate,
            userName: this.userName,
            roomName: this.roomName
        };

        this.connection.sendMessage(message);
        console.log(`/ Local candidate ${new Date().toLocaleTimeString()}`);
        console.log("");

    }
    
    receiveVideoResponse(sdpAnswer): void {
        console.log("");
        console.log(`* Participant.receiveVideoResponse - sdpAnswer: ${sdpAnswer} ${new Date().toLocaleTimeString()}`);
        console.log(`sdpAnswer: ...`);
        // console.log(sdpAnswer);
        console.log(`my rtcPeer: `);
        console.log(this._rtcPeer);
        
        console.log("@ processing answer");
        this._rtcPeer.processAnswer(sdpAnswer, function(error) {
            if (error) {
                console.error(error);
            }
        });
        console.log("# processing answer");
        console.log(`/ Participant.receiveVideoResponse ${new Date().toLocaleTimeString()}`);
        console.log("");
    }

    addIceCandidate(candidate): void {
        console.log("");
        console.log(`* Participant.addIceCandidate  - candidate: ${JSON.stringify(candidate)} ${new Date().toLocaleTimeString()}`);
        console.log("@ addIceCandidate");
        console.log(`my rtcPeer: `);
        console.log(this._rtcPeer);

	    this._rtcPeer.addIceCandidate (candidate, function (error) {
    		if (error){ 
                        console.error("Error adding candidate: " + error);
                        return;
                    }
        });

        console.log("# addIceCandidate");
        console.log(`/ Participant.addIceCandidate ${new Date().toLocaleTimeString()}`);
        console.log("");
    } 
    
    dispose(): void {
        console.log("");
        console.log(`* Participant.dispose I'm ${this.id} and i'm disposed ${new Date().toLocaleTimeString()}`);
        
        this._rtcPeer.dispose();
        
        console.log(`/ Participant.dispose I'm ${this.id} and i'm disposed ${new Date().toLocaleTimeString()}`);
        console.log("");
    }

    ngOnDestroy() {
        console.log(`* Participant(${this.userName}).onDestroy ${new Date().toLocaleTimeString()}`);
    }
     
}