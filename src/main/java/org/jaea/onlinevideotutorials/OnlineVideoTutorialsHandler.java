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
    private UserSession me = null;
    private final UserSessionsRegistry users = new UserSessionsRegistry();
    
   
        
    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        JsonObject jsonMessage = gson.fromJson(message.getPayload(), JsonObject.class);

	log.debug("Incoming message: {}", jsonMessage);

	switch (jsonMessage.get("id").getAsString()) {
                    
        case "login":
            login(session, jsonMessage);
            log.info("");
            log.info("");
            break;
        case "waitingRoom":
            waitingRoom(session, jsonMessage);
            log.info("");
            log.info("");
            break;
        case "joinRoom":
            joinRoom(session, jsonMessage);
            log.info("");
            log.info("");
            break;
            
        case "exitRoom":
            exitRoom(session, jsonMessage);
            log.info("");
            log.info("");
            break;    
		
	}
    }
    
    private void login(final WebSocketSession session, JsonObject jsonMessage){
        log.info("<- login - Id: {}", session.getId());
        
        String userName = jsonMessage.get("userName").getAsString();
        String password = jsonMessage.get("password").getAsString();
        
        JsonElement jsonElement = null;
        this.me = validateUSer(userName, password, session);
        
        JsonObject jsonAnswer = new JsonObject();
        jsonAnswer.addProperty("id","login");
        jsonAnswer.addProperty("validUser",this.me!=null);
        jsonAnswer.addProperty("name",this.me.getName());
        jsonAnswer.addProperty("userName",this.me.getUserName());
        jsonAnswer.addProperty("userType",this.me.getUserType());
        
       
        if (this.me == null ){
            
            log.info("Is not a valid user");
            
        }    
        else{ 
                
            // A tutor create a new room
            if (me.getUserType().equals(UserSession.TUTOR_TYPE)){
                
                log.info("The user is a tutor");
                jsonAnswer.addProperty("roomName",this.me.getUserName());
                users.addParticipant(this.me, userName);
                makeKnowThereIsANewRoom(userName);
                log.info("These are now the avaibles rooms: "+ users.getAvaiblesRoomsNames());
                log.info("These are now the avaibles rooms: "+ users.getAvaiblesRoomsNames().toString());
                
            }
            else { // The user is an student
                
                log.info("The user is a student");
                log.info("These are the avaibles rooms: "+ users.getAvaiblesRoomsNames());
                log.info("These are the avaibles rooms: "+ users.getAvaiblesRoomsNames().toString());
                users.addIncomingParticipant(this.me);
                synchronized(session){  
                    jsonElement = gson.toJsonTree(users.getAvaiblesRoomsNames(), new TypeToken<List<String>>() {}.getType());
                }
                
            }
        }     
         
        
        
        sendMessage(session, jsonAnswer);
        log.info("/login - the message has been sent");
    }
    
     private void waitingRoom (final WebSocketSession session, JsonObject jsonMessage){
        log.info("<- waitingRoom - Id: {}", session.getId());
         
        JsonElement avaibleRoomsNames = gson.toJsonTree(users.getAvaiblesRoomsNames(), new TypeToken<List<String>>() {}.getType());
        JsonObject jsonAnswer = new JsonObject();
        jsonAnswer.addProperty("id","avaibleRooms");
        jsonAnswer.add("avaibleRoomsNames", avaibleRoomsNames);
        
        sendMessage(session, jsonAnswer);
        log.info("/waitingRoom - the message has been sent");
     
     }
    
    /**
     * 
     * @param roomName 
     */
    private void makeKnowThereIsANewRoom(String roomName){
        log.info(" * makeKnowThereIsANewRoom to...");
        
        JsonObject jsonAnswer = new JsonObject();
        jsonAnswer.addProperty("id", "thereIsANewRoom");
        jsonAnswer.addProperty("roomName", roomName);
        
        users.sendAMessageToIncomingParticipants(jsonAnswer);
        log.info(" /makeKnowThereIsANewRoom - the message has been sent");
     }
    
    
    private void joinRoom (WebSocketSession session, JsonObject jsonMessage){
        log.info("<- joinRoom -> Id: {}", session.getId());
        
        String name = jsonMessage.get("name").getAsString();
        String userName = jsonMessage.get("userName").getAsString();
        String roomName = jsonMessage.get("roomName").getAsString();
        
        UserSession newParticipant = users.getIncomingParticipantByUserName(userName);
        
        users.removeIncomingParticipant(newParticipant);
        
        log.info("userName: {}", userName);
        log.info("roomName: {}", roomName);
        
        List<String> studentsNames = users.getStudentsNamesByRoomName(roomName);
        if (studentsNames != null){log.info("These are the students of '{}' room: {}", roomName, studentsNames.toString());}
        
        makeKnowThereIsANewParticipant(newParticipant, roomName);
        makeKnowTheParticipantsOfRoom(newParticipant, roomName);
        users.addParticipant(newParticipant, roomName);
        log.info("These are now the students of this room: " + users.getStudentsNamesByRoomName(roomName).toString());
        
        JsonElement jsonElement = null;
        synchronized(session){  
           jsonElement = gson.toJsonTree(studentsNames, new TypeToken<List<String>>() {}.getType());
        }
        
       log.info("/joinRoom - the message has been sent");
    }
    
    /**
     * 
     * @param participant
     */
    private void makeKnowThereIsANewParticipant(UserSession newParticipant, String roomName){
        log.info("  * makeKnowThereIsANewParticipant ({}) to participants of room {}:", newParticipant.toString(), roomName);
        
        JsonObject jsonAnswer = new JsonObject();
        jsonAnswer.addProperty("id", "thereIsANewParticipant");
        jsonAnswer.addProperty("userName", newParticipant.getUserName());
        jsonAnswer.addProperty("name", newParticipant.getName());
        jsonAnswer.addProperty("userType", newParticipant.getUserType());
        
        
        log.info("Mensaje: {}",jsonAnswer.toString());
        users.sendAMessageToTheTutor(jsonAnswer, roomName);
        users.sendAMessageToAllStudentsOfRoom(jsonAnswer, roomName);
        log.info("  /makeKnowThereIsANewParticipant - the messages have been sent");
     }
                    
    /**
     * 
     * @param userName The userName of the user.
     * @param password The password of the user.
     * @return UserSession/null A new UserSession or 'null' if the user doesn't exist in the data base. 
     */
    private UserSession validateUSer(String userName, String password, WebSocketSession session ){
        UserSession user = null;
        
        // Here should be a query at the data base of the university
        
        // This is a provisional implementation
        if (userName.toLowerCase().contains(UserSession.TUTOR_TYPE)){
            user = new UserSession(session, userName, userName, UserSession.TUTOR_TYPE, userName);
        }
        else if (userName.toLowerCase().contains(UserSession.STUDENT_TYPE)){
            user = new UserSession(session, userName, userName, UserSession.STUDENT_TYPE);
        }
        
        
        return user;
    }  
    
    /**
     * 
     * @param session
     * @param message 
     */
    private void sendMessage(WebSocketSession session, JsonObject message){
        TextMessage textAnswer = new TextMessage(message.toString());
        
        try{
            session.sendMessage(textAnswer);
        }
        catch(IOException e){
            log.error("sendMessage: {}", e.getMessage());
        }
    }
    
    private void exitRoom (WebSocketSession session, JsonObject jsonMessage){
        log.info("<- exitRoom - Id: {}", session.getId());
        
        String roomName = jsonMessage.get("roomName").getAsString();
        String userName = jsonMessage.get("userName").getAsString();
        String userType = jsonMessage.get("userType").getAsString();
        log.info("room: {}", roomName);
        
      
        UserSession participant = users.getParticipantByUserName(userName);
        users.removeParticipant(participant, roomName);
        users.addIncomingParticipant(participant);
        
        makeKnowAParticipantHasLeftTheRoom(participant, roomName);
        
        if (userType.equals(UserSession.TUTOR_TYPE)){
            makeKnowThereIsAnAvaibleRoomLess(roomName);
        }
        
        log.info("/exitRoom - it has finished");
        
    }
    
    /**
     * 
     * @param participant
     */
    private void makeKnowAParticipantHasLeftTheRoom(UserSession participant, String roomName){
        log.info("  * makeKnowAParticipantHasLeftTheRoom...");
        
        JsonObject jsonAnswer = new JsonObject();
        jsonAnswer.addProperty("id", "aParticipantHasLeftTheRoom");
        jsonAnswer.addProperty("userName", participant.getUserName());
        jsonAnswer.addProperty("userType", participant.getUserType());
        jsonAnswer.addProperty("roomName", roomName);
        
        if (participant.isAStudent()){
            users.sendAMessageToTheTutor(jsonAnswer, roomName);
        }    
        users.sendAMessageToAllStudentsOfRoom(jsonAnswer, roomName);
        
        log.info("  /makeKnowAParticipantHasLeftTheRoom - the messages have been sent");
        
        
        
        
     }
    
    /**
     * 
     * @param roomName 
     */
    private void makeKnowThereIsAnAvaibleRoomLess(String roomName){
        log.info("  * makeKnowThereIsARoomLess to...");
        
        JsonObject jsonAnswer = new JsonObject();
        jsonAnswer.addProperty("id", "thereIsAnAvaibleRoomLess");
        jsonAnswer.addProperty("roomName", roomName);
        
        users.sendAMessageToIncomingParticipants(jsonAnswer);
        
        log.info("  /makeKnowThereIsARoomLess - the message has been sent");
     }
    
    
    
    
    public void makeKnowTheParticipantsOfRoom (UserSession participant, String roomName){
        log.info("  * makeKnowTheParticipantsOfRoom");
        
        UserSession tutor= users.getTutorOfRoom(roomName);
        log.info("tutor: {}", tutor.toString());
        JsonObject jsonAnswer = new JsonObject();
        jsonAnswer.addProperty("id", "thereIsAParticipant");
        jsonAnswer.addProperty("userName", tutor.getUserName());
        jsonAnswer.addProperty("name", tutor.getName());
        jsonAnswer.addProperty("userType", tutor.getUserType());
        participant.sendMeAMessage(jsonAnswer);
        
        List<UserSession> students = users.getStudentsByRoomName(roomName);
        if (students != null){
            for (UserSession student : students){
                
                log.info("student: {}", tutor.toString());
                jsonAnswer = new JsonObject();
                jsonAnswer.addProperty("id", "thereIsAParticipant");
                jsonAnswer.addProperty("userName", student.getUserName());
                jsonAnswer.addProperty("name", student.getName());
                jsonAnswer.addProperty("userType", student.getUserType());
                log.info("student: {}", student.toString());
                participant.sendMeAMessage(jsonAnswer);
            }
        }    
        
        log.info("  /makeKnowTheParticipantsOfRoom - the messages have been sent");
    }
	
}
