/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */

angular.module("onlineVideoTutorialsApp")

    .config(function($stateProvider ) {

        

        $stateProvider
            
           .state('index.login', {
              url: "login",
              views:{
              'content@':{
                  templateUrl: "scripts/app/login/login.html",
                  controller: "loginCtrl"
                },
              },
              
            })
           
    })
   