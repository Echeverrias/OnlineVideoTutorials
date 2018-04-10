/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jaea.onlinevideotutorials.handlers;

import org.jaea.onlinevideotutorials.domain.ParticipantSession;
import org.jaea.onlinevideotutorials.domain.UserSession;
import org.jaea.onlinevideotutorials.domain.User;
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
     * Valid values of the message payload 'id' attribute from the client which tell 
     * the handler how handle the message.
     */
    
    public static final String ID_LOGIN = "login";
    public static final String ID_LOGOUT = "logout";
    public static final String ID_RECONNECT = "reConnect";
    private String [] ids = {ID_LOGIN, ID_LOGOUT}; 
    
    private static final String PAYLOAD_ATTRIBUTE_USER_NAME = "userName";
    /**
     * Name of the message payload attribute that tells 
     * the handler how handle the message.
     */
  //  protected String attributeNameOfTheMessageId;

     
    private final Logger log = LoggerFactory.getLogger(LoginHandler.class);
        
    @Autowired
    private UserSessionsRegistry usersRegistry;


    
    public LoginHandler(String attributeNameOfTheMessageId, String attributeNameOfTheMessagePayload){
        super(attributeNameOfTheMessageId, attributeNameOfTheMessagePayload);
        //this.attributeNameOfTheMessageId = attributeNameOfTheMessageId;
    }

    public LoginHandler(String attributeNameOfTheMessageId, String attributeNameOfTheMessagePayload, GeneralHandler generalHandler){
        super(attributeNameOfTheMessageId, attributeNameOfTheMessagePayload);
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
        this.log.info("LoginHandler.handleTextMessage"); 
        String id = this.getTextMessageId(message);
        this.log.info("------------------------------------------------------------");
        this.log.info("<- The message '{}' from {} has arrived", id, session.getId());
        this.log.info("------------------------------------------------------------");
        /*
        JsonObject jsonMessage = gson.fromJson(message.getPayload(), JsonObject.class);
        /*
        String id = jsonMessage.get(this.attributeNameOfTheMessageId).getAsString();
        */
        /*
            WSMessage wsMessage = this.gson.fromJson(message.getPayload(), WSMessage.class);
            String id = wsMessage.getId();
            this.log.info("handle: {}", id);
            log.info("user is going to be deserialiced");
            User user = (User) wsMessage.getPayload();
            log.info("user has been deserialiced");
        */

        
        String userName = this.getTextMessagePayLoadData(PAYLOAD_ATTRIBUTE_USER_NAME, message);
        log.info("message Id: {}, message data: {}", id, userName); 
        switch (id) { 
                    
        case ID_LOGIN:
            this.login(session, userName);
            break;
        case ID_LOGOUT: case ID_CLOSE_TAB :
            this.logout(session, userName);
            break;
        default:log.info("id {} doesn't found", id);
            throw new HandlerException("The handler does't know how handle the " + id + " message");   
        }
    }
    
    /**
    * A n user is going into the app
   */
    private synchronized void login(final WebSocketSession session, String userName){
        log.info("<- login - id: {}, userName: {}", session.getId(), userName);
        
        //String userName = jsonMessage.get("userName").getAsString();
        //String name = jsonMessage.get("name").getAsString();
        //String userType = jsonMessage.get("userType").getAsString();
        
        this.usersRegistry.registerUserSession(userName, session);
        
        log.info("/LoginHandler.login");
    }
    
    /**
    * An user has left the application.
    */
    private synchronized void logout(final WebSocketSession session, String userName){
        log.info("<- %%%%% LoginHandler.logout - id: {}, message: {}", session.getId());
        
       //String userName = jsonMessage.get("userName").getAsString();
       this.usersRegistry.unregisterUser(userName);
       
       log.info("/ $$$$$ LoginHandler.logout");
    }

    public List<String> getTextMessageIdsICanHandle(){
        List<String> idsList = new ArrayList<>(Arrays.asList(this.ids));
        return idsList;   
    }
    
}
