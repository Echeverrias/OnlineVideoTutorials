import { Injectable, EventEmitter } from '@angular/core';


import { ParticipantComponent } from '../components/participant/participant.component';
import { HandlerService } from './handler.service';
import { Connection } from './connection';
import { MyService } from './myService';
import { RoomService } from './room.service';

import { User } from '../models/user';
import { Message } from '../models/types';
import { IdMessage } from '../models/types';

type RtcPeerOptions = { mediaConstraints: Object, onicecandidate: any, localVideo: HTMLElement, remoteVideo: HTMLElement};
type SdpAnswerMessage = { sdpAnswer: any } & IdMessage;
type IceCandidateMessage = { candidate: any } & IdMessage;
type OfferMessage = { userName: string, offer: any, roomName: string } & IdMessage;
type AddressMessage = { userName: string, address: any, roomName: string } & IdMessage;


@Injectable()
export class ParticipantService {

    //private mainParticipant: User;
    //private participants: User[];

    private roomName: string;
    private participantUserName: string;
    private videoParticipant: HTMLElement;
    
    private eeReceiveVideoAnswer: EventEmitter<Message>;
    private eeIceCandidate: EventEmitter<Message>;

    private constraints: Object;
    private options: Object;
    private _rtcPeer: any;

    constructor(private handler: HandlerService, private connection: Connection, private me: MyService) {
        //this.participants = ParticipantComponent[];

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

    }

    init(participantName: string, video: HTMLElement, roomName: string): void {

        this.participantUserName = participantName;
        this.videoParticipant = video;
        this.roomName = roomName;

        this.eeReceiveVideoAnswer = new EventEmitter<Message>();
        this.eeReceiveVideoAnswer.subscribe((data: SdpAnswerMessage): void => { this.receiveVideoResponse(data) });
        this.handler.attach(`receiveVideoAnswer-${participantName}`, this.eeReceiveVideoAnswer);

        this.eeIceCandidate = new EventEmitter<Message>();
        this.eeIceCandidate.subscribe((data: IceCandidateMessage): void => { this.addIceCandidate(data) });
        this.handler.attach(`iceCandidate-${participantName}`, this.eeIceCandidate);

        this.createRtcPeer();
    }

    private createRtcPeer():void{

        var participant = this;
        
        var options: RtcPeerOptions = { mediaConstraints: null, onicecandidate: null, localVideo: null, remoteVideo: null};
        options.onicecandidate = participant.onIceCandidate.bind(participant);

        //   console.log("# {onicecandidate: participant.onIceCandidate.bind(participant)}");

        
        // It is me
        if (this.me.myUserName === this.participantUserName) {
            
            options.localVideo = this.videoParticipant;

            //  console.log("video:");
            //console.log(this.video.nativeElement);

            options.mediaConstraints = this.constraints;

            //  console.log("@ creating rtcPeer");
            this._rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options,
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

            options.remoteVideo = this.videoParticipant;
            // console.log("@ creating rtcPeer");
            this._rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options,
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
    }    

    offerToReceiveVideo(error: any , offerSdp: any, wp: any): void {
        console.log("");
        console.log(`*-> Participant.offerToReceiveVideo  ${this.participantUserName} ${new Date().toLocaleTimeString()}`);
        //console.log(`offerSdp: ...`);
        //console.log(offerSdp);
        //alert(`I'm ${this._userName} and i'm going to send an offer`);
        //console.log('Invoking SDP offer callback function');
        let message: OfferMessage = {
            id: "receiveVideoFrom",
            userName: this.participantUserName,
            offer: offerSdp,
            roomName: this.roomName
        };

        this.connection.sendMessage(message);

        console.log(`/ Participant.offerToReceiveVideo ${new Date().toLocaleTimeString()}`);
        console.log("");
    }

    onIceCandidate(candidate:any, wp: any): void {
        // console.log("");
        // console.log(`* -> Participant.onIceCandidtae - Local candidate: ${JSON.stringify(candidate)} ${new Date().toLocaleTimeString()}`);

        let message: AddressMessage = {
            id: 'receiveAddress',
            address: candidate,
            userName: this.participantUserName,
            roomName: this.roomName
        };

        this.connection.sendMessage(message);
        // console.log(`/ Local candidate ${new Date().toLocaleTimeString()}`);
        console.log("");

    }

    receiveVideoResponse(msg: SdpAnswerMessage): void {
        console.log("");
        console.log(`* Participant.receiveVideoResponse ${this.me.myUserName} from ${this.participantUserName}${new Date().toLocaleTimeString()}`);
        // console.log(`* Participant.receiveVideoResponse - sdpAnswer: ${sdpAnswer} ${new Date().toLocaleTimeString()}`);
        //console.log(`sdpAnswer: ...`);
        //console.log(sdpAnswer);
        //console.log(`my rtcPeer: `);
        // console.log(this._rtcPeer);
        
        let sdpAnswer = msg.sdpAnswer;
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

    addIceCandidate(msg: IceCandidateMessage): void {
        // console.log("");
        //  console.log(`* Participant.addIceCandidate  ${new Date().toLocaleTimeString()}`);
        // console.log(`* Participant.addIceCandidate  - candidate: ${JSON.stringify(candidate)} ${new Date().toLocaleTimeString()}`);
        // console.log("@ addIceCandidate");
        //console.log(`my rtcPeer: `);
        //console.log(this._rtcPeer);
        let candidate = msg.candidate;
        this._rtcPeer.addIceCandidate(candidate, function(error) {
            if (error) {
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
        console.log(`* Participant.dispose I'm ${this.participantUserName} and i'm disposed ${new Date().toLocaleTimeString()}`);

        this._rtcPeer.dispose();

        console.log(`/ Participant.dispose I'm ${this.participantUserName}} and i'm disposed ${new Date().toLocaleTimeString()}`);
        console.log("");
    }
    
    destroy() {
        this.dispose();
        this.eeReceiveVideoAnswer.unsubscribe();
        this.eeIceCandidate.unsubscribe();
    }

}