/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jaea.onlinevideotutorials.handlers;


import org.jaea.onlinevideotutorials.Info;
import org.jaea.onlinevideotutorials.Hour;
import org.jaea.onlinevideotutorials.domain.Message;   //#####
import org.jaea.onlinevideotutorials.domain.AvailableRoom;  //#####
import org.jaea.onlinevideotutorials.domain.ParticipantSession;
import org.jaea.onlinevideotutorials.domain.UserSession;
import org.jaea.onlinevideotutorials.domain.Room;
import org.jaea.onlinevideotutorials.managers.UserSessionsRegistry;
import org.jaea.onlinevideotutorials.managers.RoomsManager;

import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
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
public class RoomHandler extends TextMessageWebSocketHandler{
    
    /**
     * Valid  values of the message payload 'id' attribute which tell 
     * the handler that can handle the message.
     */
    private static final String ID_CLOSE_TAB = "closeTab";

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
    public synchronized void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
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
            case ID_EXIT_ROOM : case ID_CLOSE_TAB  :
                this.exitRoom(session, jsonMessage);
                break;
            default:log.info("id {} doesn't found", id);
                throw new HandlerException("The handler does't know how handle the " + id + " message");   
        }
    }
    
    /**
    * An user has come into the waiting room.
    */
    private synchronized void joinRoom (WebSocketSession session, JsonObject jsonMessage){
        this.log.info("<- joinRoom -> id: {}, message: {}", session.getId(), jsonMessage.toString());
        
        String name = jsonMessage.get("name").getAsString();
        String userName = jsonMessage.get("userName").getAsString();
        String roomName = jsonMessage.get("roomName").getAsString();
        String userType = jsonMessage.get("userType").getAsString();
        
        Room room = null; // ###
        if (!this.roomsManager.existRoom(roomName)){
            room = this.roomsManager.createRoom(roomName);
            this.makeKnowThereIsANewRoom(roomName);
        }
        this.log.info("########################## 1");
         
       // availableRoomsNames = gson.toJsonTree(this.roomsManager.getAvailableRoomsNames(), new TypeToken<List<String>>() {}.getType());
         UserSession newParticipant = this.usersRegistry.getUserBySessionId(session.getId());
        
        this.roomsManager.addParticipant(newParticipant, roomName);
        this.log.info("########################## 2");
        this.makeKnowTheParticipantsOfRoom((ParticipantSession) newParticipant, roomName);
        this.log.info("########################## 3");
        this.makeKnowThereIsANewParticipant((ParticipantSession) newParticipant, roomName);
        this.log.info("########################## 4");
        this.log.info("/joinRoom - the message has been sent");
    }
    
    private void makeKnowThereIsANewRoom(String roomName){//%%
        log.info(" * makeKnowThereIsANewRoom to...");
        this.roomsManager.printIncomingParticipants();//*

        JsonObject jsonAnswer = new JsonObject();
        jsonAnswer.addProperty("id", "thereIsANewRoom");
        jsonAnswer.addProperty("roomName", roomName);
        
        List<UserSession> incomingParticipants = this.roomsManager.getIncomingParticipants();
        this.sendAMessageToUsers(jsonAnswer, incomingParticipants);
        
        log.info(" /makeKnowThereIsANewRoom - the message has been sent");
    }
    
    // Return the unnotified participants
    private List<UserSession> sendAMessageToUsers(JsonObject message, List<UserSession> users){
        log.info("{} sendAMessageToIncomingParticipants - message: {} {}",Info.START_SYMBOL, message, Hour.getTime());
        log.info("users: " + users.size());
       
        List<UserSession> unnotifiedUsers = new ArrayList<>();
        
        for (UserSession user : users){
            log.info("User: {}", user.getUserName());

            if (!user.sendMeAMessage(message)){
                unnotifiedUsers.add(user);
            }
        }  
        
        if (!unnotifiedUsers.isEmpty()) {
            log.debug("{} users don't have receive the message", unnotifiedUsers.size());
        }
        
        log.info("the message has been sent to all teh users");
        log.info("{} users don't have receive the message", unnotifiedUsers.size());
        Info.logInfoFinish("sendAMessageToIncomingParticipants");
        return unnotifiedUsers;
    }
    
    // Return the unnotified participants
    private List<UserSession> sendAMessageToParticipants(JsonObject message, List<ParticipantSession> participants){
        log.info("{} sendAMessageToIncomingParticipants - message: {} {}",Info.START_SYMBOL, message, Hour.getTime());
        log.info("IncomingParticipants: " + participants.size());
       
        List<UserSession> unnotifiedUsers = new ArrayList<>();
        
        if (!participants.isEmpty()){
            List<UserSession> users = new ArrayList<>();
            for (UserSession user : participants){
                users.add(user);
            } 
            unnotifiedUsers = sendAMessageToUsers(message, users);
        }
        
        log.info("the message has been sent to all the participants");
        log.info("{} users don't have receive the message", unnotifiedUsers.size());
        Info.logInfoFinish("sendAMessageToIncomingParticipants");
        return unnotifiedUsers;
    }
    
        
    private void makeKnowTheParticipantsOfRoom (ParticipantSession newParticipant, String roomName){
        log.info("{} RoomHandler.makeKnowTheParticipantsOfRoom {}{}{}", Info.START_SYMBOL, newParticipant.getName(), roomName, Hour.getTime());
        
        List<ParticipantSession> participants = this.roomsManager.getParticipantsByRoomName(roomName);
        
        JsonObject jsonAnswer = new JsonObject();
        jsonAnswer.addProperty("id", "thereIsAParticipant");
        
        for (ParticipantSession participant : participants){
            log.info("participant: {}", participant.toString());

            jsonAnswer.addProperty("userName", participant.getUserName());
            jsonAnswer.addProperty("name", participant.getName());
            jsonAnswer.addProperty("userType", participant.getUserType());

            newParticipant.sendMeAMessage(jsonAnswer);
        }
            
        log.info("{} RoomHandelr.makeKnowTheParticipantsOfRoom - the messages have been sent", Info.FINISH_SYMBOL, Hour.getTime());
    }
    
    private void makeKnowThereIsANewParticipant(ParticipantSession newParticipant, String roomName){
        log.info("{} Room.makeKnowThereIsANewParticipant ({}) to participants of room {} {}", Info.START_SYMBOL, newParticipant.toString(), roomName, Hour.getTime());
        //this.printTheRoomParticipants();
        List<ParticipantSession> participants = this.roomsManager.getParticipantsByRoomName(roomName);
        
        JsonObject jsonAnswer = new JsonObject();
        jsonAnswer.addProperty("id", "thereIsANewParticipant");
        jsonAnswer.addProperty("userName", newParticipant.getUserName());
        jsonAnswer.addProperty("name", newParticipant.getName());
        jsonAnswer.addProperty("userType", newParticipant.getUserType());
        
       log.info("Message to send to: {}",jsonAnswer.toString());
       
        for (ParticipantSession participant : participants){
            log.debug(roomName +":");
            log.debug("- " + participant.getUserName());
            // The new participant already knows he's in the room
            if (!participant.equals(newParticipant)){
                log.info("Student/Tutor: {} {}", participant.getUserName(), participant.getSession().getId());
                participant.sendMeAMessage(jsonAnswer);
            }    
        }  
            
        log.info("{} Room.makeKnowThereIsANewParticipant - the messages have been sent {}", Info.FINISH_SYMBOL, Hour.getTime());
    }
    
    private synchronized void receiveVideoFrom(WebSocketSession session, JsonObject jsonMessage){
        this.log.info("<- receiveVideoFrom -> id: {}, message: {}", session.getId(), jsonMessage.toString());
        this.log.info("");
        this.log.info("---------------------   RECEIVEVIDEOFROM      -------------------");
        this.log.info("");
             
        UserSession user = this.usersRegistry.getUserBySessionId(session.getId());

        if (user != null){

            String senderUserName = jsonMessage.get("userName").getAsString();
            String sdpOffer = jsonMessage.get("offer").getAsString();
            
            String sdpAnswer = this.roomsManager.manageOfferVideo(user.getUserName(), senderUserName, sdpOffer);
            
            final JsonObject scParams = new JsonObject();
        	scParams.addProperty("id", "receiveVideoAnswer-" + senderUserName);
        	scParams.addProperty("userName", senderUserName);
        	scParams.addProperty("sdpAnswer", sdpAnswer);

        	user.sendMeAMessage(scParams);

        }    
        
        this.log.info("/ receiveVideoFrom {} from {}", user, jsonMessage.get("userName").getAsString());    
    }
    
    private synchronized void receiveAddress(WebSocketSession session, JsonObject jsonMessage){
        //this.log.info("* RoomHandler.receiveAddress <- iceCandidate: id: {}, message: {}",session.getId() , jsonMessage.toString());
        
        UserSession user = this.usersRegistry.getUserBySessionId(session.getId());

        if (user != null){

            String senderUserName = jsonMessage.get("userName").getAsString();
            JsonObject candidate = jsonMessage.get("address").getAsJsonObject();
            
            this.roomsManager.manageAddress(user.getUserName(), senderUserName, candidate);
        }
        this.log.info("/ RoomHandler.receiveAddress"); 
    }
    
    /**
    * An user has left the room.
    */
    private synchronized void exitRoom (WebSocketSession session, JsonObject jsonMessage){
        this.log.info("<- exitRoom: id: {}, message: {}", session.getId(), jsonMessage.toString());
        
        String roomName = jsonMessage.get("roomName").getAsString();
        String userName = jsonMessage.get("userName").getAsString();
        
        UserSession user = this.roomsManager.participantLeavesARoom(userName, roomName);

        if (user != null){
            this.log.info("** The participant {} has been got out from the room **", user.getUserName());
            
            if (!this.roomsManager.existRoom(roomName)){
                this.makeKnowThereIsAnAvailableRoomLess(roomName);
            }
            else{
                this.makeKnowAParticipantHasLeftTheRoom(user, roomName);
            }
        }
        this.log.info("/exitRoom - it has finished");
    }
    
    private void makeKnowThereIsAnAvailableRoomLess(String roomName){
        this.log.info("  * makeKnowThereIsARoomLess to...");
        
        JsonObject jsonAnswer = new JsonObject();
        jsonAnswer.addProperty("id", "thereIsAnAvailableRoomLess");
        jsonAnswer.addProperty("roomName", roomName);
        
        List<UserSession> incomingParticipants = this.roomsManager.getIncomingParticipants();
        this.sendAMessageToUsers(jsonAnswer, incomingParticipants);
        
        this.log.info("  /makeKnowThereIsARoomLess - the message has been sent");
    }

    private void makeKnowAParticipantHasLeftTheRoom(UserSession user, String roomName){
        log.info("{} Room.makeKnowAParticipantHasLeftTheRoom: {} {}", Info.START_SYMBOL, user.getUserName(), Hour.getTime());
       
        List<ParticipantSession> participants = this.roomsManager.getParticipantsByRoomName(roomName);
        
        if (!participants.isEmpty()){
            
            String userName = user.getUserName();

            JsonObject participantLeftJson = new JsonObject();
            participantLeftJson.addProperty("id", "aParticipantHasLeftTheRoom");
            participantLeftJson.addProperty("userName", userName);
            participantLeftJson.addProperty("userType", user.getUserType());
            participantLeftJson.addProperty("roomName", roomName);

            final List<UserSession> unnotifiedParticipants;
            unnotifiedParticipants =  this.sendAMessageToParticipants(participantLeftJson, participants);
            
            for (final ParticipantSession participant : participants) {
                participant.receivesFarewellFrom(userName);
            }    
            
        }

        log.info("{} RoomHandler.makeKnowAParticipantHasLeftTheRoom - the messages have been sent {}", Info.FINISH_SYMBOL, Hour.getTime());
    }

    public String getAttributeNameOfTheMessageId(){
        return this.attributeNameOfTheMessageId;
    }

    public List<String> getTextMessageIdsICanHandle(){
        List<String> idsList = new ArrayList<>(Arrays.asList(this.ids));
        return idsList;   
    }
    
    
   
    
}
