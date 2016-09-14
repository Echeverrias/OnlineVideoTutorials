/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */




angular.module("onlineVideoTutorialsApp", ['ui.router'])

.constant("tutorType", "tutor")
.constant("studentType", "student")

.factory("utilities", ["$state", function($state){
        
        return {
            goToState: function(state){
                 $state.go(state);
            }
        }
    }])

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
       
       
       $stateProvider
       
            .state('index',{
                url: "/",
                views: {
                    'header':{templateUrl:"assets/templates/header.html"},
                    'content': {
                        templateUrl: "scripts/app/login/login.html",
                        controller: "loginCtrl"
                    },
                    'footer': {templateUrl:"assets/templates/footer.html"}
                },
                
                
            })
            
            .state('error',{
                url: "/error",
                templateUrl: "error.html"
            })
          
          $locationProvider.html5Mode(true);
          $urlRouterProvider.otherwise("/");
         
          
          
    })  
    
  

    
    
