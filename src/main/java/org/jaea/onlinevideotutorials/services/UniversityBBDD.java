/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jaea.onlinevideotutorials.services;

import org.jaea.onlinevideotutorials.domain.User;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 *
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 */

public class UniversityBBDD {

    private final Logger log = LoggerFactory.getLogger(UniversityBBDD.class);
    
    public UniversityBBDD(){
        
    }
    
    public User getAnUser(String userName, String password){
        log.info("UniversityBBDD");
        User user = null;
        
        /*This is a provisional implementation
        * Here should be a query at the data base 
        */
        String userType = null;
        
        if (userName.toLowerCase().contains(User.TUTOR_TYPE)){
            userType = User.TUTOR_TYPE;
            
        }
        else if (userName.toLowerCase().contains(User.STUDENT_TYPE)){
            userType = User.STUDENT_TYPE;
        }
        
        user = new User(userName, userType, userName);
        
        log.info (user.toString());
        return user;
    }
    
}
