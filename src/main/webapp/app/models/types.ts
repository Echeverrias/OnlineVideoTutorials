/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */

import { IRoom } from './room';
import { IUserInfo, IUser } from './user';

export interface IMessage {
    sender: string;
    message: string;
    date: string;
};

export type AccessFile = { 
    name: string, 
    loadUrl: string, 
    downloadUrl: string 
};

export type ParticipantInfo = IUserInfo & {room: IRoom};

export type UserFile = { 
    name: string, 
    extension: string, 
    mimeType: string, 
    content: any
};


export type IdMessage = { id: string };
export type Message = IdMessage & Object;
export type WSMessage = { id: string, payload: any };
export type UserInfoMessage = IdMessage & IUserInfo;

