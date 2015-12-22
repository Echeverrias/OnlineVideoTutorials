/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */


angular.module("onlineVideoTutorialsApp")

    
    .controller('roomController',["$scope","$rootScope","room","shared","tutorType","utilities", "connection",
     function($scope, $rootScope, room, shared, tutorType,utilities, connection){
            console.log("* roomController - room: " + room.getRoomName());
            console.log("room's participants: " + room.getNumberOfStudents());
            
            $scope.mainVideo = "";
            $scope.user = room.getMe();
            $scope.participants = room.getParticipants();
            console.log("$scope.participants: " + Object.keys($scope.participants));
            if ($scope.user.type !== tutorType){
                $scope.mainVideo = shared.getTutorName();
            }
            
            $scope.$on("handlerUpdateParticipants", function(event, student){
                console.log("handlerUpdateParticipants - new participant: " + student);
                console.log(Object.keys(room.getParticipants()));
                console.log("room.getNumberOfStudents: " + room.getNumberOfStudents());
                // Si entra en la sala el primer estudiante
                if ((room.getNumberOfStudents() === 1) && (room.amITutor())){
                    $scope.mainVideo = room.getMainParticipant().name;
                }
                
                $scope.$apply();
                console.log(Object.keys(room.getParticipants()));
                console.log("room.getNumberOfStudents: " + room.getNumberOfStudents());
            })
            
            $scope.exitRoom = function(){
                
                var jsonMessage = {};
                jsonMessage.id = "exitRoom";
                jsonMessage.roomName = room.getRoomName();
                console.log("Me: " + Object.getOwnPropertyNames(room.getMe()));
                console.log("My name: " + room.getMe().name);
                console.log("My room: " + room.getRoomName());
                jsonMessage.userName = room.getMe().name;
                jsonMessage.userType = room.getMe().type;
                
                connection.sendMessage(jsonMessage);
                
                if ($scope.user.type === tutorType){
                   
                   utilities.goToState("index.createRoom");
                    
                }
                else{
                    
                   utilities.goToState("index.selectRoom");
                   
                }
                
                room.reset();
            }
            
    }])

   