/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */

/**
*
* Here are the events triggered by server messages, that are reachable through the EventsEmitter class.
*/



import { EventEmitter, Injectable } from '@angular/core'; 

import { HandlerService} from './handler.service';
 


var SingletonEvents =(function(){
        
    let events: Object;
        
    function createInstance(){
        return {
            showComponent : new EventEmitter(),
            login : new EventEmitter(),
            newAvaibleRoom : new EventEmitter(),
            allAvaibleRooms : new EventEmitter(),
            avaibleRoomLess: new EventEmitter(),
            participantInRoom: new EventEmitter(),
            participantLess: new EventEmitter(),
            videoAnswer: new EventEmitter(),
            iceCandidate: new EventEmitter()
        }
    };
        
    return {
        getInstance: function(){
            if (!events){
                events = createInstance();
            }
            return events;
        }
    };
})();
        

var events = (function(){
    let events = SingletonEvents.getInstance();
        
    return {

        emitShowComponent: function(component : string){
            console.log(`-> emitShowComponent: ${component}`);
            events.showComponent.next(component);
        },


        subscribeToShowComponent: function(component, callback) {
            console.log(`subscribeToShowComponent`);
            return events.showComponent.subscribe(data => callback.call(component, data));
        },


        emitLogin: function(jsonMessage){
            console.log(`-> emitLogin`);
            events.login.next(jsonMessage);
        },

        // Login

        subscribeToLogin: function(component, callback) {
            console.log(`subscribeToLogin`);
            console.log(events.login);
            return events.login.subscribe(data => callback.call(component, data));
        },


        // WaitingRoom

        emitNewAvaibleRoom: function(roomName: string){
            console.log(`-> emitNewAvaibleRoom: ${roomName}`);
            events.newAvaibleRoom.next(roomName);
        },

        subscribeToNewAvaibleRoom: function(component, callback) {
            console.log(`subscribeToNewAvaibleRoom`);
            return events.newAvaibleRoom.subscribe(data => callback.call(component, data));
        },

        emitAllAvaibleRooms: function(roomNames: string[]){
            console.log(`-> emitAllAvaibleRooms: ${roomNames}`);
            events.allAvaibleRooms.next(roomNames);
        },

        subscribeToAllAvaibleRooms: function(component, callback) {
            console.log(`subscribeToAllAvaibleRooms`);
            return events.allAvaibleRooms.subscribe(data => callback.call(component, data));
        },

        emitAvaibleRoomLess: function(roomName: string){
            console.log(`-> emitAvaibleRoomLessRoom`);
            events.avaibleRoomLess.next(roomName);
        },

        subscribeToAvaibleRoomLess: function(component, callback) {
            console.log(`subscribeToAvaibleRoomLessRoom`);
            return events.avaibleRoomLess.subscribe(data => callback.call(component, data));
        },


        // Room

        emitParticipantLess: function(jsonMessage: Object){
            console.log(`-> emitParticipantLess`);
            events.participantLess.next(jsonMessage);
        },

        subscribeToParticipantLess: function(component, callback) {
            console.log(`subscribeToParticipantLess`);
            return events.participantLess.subscribe(data => callback.call(component, data));
        },

        emitParticipantInRoom: function(jsonMessage: Object){
            console.log(`-> emitParticipantInRoom`);
            events.participantInRoom.next(jsonMessage);
        },

        subscribeToParticipantInRoom: function(component, callback) {
            console.log(`subscribeToParticipantInRoom`);
            return events.participantInRoom.subscribe(data => callback.call(component, data));
        },

        emitVideoAnswer: function(jsonMessage: Object){
            console.log(`-> emitVideoAnswer`);
            events.videoAnswer.next(jsonMessage);
        },

        subscribeToVideoAnswer: function(component, callback) {
            console.log(`subscribeToVideoAnswer`);
            return events.videoAnswer.subscribe(data => callback.call(component, data));
        },

        emitIceCandidate: function(jsonMessage: Object){
            console.log(`-> emitIceCandidate`);
            events.iceCandidate.next(jsonMessage);
        },

        subscribeToIceCandidate: function(component, callback) {
            console.log(`subscribeToIceCandidate`);
            return events.iceCandidate.subscribe(data => callback.call(component, data));
        }

    }
})();


