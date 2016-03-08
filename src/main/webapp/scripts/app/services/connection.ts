/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
import {EventEmitter, Injectable} from 'angular2/core'; 


console.log("Module Connection");

    
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
    var events = SingletonEvents.getInstance();
        
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

        subscribeToLogin: function(component, callback) {
            console.log(`subscribeToLogin`);
            return events.login.subscribe(data => callback.call(component, data));
        },

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
        }

        emitVideoAnswer: function(jsonMessage: Object){
            console.log(`-> emitVideoAnswer`);
            events.videoAnswer.next(jsonMessage);
        },

        subscribeToVideoAnswer: function(component, callback) {
            console.log(`subscribeToVideoAnswer`);
            return events.videoAnswer.subscribe(data => callback.call(component, data));
        }

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

@Injectable()
export class Connection {
    
    
    private _ws;
    private _events: Object;
   
    constructor(){
        
        console.log(`% Connection`);
    
        this._events = events;
        this._ws = new WebSocket('ws://localhost:8080/ovt');
        this._ws.onmessage = serverListener;
        
    }
    
    get events(): Object{
        return this._events;
    }
    
    sendMessage(jsonMessage){
        
        console.log("----------> " + jsonMessage.id);
        console.log("(" + new Date().toLocaleTimeString() + ")");
        console.log(`-> message: ${JSON.stringify(jsonMessage)}`);
            
        let stringifyMessage = JSON.stringify(jsonMessage);
        console.log(stringifyMessage);
        this._ws.send(stringifyMessage);
            
        console.log("The message has been send");
    }
    
   
    
    
}

var serverListener = function(message){
    
    let parsedMessage = JSON.parse(message.data);
            switch (parsedMessage.id){
            case('login'):
                console.log("");
                console.log("<---------- login");
                console.log("* " + new Date().toLocaleTimeString());
                login(parsedMessage);
                break;
            case('avaibleRooms'):
                 console.log("");
                console.log("<---------- avaibleRooms");
                console.log("* " + new Date().toLocaleTimeString());
                avaibleRooms(parsedMessage);
                break;
            case('thereIsANewRoom'):
                 console.log("");
                console.log("<---------- thereIsANewRoom");
                console.log("* " + new Date().toLocaleTimeString());
                thereIsANewRoom(parsedMessage);
                break;    
            case('thereIsANewParticipant'):
                 console.log("");
                console.log("<---------- thereIsANewParticipant");
                console.log("* " + new Date().toLocaleTimeString());
                thereIsANewParticipant(parsedMessage);
                break;
            case('thereIsAParticipant'):
                 console.log("");
                console.log("<---------- thereIsAParticipant");
                console.log("* " + new Date().toLocaleTimeString());
                thereIsAParticipant(parsedMessage);
                break;
            case('aParticipantHasLeftTheRoom'):
                 console.log("");
                console.log("<---------- aParticipantHasLeftTheRoom");
                console.log("* " + new Date().toLocaleTimeString());
                aParticipantHasLeftTheRoom(parsedMessage);
                break;
            case('thereIsAnAvaibleRoomLess'):
                 console.log("");
                console.log("<---------- thereIsAnAvaibleRoomLess");
                console.log("* " + new Date().toLocaleTimeString());
                thereIsAnAvaibleRoomLess(parsedMessage);
                break;    
            case('receiveVideoAnswer'):
                 console.log("");
                console.log("<---------- receiveVideoAnswer");
                console.log("* " + new Date().toLocaleTimeString());
                receiveVideoAnswer(parsedMessage);
                break;
            case('iceCandidate'):
                 console.log("");
                console.log("<---------- iceCandidate");
                console.log("* " + new Date().toLocaleTimeString());
                iceCandidate(parsedMessage);
                break;
            default:
                console.error("The message: {}, isn't valid", parsedMessage.id);   
                //Events.emitShowComponent('error');
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
    console.log("<- thereIsANewRoom - room: " + jsonMessage.roomName);
            
    events.emitNewAvaibleRoom(jsonMessage.roomName);   
    
}

var aParticipantHasLeftTheRoom = function(jsonMessage){
    console.log("<- aParticipantHasLeftTheRoom - name: " + jsonMessage.userName)
            
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
  
    /*      

        
var thereIsANewParticipant = function(jsonMessage){
    console.log("-> thereIsANewParticipant - participant: " + jsonMessage.studentName);
            
    var studentName = jsonMessage.studentName;
    room.addParticipant(new User(studentName, studentType));
    console.log("student created: " + studentName);
            
    $rootScope.$broadcast('handlerUpdateParticipants', studentName);
}
        

        

*/

