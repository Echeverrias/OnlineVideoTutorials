package org.jaea.onlinevideotutorials.controllers;

import org.jaea.onlinevideotutorials.domain.User;
import org.jaea.onlinevideotutorials.domain.ResponseMessage;
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
    public ResponseEntity<User> getUserByUserName(@RequestBody User requestUser){

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
                if (user.comparePassword(requestUser)){
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


    @RequestMapping(value ="/register", method = RequestMethod.POST)
    public ResponseEntity<ResponseMessage> registerNewUser(@RequestBody User requestUser){

        log.info("Usercontroller.registerNewUser");
        log.info(requestUser.toString());
        log.info(requestUser.getUserName());
        log.info(requestUser.getEmail());
        log.info(requestUser.getName());
        log.info(requestUser.getSurname());
        log.info(requestUser.getUserType());
        ResponseEntity <ResponseMessage> response = null;

        User user = this.userRepository.findByUserName(requestUser.getUserName());
        if (user == null){
            log.info("Not find userName");
            user = this.userRepository.findByEmail(requestUser.getEmail());
            if (user == null){
                 log.info("Not find email");
                  log.info("The user is going to be registered");
                this.userRepository.save(requestUser);
                log.info("The user has been registered");

                response = new ResponseEntity(new ResponseMessage(true, ""), HttpStatus.OK);
            }
            else{
                log.info("Ya existe un usario registardo con ese correo");
                 response = new ResponseEntity(new ResponseMessage(false, "Ya existe un usuario registrado con ese correo"), HttpStatus.UNAUTHORIZED);

            }
        }
        else{
            log.info("El nombre de usuario ya existe");
            response = new ResponseEntity(new ResponseMessage(false, "El nombre de usuario ya existe"), HttpStatus.UNAUTHORIZED);
    
        }    
        return response;
    }


   
    

}
