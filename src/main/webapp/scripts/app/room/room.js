/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */

angular.module("onlineVideoTutorialsApp")

    
    
    .config(function($stateProvider) {

      
        $stateProvider
            
            .state('index.room', {
                url:"room",
                views:{
                    
                   'content@':{
                       templateUrl: "scripts/app/room/views/room.html",
                       controller:'roomController'
                    },
                   'mainView@index.room':{
                       templateUrl:"scripts/app/room/views/mainView.html",
                       controller:'roomController'
                    },
                   'secundaryView@index.room':{
                       templateUrl:"scripts/app/room/views/secundaryView.html",
                       controller:'roomController'
                   }
                
                },
                
                
            })
            
    })
    