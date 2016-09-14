/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */


angular.module("onlineVideoTutorialsApp")

    // This factory provides information to the controllers
    .factory("shared", ["$injector", "$rootScope", function($injector, $rootScope){
        
        var shared = {
            rooms: [], // The names of the avaibles rooms
            myName: "",
            tutorName: "",
            studentsNames: [], // The students of a room
        };
        
        
        return {
            
            setAvaiblesRooms : function (rooms){
                console.log("setAvaiblesRooms - rooms: " + rooms);
                shared.rooms = rooms;
                console.log("shared.rooms: " + shared.rooms);
            },
            addAvaibleRoom:function (room){
              shared.rooms.push(room);  
            },
            removeRoom: function (room){
              console.log("removeRoom - shared.rooms: " + shared.rooms);  
              var i = shared.rooms.indexOf(room);
              console.log("removeRoom: " + room + " = " + shared.rooms[i]);
              shared.rooms.splice(i,1);
              console.log("shared.rooms: " + shared.rooms);
            },
            addMyName : function (myName){
                shared.myName =  myName;
            },
            addTutorName : function (tutorName){
                shared.tutorName =  tutorName;
            },
            addStudentsNames : function (studentsNames){
                shared.studentsNames =  studentsNames;
            },
            getRooms : function (){
                return shared.rooms;
            },
            getMyName : function (){
                return shared.myName;
            },
            getTutorName : function (){
                return shared.tutorName;
            },
            getStudentsNames : function (){
                return shared.studentsNames;
            } 
        }
        
        
    }])

   

