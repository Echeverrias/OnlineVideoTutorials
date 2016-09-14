

angular.module("onlineVideoTutorialsApp")

    .config(function($stateProvider ) {

        $stateProvider
            
           .state('index.selectRoom', {
              url: "selectRoom",
              views:{
                  'content@':{
                        templateUrl: "scripts/app/selectRoom/selectRoom.html",
                        controller: "selectRoomCtrl"
                     },
                 },
                
            })
           
    })
    