/**
 * NO USAR
 * No tiene mucho sentido que el participante contenga a la room,
 * El UserService se encargará de asociar al usuario con la sala en al que está participando
 */



import {IUser, User} from './user';
import {IRoom} from './room';

export interface IParticipantX extends IUser{
    room: IRoom;
}

export class ParticipantX extends User implements IParticipantX{
    private _room: IRoom;
    
    constructor(userName: string, userType: string, name: string, surname: string, email:string);
    constructor(userName: string, userType: string, name: string, surname: string, email:string, room: IRoom );
    constructor(userName?: string, userType?: string, name?: string, surname?: string, email?:string, room?: IRoom ) {
        super(userName, userType, name, surname, email);
        this._room = room;
    }

    public get room():IRoom{
        return this._room;
    }

    public set room(room: IRoom){
        this._room = room;
    }

    public set (participant: IParticipantX){
        super.set(participant);
        this._room = participant.room; 
    }

    setToUndefined (): void{
        this.setToUndefined();
        this._room = null;
    }
}