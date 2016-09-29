/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jaea.onlinevideotutorials.handlers;

import org.jaea.onlinevideotutorials.managers.RoomsManager;
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
import org.springframework.web.socket.handler.TextWebSocketHandler;

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
    public static final String ID_WAITING_ROOM = "waitingRoom";
    private String [] ids = {ID_WAITING_ROOM }; 

    /**
     * Name of the message payload attribute that tells 
     * the handler how handle the message.
     */
    protected String attributeNameOfTheMessageId;

    @Autowired
    private RoomsManager roomsManager;

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
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws  Exception{
        JsonObject jsonMessage = this.gson.fromJson(message.getPayload(), JsonObject.class);
        String id = jsonMessage.get(this.attributeNameOfTheMessageId).getAsString(); 
        
        this.log.info("<- waitingRoom - id: {}, message: {}", session.getId(), jsonMessage.toString());
        
        switch (id){
            case ID_WAITING_ROOM:
                this.waitingRoom(session);
                break;
            default:
                throw new HandlerException("The handler does't know how handle the message");
        }        
    }
    
    
    /**
    * A student user has come into the waiting room.
    */
    private void waitingRoom (final WebSocketSession session){
        
        JsonElement avaibleRoomsNames = gson.toJsonTree(this.roomsManager.getAvaibleRoomsNames(), new TypeToken<List<String>>() {}.getType());
        JsonObject jsonAnswer = new JsonObject();
        jsonAnswer.addProperty("id","avaibleRooms");
        jsonAnswer.add("avaibleRoomsNames", avaibleRoomsNames);
        
        SendMessage.toClient(jsonAnswer, session);
        
        this.log.info("/waitingRoom - the message has been sent");
    }
    
    public String getAttributeNameOfTheMessageId(){
        return this.attributeNameOfTheMessageId;
    }

    public List<String> getTextMessageIdsICanHandle(){
        List<String> idsList = new ArrayList<>(Arrays.asList(this.ids));
        return idsList;   
    }
}
