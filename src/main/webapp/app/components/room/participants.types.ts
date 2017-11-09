

import { IdMessage } from './../../models/types';

export type SdpAnswerMessage = { sdpAnswer: any } & IdMessage;

export type IceCandidateMessage = { candidate: any } & IdMessage;

export type OfferMessage = { 
    userName: string, 
    offer: any, 
    roomName: string 
} & IdMessage;

export type AddressMessage = { 
    userName: string, 
    address: any, 
    roomName: string 
} & IdMessage;