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
    private final UserSessionsRegistry users = new UserSessionsRegistry();
    
    // Store the 'WebSocketSession' for those students who still have not joined into a room
    private final ConcurrentHashMap<String, WebSocketSession> incomingStudentsSessions = new ConcurrentHashMap<String, WebSocketSession>();
        
    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        JsonObject jsonMessage = gson.fromJson(message.getPayload(), JsonObject.class);

	log.debug("Incoming message: {}", jsonMessage);

	switch (jsonMessage.get("id").getAsString()) {
                    
        case "login":
            login(session, jsonMessage);
            break;
            
        case "joinRoom":
            joinRoom(session, jsonMessage);
            break;
            
        case "exitRoom":
            exitRoom(session, jsonMessage);
            break;    
		
	}
    }
    
    private void login(final WebSocketSession session, JsonObject jsonMessage){
        log.info("* login -> Id: {}", session.getId());
        
        String name = jsonMessage.get("name").getAsString();
        String password = jsonMessage.get("password").getAsString();
        
        Boolean isValidUser;
        JsonElement jsonElement = null;
        String userType = tellMeTheTypeOfUSer(name, password);
       
        if (userType == null ){
            
            isValidUser = false;
            log.info("Is not a valid user");
        }    
        else{ 
                
            isValidUser = true;
            
            // A tutor create a new room
            if (userType.equals(UserSession.TUTOR_TYPE)){
                
                log.info("The user is a tutor");
                UserSession tutor = new UserSession(session, name, userType);
                users.addUser(tutor);
                makeKnowThereIsANewRoom(tutor.getRoomName());
                
            }
            else { // The user is an student
                
                log.info("The user is a student");
                incomingStudentsSessions.put(session.getId(), session);
                synchronized(session){  
                    jsonElement = gson.toJsonTree(users.getRoomNames(), new TypeToken<List<String>>() {}.getType());
                }
                
            }
        }     
         
        JsonObject jsonAnswer = new JsonObject();
        jsonAnswer.addProperty("id","login");
        jsonAnswer.addProperty("validUser",isValidUser);
        jsonAnswer.addProperty("userName",name);
        jsonAnswer.addProperty("userType",userType);
        jsonAnswer.add("rooms",jsonElement);
        
        sendMessage(session, jsonAnswer);
    }
    
    /**
     * 
     * @param room 
     */
    private void makeKnowThereIsANewRoom(String room){
        log.info("* makeKnowThereIsANewRoom to...");
        
        JsonObject jsonAnswer = new JsonObject();
        jsonAnswer.addProperty("id", "thereIsANewRoom");
        jsonAnswer.addProperty("room", room);
        
        sendMessageToIncomingStudents(jsonAnswer);
     }
    
    
    private void joinRoom (WebSocketSession session, JsonObject jsonMessage){
        log.info("* joinRoom -> Id: {}", session.getId());
        
        String userName = jsonMessage.get("userName").getAsString();
        String roomName = jsonMessage.get("roomName").getAsString();
        
        List<String> studentsNames = users.getStudentsNameByRoomName(roomName);
        if (studentsNames != null){log.info("These are the students of '{}' room: {}", roomName, studentsNames.toString());}
        String tutorName = users.getTutorNameOfRoom(roomName);
        
        makeKnowThereIsANewParticipant(userName, roomName);
        
        UserSession newParticipant = new UserSession(session, userName, UserSession.STUDENT_TYPE, roomName);
        users.addUser(newParticipant);
        log.info("These are now the students of this room: " + users.getStudentsNameByRoomName(roomName).toString());
        
        JsonElement jsonElement = null;
        synchronized(session){  
           jsonElement = gson.toJsonTree(studentsNames, new TypeToken<List<String>>() {}.getType());
        }
        
        JsonObject jsonAnswer = new JsonObject();
        jsonAnswer.addProperty("id", "joinedIntoRoom");
        jsonAnswer.addProperty("roomName", roomName);
        jsonAnswer.addProperty("tutorName", tutorName);
        jsonAnswer.add("studentsNames", jsonElement);
        
        newParticipant.sendMeAMessage(jsonAnswer);
    }
    
    /**
     * 
     * @param name
     * @param room 
     */
    private void makeKnowThereIsANewParticipant(String name, String room){
        log.info("* makeKnowThereIsANewParticipant to...");
        
        JsonObject jsonAnswer = new JsonObject();
        jsonAnswer.addProperty("id", "thereIsANewParticipant");
        jsonAnswer.addProperty("studentName", name);
        
        users.sendAMessageToTheTutor(jsonAnswer, room);
        users.sendAMessageToAllStudentsOfRoom(jsonAnswer, room);
        
     }
                    
    /**
     * 
     * @param name The name of the user.
     * @param password The password of the user.
     * @return String The type of user ("Tutor" or "Student") or 'null' if the user doesn't exist in the data base. 
     */
    private String tellMeTheTypeOfUSer(String name, String password){
        String userType = null;
        
        // Here should be a query at the data base of the university
        
        // This is a provisional implementation
        if (name.toLowerCase().contains(UserSession.TUTOR_TYPE)){
            userType = UserSession.TUTOR_TYPE;
        }
        else if (name.toLowerCase().contains(UserSession.STUDENT_TYPE)){
            userType = UserSession.STUDENT_TYPE;
        } 
        
        return userType;
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
        log.info("* exitRoom -> Id: {}", session.getId());
        
        String roomName = jsonMessage.get("roomName").getAsString();
        log.info("room: {}", roomName);
        String userName = jsonMessage.get("userName").getAsString();
        String userType = jsonMessage.get("userType").getAsString();
      ;
       
        users.removeUserFromThisRoom(session.getId());
        
        makeKnowAParticipantHasLeftTheRoom(userName, userType, roomName);
        
    }
    
    /**
     * 
     * @param name
     * @param room 
     */
    private void makeKnowAParticipantHasLeftTheRoom(String name, String userType, String room){
        log.info("* makeKnowAParticipantHasLeftTheRoom...");
        
        JsonObject jsonAnswer = new JsonObject();
        jsonAnswer.addProperty("id", "aParticipantHasLeftTheRoom");
        jsonAnswer.addProperty("userName", name);
        jsonAnswer.addProperty("userType", userType);
        jsonAnswer.addProperty("roomName", room);
        
        users.sendAMessageToTheTutor(jsonAnswer, room);
        users.sendAMessageToAllStudentsOfRoom(jsonAnswer, room);
        
        if (userType.equals(UserSession.TUTOR_TYPE)){
            makeKnowThereIsARoomLess(room);
        }
        
        
     }
    
    /**
     * 
     * @param room 
     */
    private void makeKnowThereIsARoomLess(String room){
        log.info("* makeKnowThereIsARoomLess to...");
        
        JsonObject jsonAnswer = new JsonObject();
        jsonAnswer.addProperty("id", "thereIsARoomLess");
        jsonAnswer.addProperty("room", room);
        
        sendMessageToIncomingStudents(jsonAnswer);
     }
    
    private void sendMessageToIncomingStudents(JsonObject message){
        
        for (WebSocketSession incomingStudentSession : Collections.list(incomingStudentsSessions.elements())){
            log.info("Student: {}", incomingStudentSession.getId());
            
            sendMessage(incomingStudentSession, message);
        } 
    }
	
}
