import * as dateFns from 'date-fns';
export interface IRoom {
    id: number;
    name: string;
    tutor: string;
    createdAt: any;
}


export class Room implements IRoom{
    
    private _id: number = -1;
    private _name: string = "";
    private _tutor: string = "";
    private _createdAt: any
    
    constructor();
    constructor(name: string);
    constructor(name: string, tutor: string);
    constructor(name?: string, tutor?: string){
        if (arguments.length == 1) {
            this._name = name;
        }    
        else if (arguments.length == 2) {
            this._name = name;
            this._tutor = tutor;
        }    
    };

    public get id(): number{
        return this._id;
    }

    public get name(): string{
        return this._name;
    }

    public get tutor(): string{
        return this._tutor;
    }

    public get createdAt(): Date{
        return new Date(this._createdAt);
    }

    public json(): IRoom{
        return { 
            id: this._id,
            name: this._name,
            tutor: this._tutor,
            createdAt: new Date(this._createdAt)
        }
    }

    public setDataRoom(room: IRoom){
        this._id = room.id;
        this._name = room.name;
        this._tutor = room.tutor;
        this._createdAt = new Date(room.createdAt);
    }

    setToUndefined (): void{
        this._id = -1;
        this._name = "";
        this._tutor = "";
        this._createdAt = null;
    }

    public getCreatedAtTimeStamp(): string{
        return this._createdAt && `${this.getCreatedAtDate()} ${this.getCreatedAtTime()}`;
    }

    public getCreatedAtDate(): string{
        let date: any = this._createdAt;
        if(date){
            date = new Date(date).toLocaleDateString().replace(/\//g, '-');
        }
        return date;
    }

    public getCreatedAtTime(): string{
        let time: any = this._createdAt;
        if(time){ 
            time = new Date(time);
            let hours = time.getHours();
            let minutes = time.getMinutes();
            let seconds = time.getSeconds();
            time = `${hours}:${minutes}:${seconds}`;
        }
        return time;   
    }

    exist(): boolean{
        return this._id && this.id > 0;
    }


}
