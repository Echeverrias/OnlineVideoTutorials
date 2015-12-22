/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
//var user;

angular.module("onlineVideoTutorialsApp")

    
   .factory("connection", ["shared", "utilities", "$rootScope", "tutorType", "studentType", "room",
     function(shared, utilities,$rootScope, tutorType, studentType, room){
        
        function connecting (){
            console.log("web socket has been created");
            return new WebSocket('ws://localhost:8080/ovt');
        }
        var service = {};
        var ws = connecting();
          
       
        ws.onmessage = function(message){
            parsedMessage = JSON.parse(message.data);
            switch (parsedMessage.id){
            case('login'):
                login(parsedMessage);
                break;
            case('joinedIntoRoom'):
                joinedIntoRoom(parsedMessage);
                break;
            case('thereIsANewRoom'):
                thereIsANewRoom(parsedMessage);
                break;
            case('thereIsANewParticipant'):
                thereIsANewParticipant(parsedMessage);
                break;
            case('aParticipantHasLeftTheRoom'):
                aParticipantHasLeftTheRoom(parsedMessage);
                break;
            case('thereIsARoomLess'):
                thereIsARoomLess(parsedMessage);
                break;
            default:
                console.error("The message: {}, isn't valid", parsedMessage.id);   
                utilities.goToState('error');
            }
        }
               
        
        service.ws = ws;
        
        
        var login = function (jsonMessage){
            console.log("-> login");
            console.log(Object.getOwnPropertyNames(jsonMessage));
            
            if (jsonMessage.validUser){
                console.log("login - rooms: " + jsonMessage.rooms);
                console.log("Type user: " + jsonMessage.userType);
                
                shared.addMyName(jsonMessage.userName);
                
                if (jsonMessage.userType === tutorType){
                    console.log("You are a tutor");
                    
                    room.addMe(new User(jsonMessage.userName, jsonMessage.userType));
                    console.log("tutor created: " + room.getMe().name);
                    console.log("tutor created: " + Object.getOwnPropertyNames(room));
                    
                    room.setRoomName(jsonMessage.userName);
                    
                    utilities.goToState('index.room');
                    console.log("# go to index.room");
                }
                else{
                    
                    console.log("You are an student");
                    console.log("Rooms: " + shared.getRooms() + ": "+ typeof(shared.getRooms));
                    shared.setAvaiblesRooms(jsonMessage.rooms);
                    
                    utilities.goToState('index.selectRoom');
                    
                }
                    
            }
            else {
                alert("Invalid user name or password");
                console.error(jsonMessage.id);
                console.error(jsonMessage.validUser);
                console.error(jsonMessage.typeUSer);
                console.error("Invalid user");
                
            }
        }
        
        var joinedIntoRoom = function(jsonMessage){
            console.log("-> joinedIntoRoom");
            
            room.addMe(new User(shared.getMyName(), studentType));
            
            shared.addTutorName(jsonMessage.tutorName);
            
            room.addMainParticipant(new User(jsonMessage.tutorName, tutorType));
            console.log("tutor created: " + room.getMainParticipant().name);
            
            students = jsonMessage.studentsNames;
            for (i in students){
                room.addParticipant(new User(students[i], studentType));
                console.log("student created: " + students[i]);
            }
            
            room.setRoomName(jsonMessage.roomName);
            
            utilities.goToState('index.room');
            
            //$rootScope.$broadcast('handlerUpdateParticipants');
        }
        
        var thereIsANewRoom = function(jsonMessage){
            console.log("-> thereIsANewRoom - room: " + jsonMessage.room);
            
            var room = jsonMessage.room;
            
            shared.addAvaibleRoom(room);   
            $rootScope.$broadcast('handlerUpdateRooms');
        }
        
        var thereIsANewParticipant = function(jsonMessage){
            console.log("-> thereIsANewParticipant - participant: " + jsonMessage.studentName);
            
            var studentName = jsonMessage.studentName;
            room.addParticipant(new User(studentName, studentType));
            console.log("student created: " + studentName);
            
            $rootScope.$broadcast('handlerUpdateParticipants', studentName);
        }
        
         var aParticipantHasLeftTheRoom = function(jsonMessage){
            console.log("-> aParticipantHasLeftTheRoom - name: " + jsonMessage.userName)
            
            if(jsonMessage.userType === tutorType){
                room.deleteTutor();
            }
            else{
                room.deleteStudent(jsonMessage.userName);
            }
            $rootScope.$broadcast('handlerUpdateParticipants', jsonMessage.userName);
            console.log("shared.room: " + shared.getRooms());
        }
        
        var thereIsARoomLess = function(jsonMessage){
            console.log("-> thereIsARoomLess - room: " + jsonMessage.room);
            
            var room = jsonMessage.room;
            console.log("shared.room: " + shared.getRooms());
            shared.removeRoom(jsonMessage.room);
            $rootScope.$broadcast('handlerUpdateRooms');
        }
        
        return {
            /**
             * 
             * @param {type} jsonMessage
             * @returns {undefined}
             */
            sendMessage: function (jsonMessage){
                console.log("I'm going to send a message");
            
                stringifyMessage = JSON.stringify(jsonMessage);
                console.log(stringifyMessage);
                service.ws.send(stringifyMessage);
            
                console.log("The message has been send");
            }    
        }  ; 
        
       
    }])