package org.jaea.onlinevideotutorials.controllers;

import org.jaea.onlinevideotutorials.domain.User;
import org.jaea.onlinevideotutorials.domain.UserFile;
import org.jaea.onlinevideotutorials.domain.FieldValidationRequest;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.jaea.onlinevideotutorials.domain.ResponseMessage;
import org.jaea.onlinevideotutorials.repositories.UserRepository;
import org.jaea.onlinevideotutorials.repositories.UserFileRepository;
import org.jaea.onlinevideotutorials.managers.UserSessionsRegistry;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.InputStream;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.net.URLConnection;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class UserController {

    private final Logger log = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserSessionsRegistry usersRegistry;

    @Autowired
    private UserRepository userRepository;
    
    /* 
    @Autowired
    private UserFileRepository userFileRepository;
   */

    @RequestMapping(value ="/validateUser", method = RequestMethod.POST)
    public synchronized ResponseEntity<User> validateUser(@RequestBody User userRequest){
       
        log.info("Usercontroller.validateUser");
        log.info(userRequest.toString());
        ResponseEntity <User> response = null;

        // It checks if the user is logged
        if (this.usersRegistry.isThereAlreadyThisUser(userRequest.getUserName())){
             log.info("CONFLICT");
            response = new ResponseEntity(null, HttpStatus.CONFLICT);
        }
        else{    
             log.info("The user is not logged");
           User user = this.userRepository.findByUserName(userRequest.getUserName());
           if (user == null){
                log.info("NOT_FOUND");
                response = new ResponseEntity(null, HttpStatus.NOT_FOUND);
            }
            else{
                log.info(user.toString());
                if (user.comparePassword(userRequest)){
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

    @RequestMapping(value ="/validateField", method = RequestMethod.POST)
    public synchronized ResponseEntity<ResponseMessage> validateField(@RequestBody FieldValidationRequest fieldRequest){

        log.info("Usercontroller.validate");
        ResponseEntity <ResponseMessage> response = null;
        String field = fieldRequest.getField();
        String value = fieldRequest.getValue();
        String userName = fieldRequest.getUserName();
        String message = field + " taken";
        User user = null;
        Boolean validField = false;
        
        if (field.equals("userName")) {
            user = this.userRepository.findByUserName(value);
        }
        else if (field.equals("email")) {
            user = this.userRepository.findByEmail(value);
        }

        if (user == null){
            log.info("valid " + field);
            validField = true;
        }
        else{
        	if ((field.equals("email")) && (user.getUserName().equals(userName))){
        		log.info("valid " + field);
        		validField = true;
        	}
        	else{
        		log.info("invalid " +  field);
        		ResponseMessage rm = new ResponseMessage(false);
        		rm.setMessage(message);
        		response = new ResponseEntity(rm, HttpStatus.UNAUTHORIZED);
        	}	
        }
        
        if (validField){
        	response = new ResponseEntity(new ResponseMessage(true), HttpStatus.OK);
        }
        else{
        	ResponseMessage rm = new ResponseMessage(false);
            rm.setMessage(message);
            response = new ResponseEntity(rm, HttpStatus.UNAUTHORIZED);
        }
            
          
        return response;
    }

    @RequestMapping(value ="/register", method = RequestMethod.POST)
    public synchronized ResponseEntity<User> registerNewUser(HttpServletRequest request, @RequestBody User userRequest){

        log.info("Usercontroller.registerNewUser");
        ResponseEntity <User> response = null;

        ServletContext context = request.getServletContext();
        String fileAbsolutePath = context.getRealPath("/img/user.jpg");
        File file = new File(fileAbsolutePath);
        log.info(file.getName());
        
        UserFile uf = new UserFile(file);
        uf.setName(userRequest.getUserName());
        userRequest.setUserImage(uf);

        this.userRepository.save(userRequest);
        log.info("The user has been registered");
        response = new ResponseEntity(userRequest, HttpStatus.OK);
        return response;
    }
    
    @RequestMapping(value ="/editPerfil", method = RequestMethod.POST)
    public synchronized ResponseEntity<User> editPerfil(@RequestBody User userRequest){

        log.info("Usercontroller.editPerfil");
        ResponseEntity <User> response = null;
        User user = userRepository.findByUserName(userRequest.getUserName());
        
        if (user != null){
        	 user.setName(userRequest.getName());
        	 user.setSurname(userRequest.getSurname());
        	 user.setEmail(userRequest.getEmail());
        	 user.setPasswordFromOtherUser(userRequest);
        	 this.userRepository.save(user);
             log.info("The user has been modified");
        	 response = new ResponseEntity(user, HttpStatus.OK);
        }
        else{
        	response = new ResponseEntity(null, HttpStatus.NOT_FOUND);
        }
       
        return response;
    }

}
