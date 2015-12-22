/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
*/

angular.module("onlineVideoTutorialsApp")

    
    
    .factory("room", ["tutorType",function(tutorType){
        var room = {
            name : "",
            me : {},
            mainParticipant : null, // the tutor if I am a student
            participants : {}, // the tutor and me are not included
        }
        
        return {
            
            addUser: function(user){
                if (user.type === tutorType) {
                    //room.mainParticipant = user;
                }    
                else {
                     eval("room.participants." + user.name + "=user" );
                }
            },
            addMe: function(user){
                room.me = user;
           },
            addMainParticipant: function(user){
                room.mainParticipant = user;
            },
            addParticipant: function(user){
                
                if ((this.getNumberOfStudents() === 0) && (this.amITutor())){
                    console.log("Added to the tutor the first student")
                    this.addMainParticipant(user);
                }
                else{
                    eval("room.participants." + user.name + "=user" );
                }
            },
            amITutor: function(){
                return (room.me.type === tutorType);
            },
            amIStudent: function(){
                return !this.amITutor();
            },
            getMe: function(){
                return room.me;
            },
            getMainParticipant: function(){
                return room.mainParticipant;
            },
            getParticipants: function(){
                return room.participants;
            },
            getNumberOfStudents: function(){
                var numberOfStudents = Object.keys(room.participants).length;
                console.log("getNumberOfStudents(): " + numberOfStudents);
                if (this.amITutor()){
                    if (room.mainParticipant !== null){
                        console.log("I am a tutor and there is a main participant in the room");    
                        numberOfStudents ++; // there is a main participant
                    }
                }
                return numberOfStudents;
            },
            setRoomName: function(roomName){
                room.name = roomName;
            },
            getRoomName: function(){
                return room.name;
            },
            deleteTutor:function(){
              room.mainParticipant.close();
              room.mainParticipant = {};
            },
            deleteStudent:function(studentName){
              eval("room.participants." + studentName + ".close()");
              eval("delete room.participants." + studentName);
            },
            reset: function(){ // need to be implemented, the release of all the webRtcPeers
                room.name = "";
                room.me = {};
                room.mainParticipant = {};
                room.participants = [];
            }
            
        }
    }])

    

