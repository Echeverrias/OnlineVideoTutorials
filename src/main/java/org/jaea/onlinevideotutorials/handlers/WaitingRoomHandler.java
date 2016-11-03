/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jaea.onlinevideotutorials.handlers;

import org.jaea.onlinevideotutorials.managers.RoomsManager;
import org.jaea.onlinevideotutorials.managers.UserSessionsRegistry;
import org.jaea.onlinevideotutorials.domain.UserSession;
import org.jaea.onlinevideotutorials.SendMessage;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.common.reflect.TypeToken;
import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

/**
 * 
 * 
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
*/
public class WaitingRoomHandler extends TextMessageWebSocketHandler {
    /**
     * Valid values of the message payload 'id' attribute which tell 
     * the handler how handle the message.
     */
    private static final String ID_CLOSE_TAB = "closeTab";

    public static final String ID_ENTER = "enterWaitingRoom";
    public static final String ID_EXIT = "exitWaitingRoom";
    private String [] ids = { ID_ENTER, ID_EXIT}; 

    /**
     * Name of the message payload attribute that tells 
     * the handler how handle the message.
     */
    protected String attributeNameOfTheMessageId;

    @Autowired
    private RoomsManager roomsManager;

    @Autowired
    private UserSessionsRegistry usersRegistry;

    private final Logger log = LoggerFactory.getLogger(WaitingRoomHandler.class);
    private Gson gson = new GsonBuilder().create();



    public WaitingRoomHandler(String attributeNameOfTheMessageId){
        this.attributeNameOfTheMessageId = attributeNameOfTheMessageId;
    }

    public WaitingRoomHandler(GeneralHandler generalHandler){
        log.info("WaitingRoomHandler created");
        
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
    public synchronized void handleTextMessage(WebSocketSession session, TextMessage message) throws  Exception{
        JsonObject jsonMessage = this.gson.fromJson(message.getPayload(), JsonObject.class);
        String id = jsonMessage.get(this.attributeNameOfTheMessageId).getAsString(); 
        String userName = jsonMessage.get("userName").getAsString(); 
        
        this.log.info("<- waitingRoom - id: {}, message: {}", session.getId(), jsonMessage.toString());
        
        switch (id){
            case ID_ENTER:
                this.enter(session, userName);
                break;
            case ID_EXIT : case ID_CLOSE_TAB  :
                this.exit(session, userName);
                break;    
            default:log.info("id {} doesn't found", id);
                throw new HandlerException("The handler does't know how handle the " + id + " message");   
        }        
    }
    
    /**
    * A student user has come into the waiting room.
    */
    private synchronized void enter (final WebSocketSession session, String userName){
        this.log.info("* waitingRoom.enter");
        
        UserSession user = this.usersRegistry.getUserByUserName(userName);
        this.roomsManager.addIncomingParticipant(user);

        JsonElement availableRoomsNames = gson.toJsonTree(this.roomsManager.getAvailableRoomsNames(), new TypeToken<List<String>>() {}.getType());
        
        JsonObject jsonAnswer = new JsonObject();
        jsonAnswer.addProperty("id","availableRooms");
        jsonAnswer.add("availableRoomsNames", availableRoomsNames);
        
        SendMessage.toClient(jsonAnswer, session);
        
        this.log.info("/waitingRoom.enter - the message has been sent");
    }

    private synchronized void exit (final WebSocketSession session, String userName){
        this.log.info("* waitingRoom.exit");
        this.roomsManager.removeIncomingParticipant(userName);
        this.log.info("/waitingRoom.exit");
    }
    
    public String getAttributeNameOfTheMessageId(){
        return this.attributeNameOfTheMessageId;
    }

    public List<String> getTextMessageIdsICanHandle(){
        List<String> idsList = new ArrayList<>(Arrays.asList(this.ids));
        return idsList;   
    }
}
