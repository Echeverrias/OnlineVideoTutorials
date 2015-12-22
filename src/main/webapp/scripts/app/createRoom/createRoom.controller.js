/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */

angular.module("onlineVideoTutorialsApp")

    .controller("createRoomCtrl", ["$scope","connection","shared","utilities", function($scope, connection, shared, utilities ) {
     console.log("* createRoomCtrl");
            
      $scope.name = shared.getMyName();
       
       $scope.openRoom = function(){
           console.log("openRoom");
           
           var jsonMessage;
           jsonMessage.id = "openRoom";
           connection.sendMessage(jsonMessage);
       };  
       
       $scope.exit = function() {
           console.log("exit");
           
           utilities.goToState(index.login);
       }
    }])
    