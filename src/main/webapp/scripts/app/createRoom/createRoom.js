/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */

angular.module("onlineVideoTutorialsApp")

    .config(function($stateProvider ) {

        $stateProvider
            
            .state('index.createRoom', {
                url: "createRoom",
                views:{
                    'content@':{
                        templateUrl: "scripts/app/createRoom/createRoom.html",
                        controller: "createRoomCtrl"
                    },
                },
                
            })
           
    })
    