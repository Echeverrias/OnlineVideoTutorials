/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */


angular.module("onlineVideoTutorialsApp")

    
    .controller('roomController',["$scope","$rootScope","room","shared","tutorType","utilities", "connection",
     function($scope, $rootScope, room, shared, tutorType,utilities, connection){
            console.log("* roomController - room: " + room.getRoomName());
            
            $scope.mainVideo = "";
            $scope.user = room.getMe();
            
            if ($scope.user.type !== tutorType){
                $scope.mainVideo = shared.getTutorName();
            }
            
            $scope.$on()("handlerUpdateParticipants", function(event, student){
                console.log("handlerUpdateParticipants - new participant: " + student);
                
                // Si entra en la sala el primer estudiante
                if ((room.getSudents.length === 0) && (shared.AmITutor())){
                    $scope.mainVideo = student;
                    $scope.$apply();
                } 
                
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

   