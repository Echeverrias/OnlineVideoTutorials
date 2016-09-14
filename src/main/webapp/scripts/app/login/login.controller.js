/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */


angular.module('onlineVideoTutorialsApp')

    .controller('loginCtrl', ['$scope', "connection", "$rootScope", function($scope, connection, $rootScope){
     console.log("* loginCtrl");
        
        $scope.user = {};
        
        $scope.login = function(){
                console.log("login");
                console.log("Name: " + $scope.user.name);
                console.log("Password: " + $scope.user.password);
                //webSocket.connect();
                var jsonMessage = {
                    id: "login",
                    name: $scope.user.name,
                    password: $scope.user.password,
                };
               
                console.log("connection" + Object.getOwnPropertyNames(connection));
                console.log("connection.ws" + connection.ws);
                
                connection.sendMessage(jsonMessage);
               
            }
    }])
