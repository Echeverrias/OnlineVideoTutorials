

angular.module("onlineVideoTutorialsApp")

    .controller("selectRoomCtrl", ["$scope", "shared", "connection", "$rootScope", "room", "$state",
        function($scope, shared, connection, $rootScope, room, $state) {
        
        console.log("* selectRoomCtrl");
        $scope.rooms = shared.getRooms();
        $scope.room ="";
        $scope.userName = shared.getMyName();
        
        $scope.$on('handlerUpdateRooms', function(event) {
            console.log("handlerUpdateRooms");
            $scope.$apply();
         });  
          
        
        $scope.joinRoom = function(room){
            console.log("selectRoom");
            var jsonMessage = {
                id:"joinRoom",
                roomName: room,
                userName: $scope.userName
            };
            connection.sendMessage(jsonMessage);
            
        ;}
    
    
        
    }])
    