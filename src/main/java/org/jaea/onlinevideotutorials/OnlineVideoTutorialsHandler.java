/*
 * (C) Copyright 2015 Kurento (http://kurento.org/)
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Lesser General Public License
 * (LGPL) version 2.1 which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/lgpl-2.1.html
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 */
package org.jaea.onlinevideotutorials;

import com.google.common.reflect.TypeToken;
import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

import org.kurento.client.EventListener;
import org.kurento.client.IceCandidate;
import org.kurento.client.KurentoClient;
import org.kurento.client.MediaPipeline;
import org.kurento.client.OnIceCandidateEvent;
import org.kurento.client.WebRtcEndpoint;
import org.kurento.jsonrpc.JsonUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.List;

/**
 * Online Video Tutorials handler 
 * 
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
*/
public class OnlineVideoTutorialsHandler extends TextWebSocketHandler {

    private final Logger log = LoggerFactory.getLogger(OnlineVideoTutorialsHandler.class);
    private static final Gson gson = new GsonBuilder().create();
   
    @Autowired
    private RoomManager roomManager;

    @Autowired
    private UserSessionsRegistry usersRegistry;
    
    @Autowired
    private KurentoClient kurento;
    
    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        
        JsonObject jsonMessage = gson.fromJson(message.getPayload(), JsonObject.class);

	log.debug("Incoming message: {}", jsonMessage);

