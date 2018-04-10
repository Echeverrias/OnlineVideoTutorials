import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ConnectionService } from './../../core/connection.service';


import { IRoomHistory, RoomHistory } from './history.types';

const ROOMS_HISTORY_URI ="/{userName}/roomshistory";


@Injectable()
export class HistoryService {
    
    private id:number;

    constructor(private connection: ConnectionService, private http: Http){
        this.id = Math.floor(Math.random() * 99);
        console.log(`HistoryService{${this.id}} constructed`);
    }
    
    getRoomsHistory (userName: string): Observable<RoomHistory []>{
        console.log(`HistoryService{${this.id}}.getRoomsHistory of:  ${userName}`);
        return this.http.get(this.getRoomsHistoryUrl(userName))
        .map((response : Response) => {
            console.log('response: ', response);
            let rooms: IRoomHistory [] = response.json();
            console.log('rooms: ', rooms);
            return rooms.map(room => new RoomHistory(room));
        })
        .catch((error: any) => {
           return  Observable.throw(error);
        })
      
    };

    private getRoomsHistoryUrl(userName: string): string{
        let roomsHistoryUri = ROOMS_HISTORY_URI.replace("{userName}", userName);
        let roomsHistoryUrl = `${this.connection.urlServer}${roomsHistoryUri}`
        console.log(roomsHistoryUrl);
        return roomsHistoryUrl;
    }

    
}