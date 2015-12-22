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
    
    private final ConcurrentHashMap<String, UserSession> usersByName = new ConcurrentHashMap<String, UserSession>();
    private final ConcurrentHashMap<String, UserSession> usersBySessionId = new ConcurrentHashMap<String, UserSession>();
    private final ConcurrentHashMap<String, List<UserSession>> studentsByRoomName = new ConcurrentHashMap<String, List<UserSession>>();
    private final ConcurrentHashMap<String, UserSession> tutorsByRoomName = new ConcurrentHashMap<String, UserSession>();
    //private final ConcurrentHashMap<String, UserSession> participantsByRoomName = new ConcurrentHashMap<String, UserSession>();
    
    public UserSessionsRegistry(){
        
    }
    
    public void addUser (UserSession user){
        log.info("* addUser");
        
        usersByName.put(user.getUserName(), user);
        usersBySessionId.put(user.getSession().getId(), user);
        
        String room = user.getRoomName();
        
        if (user.getUserType().equals(UserSession.TUTOR_TYPE)){
            tutorsByRoomName.put(room, user);
            log.info("a tutor has been added");
        }
        else{
            
            if (!studentsByRoomName.containsKey(room)){
                studentsByRoomName.put(room, new ArrayList<UserSession>());
            }
            studentsByRoomName.get(room).add(user);
            log.info("a student has been added");
        }  
        
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
    public List<String> getStudentsNameByRoomName(String roomName){
        
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
    
    public void sendAMessageToAllStudentsOfRoom(JsonObject message, String room){
        log.info("* sendAMessageToAllStudentsOfRoom - message: {}, room: {}", message.get("id").getAsString(), room);
        
        List<UserSession> students = getStudentsByRoomName(room);
        
        if (students!=null){
            
            for (UserSession student : students){
                log.info("Student: {}", student.getSession().getId());

                student.sendMeAMessage(message);
            }  
            
        }
        
        log.info("the message has been sent to all students of the '{}' room ", room);
    }
    
    public List<String> getRoomNames (){
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
     * @param id 
     */
    public void removeUserFromThisRoom(String id){
        log.info("* removeUserFromRoom - id: {}", id);
        log.info("users: {}", usersBySessionId.toString()); 
        
        UserSession user = usersBySessionId.get(id);
        if (user == null){
            log.info("user is null");
        }
        log.info("user name: {}",user.getUserName());
        String room = user.getRoomName();
        log.info("user room: {}",room);
        user.close();
        if (!tutorsByRoomName.remove(room, user)){
            log.info("I'm going to remove a student");
            studentsByRoomName.get(room).remove(user);
            log.info("I've removed a student");
        }
        log.info("the user has been removed from the '{}' room", room);
    }
    
    
    
    
	
}
