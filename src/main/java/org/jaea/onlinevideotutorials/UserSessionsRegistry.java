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
    
    /* The next two collections are going to store all the users */
    private final ConcurrentHashMap<String, UserSession> usersByUserName = new ConcurrentHashMap<String, UserSession>();
    private final ConcurrentHashMap<String, UserSession> usersBySessionId = new ConcurrentHashMap<String, UserSession>();
    
    /* The nex collection is only going to store the users which are not in a room */
    private final ConcurrentHashMap<String, UserSession> incomingParticipantsByUserName = new ConcurrentHashMap<String, UserSession>();
    
    private final ConcurrentHashMap<String, List<UserSession>> studentsByRoomName = new ConcurrentHashMap<String, List<UserSession>>();
    private final ConcurrentHashMap<String, UserSession> tutorsByRoomName = new ConcurrentHashMap<String, UserSession>();
     // Store the 'WebSocketSession' for those students who still have not joined into a room
    
    //private final ConcurrentHashMap<String, UserSession> participantsByRoomName = new ConcurrentHashMap<String, UserSession>();
    
    
    
    public void addIncomingParticipant (UserSession user){
        Info.logInfoStart();
        log.info("{} UserRegistry.addIncomingParticipant: {}",Info.START_SYMBOL, user.getUserName());
        
        if (user.getUserType().equals(UserSession.STUDENT_TYPE)){
            incomingParticipantsByUserName.put(user.getUserName(), user);
            log.info("An incoming participant has been added");
            log.info("Now there are {} students in the waiting room",incomingParticipantsByUserName.size());
        }
        
        Info.logInfoFinish("UserRegistry.addIncomingParticipant");
        
    }
    
    public UserSession removeIncomingParticipant(String userName){
        Info.logInfoStart();
         log.info("{} UserRegistry.removeIncomingParticipant: {}",Info.START_SYMBOL, userName);
         
        UserSession user = user = incomingParticipantsByUserName.remove(userName);
        log.info("An incoming participant has been removed");
        log.info("Now there are {} students in the waiting room",incomingParticipantsByUserName.size());
        
        
        Info.logInfoFinish("UserRegistry.removeIncomimgParticipant");
        
        return user;
    }
    
    public void removeIncomingParticipant(UserSession user){
        Info.logInfoStart();
         log.info("{} UserRegistry.removeIncomingParticipant: {}",Info.START_SYMBOL, user.getUserName());
         
         if (user.getUserType().equals(UserSession.STUDENT_TYPE)){
            incomingParticipantsByUserName.remove(user.getUserName());
            log.info("an incoming participant has been removed");
        }
         
        Info.logInfoFinish("UserRegistry.removeIncomimgParticipant");
    }
    
    public void addUser (UserSession user){
        Info.logInfoStart();
        log.info("{} UserRegistry.addUser: {}", Info.START_SYMBOL, user.getUserName());
        
        usersByUserName.put(user.getUserName(), user);
        log.info(" add to usersByName");
        usersBySessionId.put(user.getSession().getId(), user);
        log.info(" add to usersBySessionId");
        
        Info.logInfoFinish("UserRegistry.addUser");
        
    }
    
    public UserSession getUserByUserName(String userName){
        Info.logInfoStart();
        log.info("{} UserRegistry.getUserByUserName: {}", Info.START_SYMBOL,userName);
        Info.logInfoFinish("UserRegistry.getUserByUserName");
        return usersByUserName.get(userName);
    }
    
    public UserSession getUserBySessionId(String sessionId){
        Info.logInfoStart();
        log.info("{} UserRegistry.getUserBySessionId: {}", Info.START_SYMBOL,sessionId);
        Info.logInfoFinish("UserRegistry.getUserBySessionId");
        return usersBySessionId.get(sessionId);
    }
    
   
    
    public UserSession getIncomingParticipantByUserName(String userName){
        Info.logInfoStart();
        log.info("{} UserRegistry.getIncomingParticipantByUserName: {}", Info.START_SYMBOL,userName);
        Info.logInfoFinish("UserRegistry.getIncomingParticipantByUserName");
        return incomingParticipantsByUserName.get(userName);
    }
    
    
    public void sendAMessageToIncomingParticipants(JsonObject message){
        Info.logInfoStart();
        log.info("{} UserRegistry.sendAMessageToIncomingParticipants - message: {}",Info.START_SYMBOL, message);
        
        if (incomingParticipantsByUserName!=null){
            
            for (UserSession user : Collections.list(incomingParticipantsByUserName.elements())){
                log.info("User: {}", user.getUserName());

                user.sendMeAMessage(message);
            }  
            
        }
        
        log.info("the message has been sent to all incoming participants");
         Info.logInfoFinish("UserRegistry.sendAMessageToIncomingParticipants");
    }
    
}
