/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jaea.onlinevideotutorials.handlers;

import org.jaea.onlinevideotutorials.SendMessage;
import org.jaea.onlinevideotutorials.services.UniversityBBDD;
import org.jaea.onlinevideotutorials.domain.ParticipantSession;
import org.jaea.onlinevideotutorials.domain.User;
import org.jaea.onlinevideotutorials.domain.UserSession;
import org.jaea.onlinevideotutorials.managers.UserSessionsRegistry;
import org.jaea.onlinevideotutorials.managers.RoomsManager;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonElement;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonElement;
import java.util.List;
import java.util.Arrays;
import java.util.ArrayList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Autowire;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.aspectj.EnableSpringConfigured;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

/**
 *
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 */

public class LoginHandler extends TextMessageWebSocketHandler {
    
   /**
     * Valid values of the message payload 'id' attribute which tell 
     * the handler how handle the message.
     */
    public static final String ID_LOGIN = "login";
    public static final String ID_LOGOUT = "logout";
    private String [] ids = {ID_LOGIN, ID_LOGOUT}; 

    /**
     * Name of the message payload attribute that tells 
     * the handler how handle the message.
     */
    protected String attributeNameOfTheMessageId;

     
    private final Logger log = LoggerFactory.getLogger(LoginHandler.class);
    
    private Gson gson = new GsonBuilder().create();
    
    @Autowired
    private UniversityBBDD universityBBDD;
    
    @Autowired
    private RoomsManager roomsManager;

    @Autowired
    private UserSessionsRegistry usersRegistry;


    
    public LoginHandler(String attributeNameOfTheMessageId){
        this.attributeNameOfTheMessageId = attributeNameOfTheMessageId;
    }

    public LoginHandler(GeneralHandler generalHandler){
        log.info("LoginHandler created");

        this.attributeNameOfTheMessageId = generalHandler.getAttributeNameOfTheMessageId();
        this.signIn(generalHandler);
    }


    private void signIn(GeneralHandler generalHandler){
        List<String> idsList = new ArrayList<>(Arrays.asList(this.ids));
        for(String id : idsList){
            generalHandler.attach(id, this);    
        }    
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception{
        JsonObject jsonMessage = gson.fromJson(message.getPayload(), JsonObject.class);
        JsonElement jsonElement = jsonMessage.get(this.attributeNameOfTheMessageId);
        String id = jsonElement.getAsString(); 
        switch (id) { 
                    
        case ID_LOGIN:
            this.login(session, jsonMessage);
            break;
        case ID_LOGOUT:
            this.logout(session, jsonMessage);
            break;
        default:log.info("id doesn't found");
            throw new HandlerException("The handler does't know how handle the message");   
        }
    }
    
    
    
    /**
    * A client is authenticating himself
    * If the user is a tutor, a room is created and the tutor joins into it and
    * ..if it's a student he goes to the 'waiting room'.
    */
    private void login(final WebSocketSession session, JsonObject jsonMessage){
        log.info("<- login - id: {}, message: {}", session.getId(), jsonMessage.toString());
        
        String userName = jsonMessage.get("userName").getAsString();
        String password = jsonMessage.get("password").getAsString();
        JsonObject jsonAnswer = new JsonObject();
        jsonAnswer.addProperty("id","login");
        
        if (usersRegistry.isThereAlreadyThisUser(userName)) {
             jsonAnswer.addProperty("validUser", false);
        }

        else {
            
            UserSession newUser = this.validateUser(userName, password, session);

            jsonAnswer.addProperty("validUser", newUser != null);
            
            if (newUser == null ) {

                log.info("Is not a valid user");

            }   

            else { // A valid user
                
                jsonAnswer.addProperty("name",newUser.getName());
                jsonAnswer.addProperty("userName",newUser.getUserName());
                jsonAnswer.addProperty("userType",newUser.getUserType());
            
                this.usersRegistry.addUser(newUser);

                // A tutor create a new room
                if (newUser.isATutor()){

                    log.info("The user is a tutor named {}", newUser.getUserName());

                    this.roomsManager.createRoom(newUser.getUserName());
                    jsonAnswer.addProperty("roomName",newUser.getUserName());
                    this.makeKnowThereIsANewRoom(newUser.getUserName());
                 }

            }     
        
        }
        log.info("/login - the message has been sent");
        SendMessage.toClient(jsonAnswer, session);
        
        SendMessage.toClient("->login", session);
        log.info("/login - the message has been sent");
    }
    
    
    private ParticipantSession validateUser(String userName, String password, WebSocketSession session ){
        log.info("* LoginHandler.validateUser");
        
        ParticipantSession userSession = null;
        
        User user = this.universityBBDD.getAnUser(userName, password);
        
        

        if (user != null){
            log.info(user.toString());
            userSession = new ParticipantSession(session, user);
        }
        
         log.info("/ LoginHandler.validateUser");
        return userSession;
    }
    
    private void makeKnowThereIsANewRoom(String roomName){
        log.info(" * makeKnowThereIsANewRoom to...");
        this.usersRegistry.printIncomingParticipants();//*
        JsonObject jsonAnswer = new JsonObject();
        jsonAnswer.addProperty("id", "thereIsANewRoom");
        jsonAnswer.addProperty("roomName", roomName);
        
        this.usersRegistry.sendAMessageToIncomingParticipants(jsonAnswer);
        
        log.info(" /makeKnowThereIsANewRoom - the message has been sent");
     }
    
    
    /**
    * An user has left the application.
    */
    private void logout(final WebSocketSession session, JsonObject jsonMessage){
        log.info("<- logout - id: {}, message: {}", session.getId(), jsonMessage.toString());
        
       String userName = jsonMessage.get("userName").getAsString();
       this.usersRegistry.removeUser(userName);
       
       log.info("/logout");
    }

    public String getAttributeNameOfTheMessageId(){
        return this.attributeNameOfTheMessageId;
    } 
    
    public List<String> getTextMessageIdsICanHandle(){
        List<String> idsList = new ArrayList<>(Arrays.asList(this.ids));
        return idsList;   
    }
    
}