var serverListener = function(someHandler) {

    return function(message) {
        let handler = someHandler;
        if (!JSON.parse(message.data).id.includes('iceCandidate')) {
            console.log("<----- A message from the server has arrived");
            console.log(JSON.parse(message.data));
        }    
        if (!handler.handler(message)) { 
            console.log("The handler can't hanler the message");
            let parsedMessage = JSON.parse(message.data);
            switch (parsedMessage.id) {
                case ('login'):
                    console.log("");
                    console.log(`<---------- login ${new Date().toLocaleTimeString()}`);
                    login(parsedMessage);
                    break;
                case ('avaibleRooms'):
                    console.log("");
                    console.log(`<---------- avaibleRooms ${new Date().toLocaleTimeString()}`);
                    avaibleRooms(parsedMessage);
                    break;
                case ('thereIsANewRoom'):
                    console.log("");
                    console.log(`<---------- thereIsANewRoom ${new Date().toLocaleTimeString()}`);
                    thereIsANewRoom(parsedMessage);
                    break;
                case ('thereIsANewParticipant'):
                    console.log("");
                    console.log(`<---------- thereIsANewParticipant ${new Date().toLocaleTimeString()}`);
                    thereIsANewParticipant(parsedMessage);
                    break;
                case ('thereIsAParticipant'):
                    console.log("");
                    console.log(`<---------- thereIsAParticipant ${new Date().toLocaleTimeString()}`);
                    thereIsAParticipant(parsedMessage);
                    break;
                case ('aParticipantHasLeftTheRoom'):
                    console.log("");
                    console.log(`<---------- aParticipantHasLeftTheRoom ${new Date().toLocaleTimeString()}`);
                    aParticipantHasLeftTheRoom(parsedMessage);
                    break;
                case ('thereIsAnAvaibleRoomLess'):
                    console.log("");
                    console.log(`<---------- thereIsAnAvaibleRoomLess ${new Date().toLocaleTimeString()}`);
                    thereIsAnAvaibleRoomLess(parsedMessage);
                    break;
                case ('receiveVideoAnswer'):
                    console.log("");
                    console.log(`<---------- receiveVideoAnswer ${new Date().toLocaleTimeString()}`);
                    receiveVideoAnswer(parsedMessage);
                    break;
                case ('iceCandidate'):
                    console.log("");
                    console.log(`<---------- iceCandidate ${new Date().toLocaleTimeString()}`);
                    iceCandidate(parsedMessage);
                    break;
                case ('server'):
                    console.log(`<---------- $$$ SERVER:  ${parsedMessage.value} ${new Date().toLocaleTimeString()}`);
                    break;
                default:
                    console.error("The message: {}, isn't valid", parsedMessage.id);
                //Events.emitShowComponent('error');
            }
        }    
    }

}    

var login = function (jsonMessage){
    console.log("<- login");
            
    events.emitLogin(jsonMessage);
}

var avaibleRooms = function (jsonMessage){
    console.log("<- avaibleRooms");
            
    events.emitAllAvaibleRooms(jsonMessage.avaibleRoomsNames);
}
        
var thereIsANewRoom = function(jsonMessage){
    console.log(`<- thereIsANewRoom - room:  ${jsonMessage.roomName}`);
            
    events.emitNewAvaibleRoom(jsonMessage.roomName);   
    
}

var aParticipantHasLeftTheRoom = function(jsonMessage){
    console.log(`<- aParticipantHasLeftTheRoom - name:  ${jsonMessage.userName}`)
            
    events.emitParticipantLess(jsonMessage);
}

var thereIsAnAvaibleRoomLess = function(jsonMessage){
    console.log(`<- thereIsAnAvaibleRoomLess: ${jsonMessage.roomName}`);
            
    events.emitAvaibleRoomLess(jsonMessage.roomName);
   
}
        
var thereIsAParticipant = function(jsonMessage){
    console.log("<- thereIsAParticipant");
    
    events.emitParticipantInRoom(jsonMessage);        
}

var thereIsANewParticipant = function(jsonMessage){
    console.log("<- thereIsANewParticipant");
    
    events.emitParticipantInRoom(jsonMessage);        
}

var receiveVideoAnswer = function(jsonMessage){
    console.log("<- receiveVideoAnswer");
    
    events.emitVideoAnswer(jsonMessage);        
}

var iceCandidate = function(jsonMessage){
    console.log("<- iceCandidate");
    
    events.emitIceCandidate(jsonMessage);        
}

var subscriptions = {

    subscribeToShowComponent: function(component, callback) {
        return events.subscribeToShowComponent(component, callback);
    },

    subscribeToLogin: function(component, callback) {
        return events.subscribeToLogin(component, callback);
    },

    subscribeToNewAvaibleRoom: function(component, callback) {
        return events.subscribeToNewAvaibleRoom(component, callback);
    },

    subscribeToAllAvaibleRooms: function(component, callback) {
        return events.subscribeToAllAvaibleRooms(component, callback);
    },

    subscribeToAvaibleRoomLess: function(component, callback) {
        return events.subscribeToAvaibleRoomLess(component, callback);
    },

    subscribeToParticipantLess: function(component, callback) {
        return events.subscribeToParticipantLess(component, callback);
    },

    subscribeToParticipantInRoom: function(component, callback) {
        return events.subscribeToParticipantInRoom(component, callback);
    },

    subscribeToVideoAnswer: function(component, callback) {
        return events.subscribeToVideoAnswer(component, callback);
    },

    subscribeToIceCandidate: function(component, callback) {
        return events.subscribeToIceCandidate(component, callback);
    }
} 



/**
* It emit some events triggered by the events and allows to subscribe to these events
*/

@Injectable()
export class EventsEmitter{
    
    // Listens the messages sent by the server and triggers some event
    private _serverListener: Object;

    // The events subscriptions
    private _subscriptions: Object;
    
    constructor(private handler: HandlerService){
        console.log("EventsEmitter constructor");
        this._serverListener = serverListener(handler);
        this._subscriptions = subscriptions;
        
    };
    
    public get serverListener(): Object {
        return this._serverListener;
    }
    
    public get subscriptions(): Object {
        return this._subscriptions;
    }
    
}