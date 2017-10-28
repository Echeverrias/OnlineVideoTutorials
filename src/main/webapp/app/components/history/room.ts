export interface IRoom {
    name: string;
    tutor: string;
    createdAt: any;
    participantsHistory: IParticipant [];
    filesHistory: any [];
    
}

export interface IParticipant {
    userName: string;
    name: string;
    surname: string;
    type: any;
    email: string;
}


export class Room implements IRoom{
    
    private _name: string;
    private _tutor: string;
    private _createdAt: Date;
    private _participantsHistory: IParticipant [];
    private _filesHistory: any [];

    constructor(room?: IRoom){
        if (room){
            this.setDataRoom(room);
        }
    };

    public get name(): string{
        return this._name;
    }

    public get tutor(): string{
        return this._tutor;
    }

    public get createdAt(): Date{
        return new Date(this._createdAt);
    }

    public get participantsHistory(): IParticipant []{
        return this._participantsHistory;
    }

    public get filesHistory(): any []{
        return this._filesHistory;
    }

    public setDataRoom(room: IRoom){
        this._name = room.name;
        this._tutor = room.tutor;
        this._createdAt = new Date(room.createdAt);
        this._participantsHistory = room.participantsHistory.slice(0);
        this._filesHistory = room.filesHistory.slice(0);
    }

    public getCreatedAtTimeStamp(): string{
        return `${this.getCreatedAtDate()} ${this.getCreatedAtTime()}`;
    }

    public getCreatedAtDate(): string{
        return this._createdAt.toLocaleDateString().replace(/\//g, '-');
    }

    public getCreatedAtTime(): string{
        let hours = this._createdAt.getHours();
        let minutes = this._createdAt.getMinutes();
        let seconds = this._createdAt.getSeconds();
    
        return `${hours}:${minutes}:${seconds}`;
    }

}