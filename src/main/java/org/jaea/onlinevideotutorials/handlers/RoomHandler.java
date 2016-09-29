/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jaea.onlinevideotutorials.handlers;

import org.jaea.onlinevideotutorials.domain.ParticipantSession;
import org.jaea.onlinevideotutorials.domain.User;
import org.jaea.onlinevideotutorials.domain.UserSession;
import org.jaea.onlinevideotutorials.managers.UserSessionsRegistry;
import org.jaea.onlinevideotutorials.managers.RoomsManager;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
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
public class RoomHandler extends TextMessageWebSocketHandler{
    
    /**
     * Valid  values of the message payload 'id' attribute which tell 
     * the handler that can handle the message.
     */
    public static final String ID_JOIN_ROOM = "joinRoom";
    public static final String ID_RECEIVE_VIDEO_FROM = "receiveVideoFrom";
    public static final String ID_RECEIVE_ADDRESS = "receiveAddress";
    public static final  String ID_EXIT_ROOM = "exitRoom";
    private String [] ids = {ID_JOIN_ROOM, ID_RECEIVE_VIDEO_FROM, ID_RECEIVE_ADDRESS, ID_EXIT_ROOM}; 
    
    
    /**
     * Name of the message payload attribute that tells 
     * the handler how handle the message.
     */
    protected String attributeNameOfTheMessageId;

    private final Logger log = LoggerFactory.getLogger(RoomHandler.class);
    private Gson gson = new GsonBuilder().create();
    
    @Autowired
    private RoomsManager roomsManager;

    @Autowired
    private UserSessionsRegistry usersRegistry;



    public RoomHandler(String attributeNameOfTheMessageId){
        this.attributeNameOfTheMessageId = attributeNameOfTheMessageId;
    }

    public RoomHandler(GeneralHandler generalHandler){
        log.info("RoomHandler created");

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
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        JsonObject jsonMessage = this.gson.fromJson(message.getPayload(), JsonObject.class);
        String id = jsonMessage.get(this.attributeNameOfTheMessageId).getAsString();                
        switch (id){
            case ID_JOIN_ROOM:
                this.joinRoom(session, jsonMessage);
                break;
            case ID_RECEIVE_VIDEO_FROM:
                this.receiveVideoFrom(session, jsonMessage);
                break;
            case ID_RECEIVE_ADDRESS:
                this.receiveAddress(session, jsonMessage);
                break;
            case ID_EXIT_ROOM :
                this.exitRoom(session, jsonMessage);
                break;
            default:
                throw new HandlerException("The handler does't know how handle the message");
        }
    }
    
    
    /**
    * An user has come into the waiting room.
    */
    private void joinRoom (WebSocketSession session, JsonObject jsonMessage){
        this.log.info("<- joinRoom -> id: {}, message: {}", session.getId(), jsonMessage.toString());
        
        String name = jsonMessage.get("name").getAsString();
        String userName = jsonMessage.get("userName").getAsString();
        String roomName = jsonMessage.get("roomName").getAsString();
        String userType = jsonMessage.get("userType").getAsString();
        
        UserSession newParticipant;
        
        if (userType.equals(ParticipantSession.STUDENT_TYPE)) {
               
            newParticipant = this.usersRegistry.removeIncomingParticipant(userName);
            
        } 
        
        else {
            
            newParticipant = this.usersRegistry.getUserBySessionId(session.getId());
        
        }
        
        this.log.info("userName: {}", userName);
        this.log.info("roomName: {}", roomName);
        //SendMessage.toClient("add participant " + newParticipant.getUserName() + " to " + roomName + session.getId(), session); //$
        this.roomsManager.addParticipant(newParticipant, roomName);
        
        this.log.info("/joinRoom - the message has been sent");
    }
    
    private void receiveVideoFrom(WebSocketSession session, JsonObject jsonMessage){
        this.log.info("<- receiveVideoFrom -> id: {}, message: {}", session.getId(), jsonMessage.toString());
        
        UserSession user = this.usersRegistry.getUserBySessionId(session.getId());
        String senderUserName = jsonMessage.get("userName").getAsString();
        JsonElement sdpOffer = jsonMessage.get("offer");
        
        this.roomsManager.manageOfferVideo(user.getUserName(), senderUserName, sdpOffer);
                    
        this.log.info("/ receiveVideoFrom");    
    }
    
    private void receiveAddress(WebSocketSession session, JsonObject jsonMessage){
        this.log.info("<- iceCandidate: id: {}, message: {}",session.getId() , jsonMessage.toString());
        
        
        UserSession user = this.usersRegistry.getUserBySessionId(session.getId());
        String senderUserName = jsonMessage.get("userName").getAsString();
        JsonElement candidate = jsonMessage.get("address");
        
        this.roomsManager.manageAddress(user.getUserName(), senderUserName, candidate);
       
        this.log.info("/ iceCandidate"); 
    }
    
    /**
    * An user has left the room.
    */
    private void exitRoom (WebSocketSession session, JsonObject jsonMessage){
        this.log.info("<- exitRoom: id: {}, message: {}", session.getId(), jsonMessage.toString());
        
        String roomName = jsonMessage.get("roomName").getAsString();
        String userName = jsonMessage.get("userName").getAsString();
        String userType = jsonMessage.get("userType").getAsString();
        
        UserSession user = this.roomsManager.participantLeavesARoom(userName, roomName);
        
        if (userType.equals(User.TUTOR_TYPE)) {
            this.makeKnowThereIsAnAvaibleRoomLess(roomName);
            this.usersRegistry.removeUser(userName);
        }
        
        else {
            this.usersRegistry.addIncomingParticipant(user);
        }
        
        this.log.info("/exitRoom - it has finished");
    }
    
    private void makeKnowThereIsAnAvaibleRoomLess(String roomName){
        this.log.info("  * makeKnowThereIsARoomLess to...");
        
        JsonObject jsonAnswer = new JsonObject();
        jsonAnswer.addProperty("id", "thereIsAnAvaibleRoomLess");
        jsonAnswer.addProperty("roomName", roomName);
        
        this.usersRegistry.sendAMessageToIncomingParticipants(jsonAnswer);
        
        this.log.info("  /makeKnowThereIsARoomLess - the message has been sent");
     }
    
    
    public String getAttributeNameOfTheMessageId(){
        return this.attributeNameOfTheMessageId;
    }

    public List<String> getTextMessageIdsICanHandle(){
        List<String> idsList = new ArrayList<>(Arrays.asList(this.ids));
        return idsList;   
    }
    
    
   
    
}
