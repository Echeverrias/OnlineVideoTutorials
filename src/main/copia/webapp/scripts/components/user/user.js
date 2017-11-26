/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function User(name,type){
    
    this.name = name;
    this.type = type;
    
    this.close = function(){
        console.log("User" + name + "closed");
    }
    
    
}