	switch (jsonMessage.get("id").getAsString()) {
                    
        case "login":
            Info.receiveMsg("login " + session.getId());
            SendMessage.toClient("<-login " + session.getId(), session);
            this.login(session, jsonMessage);
            break;
            
        case "waitingRoom":
            Info.receiveMsg("waitingRoom " + session.getId());
            this.waitingRoom(session, jsonMessage);
            break;
            
        case "joinRoom":
            Info.receiveMsg("joinRoom " + session.getId());
            //SendMessage.toClient("<-joinRoom " + session.getId(), session);
            this.joinRoom(session, jsonMessage);
            break;
            
        case "receiveVideoFrom":
            Info.receiveMsg("receiveVideoFrom " + session.getId());
            SendMessage.toClient("<-receiveVideoFrom " + session.getId(), session);
            this.receiveVideoFrom(session, jsonMessage);
            break;    
            
        case "onIceCandidate":
            Info.receiveMsg("onIceCandidate " + session.getId());
            this.iceCandidate(session, jsonMessage);
            break;    
            
        case "exitRoom":
            Info.receiveMsg("exitRoom " + session.getId());
            this.exitRoom(session, jsonMessage);
            break;
        
        case "logout":
            Info.receiveMsg("logout " + session.getId());
            SendMessage.toClient("<-logout " + session.getId(), session);
            this.logout(session, jsonMessage);
            break;
            
        default:
            break;
		
	}
    }
    
    /**
    * A client is authenticating himself
    * If the user is a tutor, he creates a room and join into it and
    * ..if it's a student he goes to the 'waiting room'.
    */
    private void login(final WebSocketSession session, JsonObject jsonMessage){
        log.info("<- login - id: {}, message: {}", session.getId(), jsonMessage.toString());
        
        String userName = jsonMessage.get("userName").getAsString();
        String password = jsonMessage.get("password").getAsString();
        
        JsonObject jsonAnswer = new JsonObject();
        jsonAnswer.addProperty("id","login");
        
        if (this.usersRegistry.isThereAlreadyThisUser(userName)) {
             jsonAnswer.addProperty("validUser",false);
        }
        
        else {
            
            UserSession newUser = this.validateUSer(userName, password, session);

            jsonAnswer.addProperty("validUser",newUser!=null);
            
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

                    this.roomManager.createRoom(newUser.getUserName());
                    jsonAnswer.addProperty("roomName",newUser.getUserName());
                    this.makeKnowThereIsANewRoom(newUser.getUserName());
                 }

            }     
        
        }
        
        SendMessage.toClient(jsonAnswer, session);
        
        SendMessage.toClient("->login", session);
        log.info("/login - the message has been sent");
    }
    
    private ParticipantSession validateUSer(String userName, String password, WebSocketSession session ){
        ParticipantSession user = null;
        
        /*This is a provisional implementation
        * Here should be a query at the data base
        */
        String name = userName;
        
        if (userName.toLowerCase().contains(ParticipantSession.TUTOR_TYPE)){
            user = new ParticipantSession(session, userName, ParticipantSession.TUTOR_TYPE, name);
            
        }
        else if (userName.toLowerCase().contains(ParticipantSession.STUDENT_TYPE)){
            user = new ParticipantSession(session, userName, ParticipantSession.STUDENT_TYPE, name);
        }
        
        return user;
    }
    
    private void makeKnowThereIsANewRoom(String roomName){
        log.info(" * makeKnowThereIsANewRoom to...");
        
        JsonObject jsonAnswer = new JsonObject();
        jsonAnswer.addProperty("id", "thereIsANewRoom");
        jsonAnswer.addProperty("roomName", roomName);
        
        this.usersRegistry.sendAMessageToIncomingParticipants(jsonAnswer);
        
        log.info(" /makeKnowThereIsANewRoom - the message has been sent");
     }
    
    /**
    * A student user has come into the waiting room.
    */
    private void waitingRoom (final WebSocketSession session, JsonObject jsonMessage){
        log.info("<- waitingRoom - id: {}, message: {}", session.getId(), jsonMessage.toString());
        
        JsonElement avaibleRoomsNames = gson.toJsonTree(this.roomManager.getAvaibleRoomsNames(), new TypeToken<List<String>>() {}.getType());
        JsonObject jsonAnswer = new JsonObject();
        jsonAnswer.addProperty("id","avaibleRooms");
        jsonAnswer.add("avaibleRoomsNames", avaibleRoomsNames);
        
        SendMessage.toClient(jsonAnswer, session);
        
        log.info("/waitingRoom - the message has been sent");
    }
    
    /**
    * An user has come into the waiting room.
    */
    private void joinRoom (WebSocketSession session, JsonObject jsonMessage){
        log.info("<- joinRoom -> id: {}, message: {}", session.getId(), jsonMessage.toString());
        
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
        
        log.info("userName: {}", userName);
        log.info("roomName: {}", roomName);
        //SendMessage.toClient("add participant " + newParticipant.getUserName() + " to " + roomName + session.getId(), session); //$
        this.roomManager.addParticipant(newParticipant, roomName);
        
       log.info("/joinRoom - the message has been sent");
    }
    
    private void receiveVideoFrom(WebSocketSession session, JsonObject jsonMessage){
        log.info("<- receiveVideoFrom -> id: {}, message: {}", session.getId(), jsonMessage.toString());
        
        //UserSession participant = this.usersRegistry.getUserBySessionId(session.getId());
        ParticipantSession participant = this.roomManager.getParticipant(session.getId());
        
        final String userName = jsonMessage.get("userName").getAsString();
        final String roomName = jsonMessage.get("roomName").getAsString();
        SendMessage.toClient("receiveVideoFrom " + userName + " - " + roomName + session.getId(), session); //$
        
        final ParticipantSession sender = this.roomManager.getParticipant(userName, roomName);
        if (sender == null){
            log.info ("!!!!!!!!!participante nulo");
        }
                                                                                          
        final String sdpOffer = jsonMessage.get("sdpOffer").getAsString();
        participant.receivesGreetingsFrom(sender, sdpOffer);
            
        log.info("/ receiveVideoFrom");    
    }
    
    private void iceCandidate(WebSocketSession session, JsonObject jsonMessage){
        log.info("<- iceCandidate: id: {}, message: {}",session.getId() , jsonMessage.toString());
        
        JsonObject candidate = jsonMessage.get("candidate").getAsJsonObject();
        String userName = jsonMessage.get("userName").getAsString();
        
        ParticipantSession participant = this.roomManager.getParticipant(session.getId());
        
	if (participant != null) {
            IceCandidate cand = new IceCandidate(candidate.get("candidate").getAsString(),
                                        candidate.get("sdpMid").getAsString(),
					candidate.get("sdpMLineIndex").getAsInt());
            participant.addCandidate(cand, jsonMessage.get("userName").getAsString());
	}
        log.info("/ iceCandidate"); 
    }
    
    /**
    * An user has left the room.
    */
    private void exitRoom (WebSocketSession session, JsonObject jsonMessage){
        log.info("<- exitRoom: id: {}, message: {}", session.getId(), jsonMessage.toString());
        
        String roomName = jsonMessage.get("roomName").getAsString();
        String userName = jsonMessage.get("userName").getAsString();
        String userType = jsonMessage.get("userType").getAsString();
        
        UserSession user = this.roomManager.participantLeavesARoom(userName, roomName);
        
        if (userType.equals(ParticipantSession.TUTOR_TYPE)) {
            this.makeKnowThereIsAnAvaibleRoomLess(roomName);
            this.usersRegistry.removeUser(userName);
        }
        
        else {
            this.usersRegistry.addIncomingParticipant(user);
        }
        
        log.info("/exitRoom - it has finished");
    }
    
    private void makeKnowThereIsAnAvaibleRoomLess(String roomName){
        log.info("  * makeKnowThereIsARoomLess to...");
        
        JsonObject jsonAnswer = new JsonObject();
        jsonAnswer.addProperty("id", "thereIsAnAvaibleRoomLess");
        jsonAnswer.addProperty("roomName", roomName);
        
        this.usersRegistry.sendAMessageToIncomingParticipants(jsonAnswer);
        
        log.info("  /makeKnowThereIsARoomLess - the message has been sent");
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
   
    
    
    
    
	
}
