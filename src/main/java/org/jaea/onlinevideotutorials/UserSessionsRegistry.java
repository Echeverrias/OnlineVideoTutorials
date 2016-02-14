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

import com.google.gson.JsonObject;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Enumeration;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.WebSocketSession;

public class UserSessionsRegistry {
    
    private final Logger log = LoggerFactory.getLogger(UserSessionsRegistry.class);
    
    private final ConcurrentHashMap<String, UserSession> participantsByUserName = new ConcurrentHashMap<String, UserSession>();
    private final ConcurrentHashMap<String, UserSession> participantsBySessionId = new ConcurrentHashMap<String, UserSession>();
    private final ConcurrentHashMap<String, List<UserSession>> studentsByRoomName = new ConcurrentHashMap<String, List<UserSession>>();
    private final ConcurrentHashMap<String, UserSession> tutorsByRoomName = new ConcurrentHashMap<String, UserSession>();
     // Store the 'WebSocketSession' for those students who still have not joined into a room
    private final ConcurrentHashMap<String, UserSession> incomingParticipantsByUserName = new ConcurrentHashMap<String, UserSession>();
    //private final ConcurrentHashMap<String, UserSession> participantsByRoomName = new ConcurrentHashMap<String, UserSession>();
    
    public UserSessionsRegistry(){
        
    }
    
    public void addIncomingParticipant (UserSession user){
        log.info("* User.addIncomingParticipant: {}", user.getUserName());
        
        if (user.getUserType().equals(UserSession.STUDENT_TYPE)){
            incomingParticipantsByUserName.put(user.getUserName(), user);
            log.info("an incoming participant has been added");
        }
        
        log.info("/ addIncomingParticipant");
        
    }
    
    public void removeIncomingParticipant(UserSession user){
         log.info("* User.removeIncomingParticipant: {}", user.getUserName());
         
         if (user.getUserType().equals(UserSession.STUDENT_TYPE)){
            incomingParticipantsByUserName.remove(user.getUserName());
            log.info("an incoming participant has been removed");
        }
         
         log.info("/ removeIncomimgParticipant");
    }
    
    public void addParticipant (UserSession user, String roomName){
        log.info("* User.addParticipant: {}", user.getUserName());
        
        participantsByUserName.put(user.getUserName(), user);
        log.info(" add to usersByName");
        participantsBySessionId.put(user.getSession().getId(), user);
        log.info(" add to usersBySessionId");
         
       log.info(" room name: {}", roomName);
        
        if (roomName != null) {
            if (user.getUserType().equals(UserSession.TUTOR_TYPE)){
                tutorsByRoomName.put(roomName, user);
                log.info("a tutor has been added");
            }
            else{ log.info("  add a student");

                if (!studentsByRoomName.containsKey(roomName)){
                    log.info("  add the room");
                    studentsByRoomName.put(roomName, new ArrayList<UserSession>());
                }
                studentsByRoomName.get(roomName).add(user);
                log.info("a student has been added");
            } 
        }    
        log.info("/ addParticipant");
        
    }
    
    public UserSession getParticipantByUserName(String userName){
        return participantsByUserName.get(userName);
    }
    
    public UserSession getIncomingParticipantByUserName(String userName){
        return incomingParticipantsByUserName.get(userName);
    }
    
    /*
    public void addUserIntoRoom (UserSession user){
        
        String room = user.getRoomName();
        
        if (user.getUserType().equals(UserSession.TUTOR_TYPE)){
            tutorsByRoomName.put(room, user);
        }
        else{
            
            if (!studentsByRoomName.containsKey(room)){
                studentsByRoomName.put(room, new ArrayList<UserSession>());
            }
            studentsByRoomName.get(room).add(user);
        }    
        
    }
    */
    
    public List<UserSession> getStudentsByRoomName(String roomName){
        return studentsByRoomName.get(roomName);
    }
    
    /**
     * 
     * @param roomName
     * @return List<String> or null 
     */
    public List<String> getStudentsNamesByRoomName(String roomName){
        
        List <UserSession> students = studentsByRoomName.get(roomName);
        List <String> studentsNames = null;
        if (students != null){
            
            studentsNames = new ArrayList<String>();
            for(UserSession user : students){
                studentsNames.add(user.getUserName());
            }
            
        }    
        return studentsNames;
    }
    
    public void sendAMessageToTheTutor(JsonObject message, String room){
        log.info("* sendAMessageToTheTutor - message: {}", message.get("id").getAsString());
        
        UserSession tutor = getTutorOfRoom(room);
        
        if (tutor!=null){
            
            tutor.sendMeAMessage(message);
            
        }
        
        log.info("the message has been sent to the tutor of the '{}' room ", room);
    }
    
    
    
    public void sendAMessageToIncomingParticipants(JsonObject message){
        log.info("* sendAMessageToIncomingParticipants - message: {}", message);
        
        if (incomingParticipantsByUserName!=null){
            
            for (UserSession user : Collections.list(incomingParticipantsByUserName.elements())){
                log.info("User: {}", user.getUserName());

                user.sendMeAMessage(message);
            }  
            
        }
        
        log.info("the message has been sent to all incoming participants");
    }
    
    
    public void sendAMessageToAllStudentsOfRoom(JsonObject message, String room){
        log.info("* sendAMessageToAllStudentsOfRoom - message: {}, room: {}, to:", message.get("id").getAsString(), room, getStudentsByRoomName(room));
        
        List<UserSession> students = getStudentsByRoomName(room);
        
        if (students!=null){
            
            for (UserSession student : students){
                log.info("Student: {}", student.getSession().getId());

                student.sendMeAMessage(message);
            }  
            
        }
        
        log.info("the message has been sent to all students of the '{}' room ", room);
    }
    
    public List<String> getAvaiblesRoomsNames (){
        return Collections.list(tutorsByRoomName.keys());
    }
    
    public UserSession getTutorOfRoom (String roomName){
        return tutorsByRoomName.get(roomName);
    }
    
    public String getTutorNameOfRoom (String roomName){
        return tutorsByRoomName.get(roomName).getUserName();
    }
    
    /**
     * 
     * @param participant 
     */
    public void removeParticipant(UserSession participant, String roomName){
        log.info("* removeParticipant {} from {}", participant.getUserName(), roomName);
        log.info("users: {}", participantsBySessionId.toString()); 
        
        participant.close();
        participantsByUserName.remove(participant.getUserName());
        participantsBySessionId.remove(participant.getSession().getId());
        
        if (!tutorsByRoomName.remove(roomName, participant)){
            log.info("I'm going to remove a student");
            studentsByRoomName.get(roomName).remove(participant);
                        
        }
        else{
            log.info("I've removed a tutor");
        }
        log.info("/ removeParticipant");
    }
    
    
    
    
	
}
