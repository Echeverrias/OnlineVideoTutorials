
import { IdMessage } from './../../models/types';

export type SdpAnswerMessage = { sdpAnswer: any } & IdMessage;

export type IceCandidateMessage = { candidate: any } & IdMessage;

export type OfferInfo = { 
    roomId: number,
    userName: string, 
    offerSdp: any,
    answerSdp: any, 
} ;

export type OfferMessage = IdMessage & OfferInfo;

export type IceCandidate = {
    candidate: string,
    sdpMid: string,
    sdpMLineIndex: number
}
export type AddressInfo = {
    roomId: number, 
    userName: string, 
    iceCandidate: IceCandidate, 
};

export type AddressMessage = IdMessage & AddressInfo;

