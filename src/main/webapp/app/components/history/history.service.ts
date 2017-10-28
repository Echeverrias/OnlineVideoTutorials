import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ConnectionService } from './../../services/connection.service';


import { IRoom, Room } from './room';

const ROOMS_HISTORY_URI ="/{userName}/roomshistory";


@Injectable()
export class HistoryService {

    constructor(private connection: ConnectionService, private http: Http){}
    
    getRoomsHistory (userName: string): Observable<Room []>{
        console.log(`getRoomsHistory of:  ${userName}`);
        return this.http.get(this.getRoomsHistoryUrl(userName))
        .map((response : Response) => {
            console.log('response: ', response);
            let rooms: IRoom []= response.json();
            console.log('rooms: ', rooms);
            return rooms.map(room => new Room(room));
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