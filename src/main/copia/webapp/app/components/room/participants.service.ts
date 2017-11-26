import { Injectable, EventEmitter } from '@angular/core';


import { ParticipantComponent } from './participant/participant.component';
import { HandlerService } from './../../services/handler.service';
import { ConnectionService } from './../../services/connection.service';
import { UserService } from './../../services/user.service';
import { RoomService } from './room.service';

import { User } from './../../models/user';
import { Message } from './../../models/types';
import { IdMessage } from './../../models/types';

import { SdpAnswerMessage } from './participants.types';
import { IceCandidateMessage } from './participants.types';
import { OfferMessage } from './participants.types';
import { AddressMessage } from './participants.types';

@Injectable()
export class ParticipantsService {

    private eventEmitters: Map<string, EventEmitter<Message>>;
    
    constructor(private handler: HandlerService, private connection: ConnectionService, private me: UserService) {
        
        this.eventEmitters = new Map<string, EventEmitter<Message>>();
   
   }

    attachParticipant(participantUserName: string, receiveVideoAnswer: (sdpAnswer: any) => any , iceCandidate: (candidate: any) => any ){

        let eeReceiveVideoAnswer: EventEmitter<Message> = new EventEmitter<Message>();
        eeReceiveVideoAnswer.subscribe((data: SdpAnswerMessage): void => { receiveVideoAnswer(data.sdpAnswer) });
        this.handler.attach(`receiveVideoAnswer-${participantUserName}`, eeReceiveVideoAnswer);
        this.eventEmitters.set(`receiveVideoAnswer-${participantUserName}`, eeReceiveVideoAnswer);

        let eeIceCandidate: EventEmitter<Message> = new EventEmitter<Message>();
        eeIceCandidate.subscribe((data: IceCandidateMessage): void => { iceCandidate(data.candidate) });
        this.handler.attach(`iceCandidate-${participantUserName}`, eeIceCandidate);
        this.eventEmitters.set(`iceCandidate-${participantUserName}`, eeIceCandidate);

    }

    offerToReceiveVideo(participantUserName: string, roomName: string, offerSdp: any): void {
        console.log("");
        console.log(`***-> ParticipantService.offerToReceiveVideo  ${participantUserName} ${new Date().toLocaleTimeString()}`);
        //console.log(`offerSdp: ...`);
        //console.log(offerSdp);
         //console.log('Invoking SDP offer callback function');

        let message: OfferMessage = {
            id: "receiveVideoFrom",
            userName: participantUserName,
            offer: offerSdp,
            roomName: roomName
        };

        this.connection.sendMessage(message);

        console.log(`/ ParticipantService.offerToReceiveVideo ${new Date().toLocaleTimeString()}`);
        console.log("");
    }

    onIceCandidate(participantUserName: string, roomName: string, candidate: any): void {
        // console.log("");
        // console.log(`* -> Participant.onIceCandidtae - Local candidate: ${JSON.stringify(candidate)} ${new Date().toLocaleTimeString()}`);

        let message: AddressMessage = {
            id: 'receiveAddress',
            address: candidate,
            userName: participantUserName,
            roomName: roomName
        };

        this.connection.sendMessage(message);
        // console.log(`/ Local candidate ${new Date().toLocaleTimeString()}`);
        console.log("");

    }

    detachParticipant(participantUserName: string): void {

        this.eventEmitters.get(`receiveVideoAnswer-${participantUserName}`).unsubscribe();
        this.eventEmitters.delete(`receiveVideoAnswer-${participantUserName}`);
        this.handler.detach(`receiveVideoAnswer-${participantUserName}`)
        this.eventEmitters.get(`iceCandidate-${participantUserName}`).unsubscribe();
        this.eventEmitters.delete(`iceCandidate-${participantUserName}`);
        this.handler.detach(`iceCandidate-${participantUserName}`);
    }  

    destroy(): void {
        
        this.eventEmitters.forEach((eventEmitter, key) => {
            eventEmitter.unsubscribe();
            this.handler.detach(key);
        });
        this.eventEmitters.clear();
        console.log(this.eventEmitters);
    }

}