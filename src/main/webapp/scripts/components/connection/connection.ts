/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
import {EventEmitter} from 'angular2/angular2'; 

console.log("Module Connection");

    
    var SingletonEvents =(function(){
        
        let events: Object;
        
        function createInstance(){
            return{
                showComponent : new EventEmitter(),
                login : new EventEmitter(),
                newAvaibleRoom : new EventEmitter(),
                allAvaibleRooms : new EventEmitter(),
                avaibleRoomLess: new EventEmitter(),
                participantInRoom: new EventEmitter(),
                participantLess: new EventEmitter(),
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
        
    var events = function(){
        var events = SingletonEvents.getInstance();
        
    return {
        
        emitShowComponent: function(component : string){
            console.log(`-> emitShowComponent: ${component}`);
            events.showComponent.next(component);
        },
    
      
        subscribeToShowComponent: function(component, callback) {
             console.log(`subscribeToShowComponent`);
            return events.showComponent.toRx().subscribe(data => callback.call(component, data));
        },
        
        
        emitLogin: function(jsonMessage){
            console.log(`-> emitLogin`);
            events.login.next(jsonMessage);
        },
    
        subscribeToLogin: function(component, callback) {
            console.log(`subscribeToLogin`);
            return events.login.toRx().subscribe(data => callback.call(component, data));
        },
        
        emitNewAvaibleRoom: function(roomName: string){
            console.log(`-> emitNewAvaibleRoom: ${roomName}`);
            events.newAvaibleRoom.next(roomName);
        },
    
        subscribeToNewAvaibleRoom: function(component, callback) {
            console.log(`subscribeToNewAvaibleRoom`);
            return events.newAvaibleRoom.toRx().subscribe(data => callback.call(component, data));
        },
        
        emitAllAvaibleRooms: function(roomNames: string[]){
            console.log(`-> emitAllAvaibleRooms: ${roomNames}`);
            events.allAvaibleRooms.next(roomNames);
        },
    
        subscribeToAllAvaibleRooms: function(component, callback) {
            console.log(`subscribeToNewAvaibleRooms`);
            return events.allAvaibleRooms.toRx().subscribe(data => callback.call(component, data));
        },
        
        emitAvaibleRoomLess: function(roomName: string){
            console.log(`-> emitAvaibleRoomLessRoom`);
            events.avaibleRoomLess.next(roomName);
        },
    
        subscribeToAvaibleRoomLess: function(component, callback) {
            console.log(`subscribeToAvaibleRoomLessRoom`);
            return events.avaibleRoomLess.toRx().subscribe(data => callback.call(component, data));
        },
        
        
        emitParticipantLess: function(jsonMessage: Object){
            console.log(`-> emitParticipantLess`);
            events.participantLess.next(jsonMessage);
        },
    
        subscribeToParticipantLess: function(component, callback) {
            console.log(`subscribeToParticipantLess`);
            return events.participantLess.toRx().subscribe(data => callback.call(component, data));
        },
        
        
        
        emitParticipantInRoom: function(jsonMessage: Object){
            console.log(`-> emitParticipantInRoom`);
            events.participantInRoom.next(jsonMessage);
        },
    
        subscribeToParticipantInRoom: function(component, callback) {
            console.log(`subscribeToParticipantInRoom`);
            return events.participantInRoom.toRx().subscribe(data => callback.call(component, data));
        }
        
    }
}


export class Connection {
    
    
    private _ws;
    private _events: Object;
   
    constructor(){
        
    
        this._events = events();
        this._ws = new WebSocket('ws://localhost:8080/ovt');
        this._ws.onmessage = serverListener;
        
    }
    
    get events(): Object{
        return this._events;
    }
    
    sendMessage(jsonMessage){
        console.log("I'm going to send a message");
            
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
                login(parsedMessage);
                break;
            case('thereIsANewRoom'):
                thereIsANewRoom(parsedMessage);
                break;    
            case('thereIsANewParticipant'):
                thereIsANewParticipant(parsedMessage);
                break;
            case('thereIsAParticipant'):
                thereIsAParticipant(parsedMessage);
                break;
            case('aParticipantHasLeftTheRoom'):
                aParticipantHasLeftTheRoom(parsedMessage);
                break;
            case('thereIsAnAvaibleRoomLess'):
                thereIsAnAvaibleRoomLess(parsedMessage);
                break;    
                
            /*     
            case('thereIsANewParticipant'):
                thereIsANewParticipant(parsedMessage);
                break;
            
            */    
            default:
                console.error("The message: {}, isn't valid", parsedMessage.id);   
                //Events.emitShowComponent('error');
            }
    }

var login = function (jsonMessage){
    console.log("-> login");
            
    events().emitLogin(jsonMessage);
}
        
var thereIsANewRoom = function(jsonMessage){
    console.log("-> thereIsANewRoom - room: " + jsonMessage.roomName);
            
    events().emitNewAvaibleRoom(jsonMessage.roomName);   
    
}

var aParticipantHasLeftTheRoom = function(jsonMessage){
    console.log("-> aParticipantHasLeftTheRoom - name: " + jsonMessage.userName)
            
    events().emitParticipantLess(jsonMessage);
}

var thereIsAnAvaibleRoomLess = function(jsonMessage){
    console.log(`-> thereIsAnAvaibleRoomLess: ${jsonMessage.roomName}`);
            
    events().emitAvaibleRoomLess(jsonMessage.roomName);
   
}
        
        
var thereIsAParticipant = function(jsonMessage){
    console.log("-> thereIsAParticipant");
    
    events().emitParticipantInRoom(jsonMessage);        
}

var thereIsANewParticipant = function(jsonMessage){
    console.log("-> thereIsANewParticipant");
    
    events().emitParticipantInRoom(jsonMessage);        
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

