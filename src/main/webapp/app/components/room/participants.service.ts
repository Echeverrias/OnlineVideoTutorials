import { Injectable, EventEmitter } from '@angular/core';


import { ParticipantComponent } from './participant/participant.component';
import { HandlerService } from './../../core/handler.service';
import { ConnectionService } from './../../core/connection.service';
import { UserService } from './../../core/user.service';
import { RoomService } from './room.service';

import { User } from './../../models/user';
import { WSMessage } from './../../models/types';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { SdpAnswerMessage, IceCandidateMessage, OfferInfo, IceCandidate, AddressInfo } from './participants.types';

// Messages to the server
const WS_MSG_ID_RECEIVE_VIDEO_FROM: string = 'receiveVideoFrom';
const WS_MSG_ID_RECEIVE_ADDRESS: string = 'receiveAddress';

// Messages from the server
const WS_MSG_ID_PREFIX_VIDEO_ANSWER_FROM: string = 'receiveVideoAnswer-';
const WS_MSG_ID_PREFIX_ICE_CANDIDATE: string = 'iceCandidate-';

@Injectable()
export class ParticipantsService {

    //private eventEmitters: Map<string, EventEmitter<any>>;
    // private subscriptions: Map<string, any>;
    private attached: string [];
    
    constructor(private handler: HandlerService, private connection: ConnectionService, private me: UserService) {
        
    // this.subscriptions = new Map<string, any>();
    this.attached = [];
   }

   
/*
    attachParticipant(participantUserName: string, receiveVideoAnswer: (sdpAnswer: any) => any , iceCandidate: (candidate: any) => any ){

        let eeReceiveVideoAnswer: EventEmitter<OfferInfo> = new EventEmitter<OfferInfo>();
        let receiveVideoAnswerSubscription = eeReceiveVideoAnswer
            .subscribe((offerInfo: OfferInfo): void => { receiveVideoAnswer(offerInfo.answerSdp) })
        this.handler.attach(`${WS_MSG_ID_PREFIX_VIDEO_ANSWER_FROM}${participantUserName}`, eeReceiveVideoAnswer);
        this.subscriptions.set(`${WS_MSG_ID_PREFIX_VIDEO_ANSWER_FROM}${participantUserName}`, eeReceiveVideoAnswer);

        let eeIceCandidate: EventEmitter<AddressInfo> = new EventEmitter<AddressInfo>();
        let eeIceCandidateSubscription = eeIceCandidate
            .subscribe((addressInfo: AddressInfo): void => { iceCandidate(addressInfo.iceCandidate) });
        this.handler.attach(`${WS_MSG_ID_PREFIX_ICE_CANDIDATE}${participantUserName}`, eeIceCandidate);
        this.subscriptions.set(`${WS_MSG_ID_PREFIX_ICE_CANDIDATE}${participantUserName}`, eeIceCandidate);

    }
*/
    getVideoAnswer(participantUserName: string):Observable<OfferInfo>{
        let receiveVideoAnswer$: Subject<OfferInfo> = new Subject<OfferInfo>();
        let id = this.getVideoAnswerId(participantUserName);
        this.handler.attach(id, receiveVideoAnswer$);
        this.attached.push(id);
        return receiveVideoAnswer$.asObservable();
    }

    private getVideoAnswerId(participantUserName: string): string{
        return `${WS_MSG_ID_PREFIX_VIDEO_ANSWER_FROM}${participantUserName}`;
    }

    getIceCandidate(participantUserName: string):Observable<AddressInfo> {
        let iceCandidate$: Subject<AddressInfo> = new Subject<AddressInfo>();
        let id = this.getIceCandidateId(participantUserName);
        this.handler.attach(id, iceCandidate$);
        this.attached.push(id);
        return iceCandidate$.asObservable();
    }

    private getIceCandidateId(participantUserName: string): string{
        return `${WS_MSG_ID_PREFIX_ICE_CANDIDATE}${participantUserName}`;
    }
    
    offerToReceiveVideo(roomId: number, participantUserName: string, offerSdp: any): void {
        console.log("");
        console.log(`***-> ParticipantService.offerToReceiveVideo  ${participantUserName} ${new Date().toLocaleTimeString()}`);
        //console.log(`offerSdp: ...`);
        //console.log(offerSdp);
         //console.log('Invoking SDP offer callback function');

        let offer: OfferInfo = {
            roomId: roomId,
            userName: participantUserName,
            offerSdp: offerSdp,
            answerSdp: ""
        };

        this.connection.sendWSMessage(WS_MSG_ID_RECEIVE_VIDEO_FROM, offer);

        console.log(`/ ParticipantService.offerToReceiveVideo ${new Date().toLocaleTimeString()}`);
        console.log("");
    }

    onIceCandidate(roomId: number, participantUserName: string, iceCandidate: IceCandidate): void {
        // console.log("");
        // console.log(`* -> Participant.onIceCandidtae - Local candidate: ${JSON.stringify(candidate)} ${new Date().toLocaleTimeString()}`);

        let address: AddressInfo = {
            roomId: roomId,
            userName: participantUserName,
            iceCandidate: iceCandidate
        };

        this.connection.sendWSMessage(WS_MSG_ID_RECEIVE_ADDRESS, address);
        // console.log(`/ Local candidate ${new Date().toLocaleTimeString()}`);
        console.log("");

    }
    /*
    detachParticipant(participantUserName: string): void {

        this.subscriptions.get(`${WS_MSG_ID_PREFIX_VIDEO_ANSWER_FROM}${participantUserName}`).unsubscribe();
        this.subscriptions.delete(`${WS_MSG_ID_PREFIX_VIDEO_ANSWER_FROM}${participantUserName}`);
        this.handler.detach(`${WS_MSG_ID_PREFIX_VIDEO_ANSWER_FROM}${participantUserName}`)
        this.subscriptions.get(`${WS_MSG_ID_PREFIX_ICE_CANDIDATE}${participantUserName}`).unsubscribe();
        this.subscriptions.delete(`${WS_MSG_ID_PREFIX_ICE_CANDIDATE}${participantUserName}`);
        this.handler.detach(`${WS_MSG_ID_PREFIX_ICE_CANDIDATE}${participantUserName}`);
    }  

   
    destroy(): void {
        
        this.subscriptions.forEach((subscription, key) => {
            subscription.unsubscribe();
            this.handler.detach(key);
        });
        this.subscriptions.clear();
        console.log(this.subscriptions);
    }
    */
    
    destroy() {
        console.log('ParticipantsService.destroy()');
        console.log(this.attached);
       this.attached.forEach((id) => this.handler.detach(id));
       console.log(this.attached);
    }

    destroyParticipant(participantUserName:string){
        console.log(`ParticipantsService.destroyParticipant(${participantUserName})`);
        console.log(this.attached);
        let id = this.getVideoAnswerId(participantUserName);
        this.handler.detach(id); 
        let i = this.attached.indexOf(id);
        this.attached.splice(i,1);
        id = this.getIceCandidateId(participantUserName);
        this.handler.detach(id);
        i = this.attached.indexOf(this.getIceCandidateId(participantUserName));
        this.attached.splice(i,1);
        console.log(this.attached);
    }

}