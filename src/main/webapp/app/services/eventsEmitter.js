/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 *
 */
"use strict";
/**
*
* Here are the events triggered by server messages, that are reachable through the EventsEmitter class.
*/
var core_1 = require('@angular/core');
var SingletonEvents = (function () {
    var events;
    function createInstance() {
        return {
            showComponent: new core_1.EventEmitter(),
            login: new core_1.EventEmitter(),
            newAvaibleRoom: new core_1.EventEmitter(),
            allAvaibleRooms: new core_1.EventEmitter(),
            avaibleRoomLess: new core_1.EventEmitter(),
            participantInRoom: new core_1.EventEmitter(),
            participantLess: new core_1.EventEmitter(),
            videoAnswer: new core_1.EventEmitter(),
            iceCandidate: new core_1.EventEmitter()
        };
    }
    ;
    return {
        getInstance: function () {
            if (!events) {
                events = createInstance();
            }
            return events;
        }
    };
})();
var events = (function () {
    var events = SingletonEvents.getInstance();
    return {
        emitShowComponent: function (component) {
            console.log("-> emitShowComponent: " + component);
            events.showComponent.next(component);
        },
        subscribeToShowComponent: function (component, callback) {
            console.log("subscribeToShowComponent");
            return events.showComponent.subscribe(function (data) { return callback.call(component, data); });
        },
        emitLogin: function (jsonMessage) {
            console.log("-> emitLogin");
            events.login.next(jsonMessage);
        },
        subscribeToLogin: function (component, callback) {
            console.log("subscribeToLogin");
            console.log(events.login);
            return events.login.subscribe(function (data) { return callback.call(component, data); });
        },
        emitNewAvaibleRoom: function (roomName) {
            console.log("-> emitNewAvaibleRoom: " + roomName);
            events.newAvaibleRoom.next(roomName);
        },
        subscribeToNewAvaibleRoom: function (component, callback) {
            console.log("subscribeToNewAvaibleRoom");
            return events.newAvaibleRoom.subscribe(function (data) { return callback.call(component, data); });
        },
        emitAllAvaibleRooms: function (roomNames) {
            console.log("-> emitAllAvaibleRooms: " + roomNames);
            events.allAvaibleRooms.next(roomNames);
        },
        subscribeToAllAvaibleRooms: function (component, callback) {
            console.log("subscribeToAllAvaibleRooms");
            return events.allAvaibleRooms.subscribe(function (data) { return callback.call(component, data); });
        },
        emitAvaibleRoomLess: function (roomName) {
            console.log("-> emitAvaibleRoomLessRoom");
            events.avaibleRoomLess.next(roomName);
        },
        subscribeToAvaibleRoomLess: function (component, callback) {
            console.log("subscribeToAvaibleRoomLessRoom");
            return events.avaibleRoomLess.subscribe(function (data) { return callback.call(component, data); });
        },
        emitParticipantLess: function (jsonMessage) {
            console.log("-> emitParticipantLess");
            events.participantLess.next(jsonMessage);
        },
        subscribeToParticipantLess: function (component, callback) {
            console.log("subscribeToParticipantLess");
            return events.participantLess.subscribe(function (data) { return callback.call(component, data); });
        },
        emitParticipantInRoom: function (jsonMessage) {
            console.log("-> emitParticipantInRoom");
            events.participantInRoom.next(jsonMessage);
        },
        subscribeToParticipantInRoom: function (component, callback) {
            console.log("subscribeToParticipantInRoom");
            return events.participantInRoom.subscribe(function (data) { return callback.call(component, data); });
        },
        emitVideoAnswer: function (jsonMessage) {
            console.log("-> emitVideoAnswer");
            events.videoAnswer.next(jsonMessage);
        },
        subscribeToVideoAnswer: function (component, callback) {
            console.log("subscribeToVideoAnswer");
            return events.videoAnswer.subscribe(function (data) { return callback.call(component, data); });
        },
        emitIceCandidate: function (jsonMessage) {
            console.log("-> emitIceCandidate");
            events.iceCandidate.next(jsonMessage);
        },
        subscribeToIceCandidate: function (component, callback) {
            console.log("subscribeToIceCandidate");
            return events.iceCandidate.subscribe(function (data) { return callback.call(component, data); });
        }
    };
})();
var serverListener = function (message) {
    console.log("<----- A message from the server has arrived");
    console.log(JSON.parse(message.data));
    var parsedMessage = JSON.parse(message.data);
    switch (parsedMessage.id) {
        case ('login'):
            console.log("");
            console.log("<---------- login " + new Date().toLocaleTimeString());
            login(parsedMessage);
            break;
        case ('avaibleRooms'):
            console.log("");
            console.log("<---------- avaibleRooms " + new Date().toLocaleTimeString());
            avaibleRooms(parsedMessage);
            break;
        case ('thereIsANewRoom'):
            console.log("");
            console.log("<---------- thereIsANewRoom " + new Date().toLocaleTimeString());
            thereIsANewRoom(parsedMessage);
            break;
        case ('thereIsANewParticipant'):
            console.log("");
            console.log("<---------- thereIsANewParticipant " + new Date().toLocaleTimeString());
            thereIsANewParticipant(parsedMessage);
            break;
        case ('thereIsAParticipant'):
            console.log("");
            console.log("<---------- thereIsAParticipant " + new Date().toLocaleTimeString());
            thereIsAParticipant(parsedMessage);
            break;
        case ('aParticipantHasLeftTheRoom'):
            console.log("");
            console.log("<---------- aParticipantHasLeftTheRoom " + new Date().toLocaleTimeString());
            aParticipantHasLeftTheRoom(parsedMessage);
            break;
        case ('thereIsAnAvaibleRoomLess'):
            console.log("");
            console.log("<---------- thereIsAnAvaibleRoomLess " + new Date().toLocaleTimeString());
            thereIsAnAvaibleRoomLess(parsedMessage);
            break;
        case ('receiveVideoAnswer'):
            console.log("");
            console.log("<---------- receiveVideoAnswer " + new Date().toLocaleTimeString());
            receiveVideoAnswer(parsedMessage);
            break;
        case ('iceCandidate'):
            console.log("");
            console.log("<---------- iceCandidate " + new Date().toLocaleTimeString());
            iceCandidate(parsedMessage);
            break;
        case ('server'):
            console.log("<---------- $$$ SERVER:  " + parsedMessage.value + " " + new Date().toLocaleTimeString());
            break;
        default:
            console.error("The message: {}, isn't valid", parsedMessage.id);
    }
};
var login = function (jsonMessage) {
    console.log("<- login");
    events.emitLogin(jsonMessage);
};
var avaibleRooms = function (jsonMessage) {
    console.log("<- avaibleRooms");
    events.emitAllAvaibleRooms(jsonMessage.avaibleRoomsNames);
};
var thereIsANewRoom = function (jsonMessage) {
    console.log("<- thereIsANewRoom - room:  " + jsonMessage.roomName);
    events.emitNewAvaibleRoom(jsonMessage.roomName);
};
var aParticipantHasLeftTheRoom = function (jsonMessage) {
    console.log("<- aParticipantHasLeftTheRoom - name:  " + jsonMessage.userName);
    events.emitParticipantLess(jsonMessage);
};
var thereIsAnAvaibleRoomLess = function (jsonMessage) {
    console.log("<- thereIsAnAvaibleRoomLess: " + jsonMessage.roomName);
    events.emitAvaibleRoomLess(jsonMessage.roomName);
};
var thereIsAParticipant = function (jsonMessage) {
    console.log("<- thereIsAParticipant");
    events.emitParticipantInRoom(jsonMessage);
};
var thereIsANewParticipant = function (jsonMessage) {
    console.log("<- thereIsANewParticipant");
    events.emitParticipantInRoom(jsonMessage);
};
var receiveVideoAnswer = function (jsonMessage) {
    console.log("<- receiveVideoAnswer");
    events.emitVideoAnswer(jsonMessage);
};
var iceCandidate = function (jsonMessage) {
    console.log("<- iceCandidate");
    events.emitIceCandidate(jsonMessage);
};
var subscriptions = {
    subscribeToShowComponent: function (component, callback) {
        return events.subscribeToShowComponent(component, callback);
    },
    subscribeToLogin: function (component, callback) {
        return events.subscribeToLogin(component, callback);
    },
    subscribeToNewAvaibleRoom: function (component, callback) {
        return events.subscribeToNewAvaibleRoom(component, callback);
    },
    subscribeToAllAvaibleRooms: function (component, callback) {
        return events.subscribeToAllAvaibleRooms(component, callback);
    },
    subscribeToAvaibleRoomLess: function (component, callback) {
        return events.subscribeToAvaibleRoomLess(component, callback);
    },
    subscribeToParticipantLess: function (component, callback) {
        return events.subscribeToParticipantLess(component, callback);
    },
    subscribeToParticipantInRoom: function (component, callback) {
        return events.subscribeToParticipantInRoom(component, callback);
    },
    subscribeToVideoAnswer: function (component, callback) {
        return events.subscribeToVideoAnswer(component, callback);
    },
    subscribeToIceCandidate: function (component, callback) {
        return events.subscribeToIceCandidate(component, callback);
    }
};
/**
* It emit some events triggered by the events and allows to subscribe to these events
*/
var EventsEmitter = (function () {
    function EventsEmitter() {
        this._serverListener = serverListener;
        this._subscriptions = subscriptions;
    }
    ;
    Object.defineProperty(EventsEmitter.prototype, "serverListener", {
        get: function () {
            return this._serverListener;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EventsEmitter.prototype, "subscriptions", {
        get: function () {
            return this._subscriptions;
        },
        enumerable: true,
        configurable: true
    });
    return EventsEmitter;
}());
exports.EventsEmitter = EventsEmitter;
//# sourceMappingURL=eventsEmitter.js.map