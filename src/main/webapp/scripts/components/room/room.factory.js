/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
*/

angular.module("onlineVideoTutorialsApp")

    
    
    .factory("room", ["tutorType",function(tutorType){
        var room = {
            name : "",
            me : {},
            tutor : {},
            students : [],
        }
        
        return {
            
            addUser: function(user){
                if (user.userType === tutorType) {
                    room.tutor = user;
                }    
                else {
                    room.students.push(user)
                }
            },
            addMe: function(user){
                room.me = user;
                if (room.me.userType === tutorType){
                    room.tutor = room.me;
                }
            },
            addTutor: function(user){
                room.tutor = user;
            },
            addStudent: function(user){
                eval("room.students." + user.name + "=user" );
            },
            amITutor: function(){
                return (room.me.userType === tutorType);
            },
            amIStudent: function(){
                return !amITutor();
            },
            getMe: function(){
                return room.me;
            },
            getTutor: function(){
                return room.tutor;
            },
            getStudents: function(){
                return room.students;
            },
            setRoomName: function(roomName){
                room.name = roomName;
            },
            getRoomName: function(){
                return room.name;
            },
            deleteTutor:function(){
              room.tutor.close();
              room.tutor = {};
            },
            deleteStudent:function(studentName){
              eval("room.students." + studentName + ".close()");
              eval("delete room.students." + studentName);
            },
            reset: function(){ // need to be implemented, the release of all the webRtcPeers
                room.name = "";
                room.me = {};
                room.tutor = {};
                room.students = [];
            }
            
        }
    }])

    

