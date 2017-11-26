/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jaea.onlinevideotutorials.handlers;

import org.jaea.onlinevideotutorials.domain.ParticipantSession;
import org.jaea.onlinevideotutorials.domain.UserSession;
import org.jaea.onlinevideotutorials.managers.UserSessionsRegistry;

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
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

/**
 *
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 */

public class LoginHandler extends TextMessageWebSocketHandler {
    
   /**
     * Valid values of the message payload 'id' attribute which tell 
     * the handler how handle the message.
     */
    private static final String ID_CLOSE_TAB = "closeTab";

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
    public synchronized void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception{
        JsonObject jsonMessage = gson.fromJson(message.getPayload(), JsonObject.class);
        JsonElement jsonElement = jsonMessage.get(this.attributeNameOfTheMessageId);
        String id = jsonElement.getAsString(); 
        switch (id) { 
                    
        case ID_LOGIN:
            this.login(session, jsonMessage);
            break;
        case ID_LOGOUT: case ID_CLOSE_TAB :
            this.logout(session, jsonMessage);
            break;
        default:log.info("id {} doesn't found", id);
            throw new HandlerException("The handler does't know how handle the " + id + " message");   
        }
    }
    
    /**
    * A n user is going into the app
   */
    private synchronized void login(final WebSocketSession session, JsonObject jsonMessage){
        log.info("<- login - id: {}, message: {}", session.getId(), jsonMessage.toString());
        
        String userName = jsonMessage.get("userName").getAsString();
        String name = jsonMessage.get("name").getAsString();
        String userType = jsonMessage.get("userType").getAsString();
        
        this.usersRegistry.registerUserSession(userName, session);
        
        log.info("/LoginHandler.login");
    }
    
    /**
    * An user has left the application.
    */
    private synchronized void logout(final WebSocketSession session, JsonObject jsonMessage){
        log.info("<- %%%%% LoginHandler.logout - id: {}, message: {}", session.getId(), jsonMessage.toString());
        
       String userName = jsonMessage.get("userName").getAsString();
       this.usersRegistry.unregisterUser(userName);
       
       log.info("/ $$$$$ LoginHandler.logout");
    }

    public String getAttributeNameOfTheMessageId(){
        return this.attributeNameOfTheMessageId;
    } 
    
    public List<String> getTextMessageIdsICanHandle(){
        List<String> idsList = new ArrayList<>(Arrays.asList(this.ids));
        return idsList;   
    }
    
}
