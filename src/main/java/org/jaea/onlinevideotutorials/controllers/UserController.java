package org.jaea.onlinevideotutorials.controllers;

import org.jaea.onlinevideotutorials.domain.User;
import org.jaea.onlinevideotutorials.domain.RequestUser;
import org.jaea.onlinevideotutorials.repositories.UserRepository;
import org.jaea.onlinevideotutorials.managers.UserSessionsRegistry;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.RequestEntity;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ResponseBody;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.google.common.collect.Lists;




@RestController
public class UserController {

    private final Logger log = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserSessionsRegistry usersRegistry;

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value ="/validateUser", method = RequestMethod.POST)
    public ResponseEntity<User> getUserByUserName(@RequestBody RequestUser requestUser){

        log.info("Usercontroller.getUserByUserName");
        log.info(requestUser.toString());
        ResponseEntity <User> response = null;

        // It checks if the user is logged
        if (this.usersRegistry.isThereAlreadyThisUser(requestUser.getUserName())){
             log.info("CONFLICT");
            response = new ResponseEntity(null, HttpStatus.CONFLICT);
        }
        else{    
             log.info("The user is not logged");
           User user = this.userRepository.findByUserName(requestUser.getUserName());
           if (user == null){
                log.info("NOT_FOUND");
                response = new ResponseEntity(null, HttpStatus.NOT_FOUND);
            }
            else{
                log.info(user.toString());
                if (user.comparePassword(requestUser.getPassword())){
                    response = new ResponseEntity(user, HttpStatus.OK);
                }
                else {
                     log.info("UNAUTHORIZED");
                    response = new ResponseEntity(null, HttpStatus.UNAUTHORIZED);
                }
            }
        }    
        return response;
    }

   
    

}
