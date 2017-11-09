import { IUser } from './../..//models/user';
import { IRoom , Room} from './../..//models/room';

export type FileHistory = {
    name: string,
    loadUrl: string, 
    downloadUrl: string, 
    room: IRoom
}

export interface IRoomHistory extends IRoom{
    participantsHistory: IUser [];
    filesHistory: FileHistory [];
}

export class RoomHistory extends Room implements IRoomHistory{
    
    private _participantsHistory: IUser [];
    private _filesHistory: FileHistory [];
    
    constructor(room: IRoomHistory){
        super();
        this.setDataRoomHistory(room);
    }

    
    public get participantsHistory(): IUser []{
        return this._participantsHistory;
    }

    public get filesHistory(): FileHistory []{
        return this._filesHistory;
    }

    public setDataRoomHistory(room: IRoomHistory){
        this.setDataRoom(room);
        this._participantsHistory = room.participantsHistory.slice(0);
        this._filesHistory = room.filesHistory.slice(0);
    }

}