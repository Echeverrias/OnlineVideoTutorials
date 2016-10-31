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
package org.jaea.onlinevideotutorials.managers;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.jaea.onlinevideotutorials.Hour;
import org.jaea.onlinevideotutorials.Info;
import org.jaea.onlinevideotutorials.domain.UserSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UserSessionsRegistry {
    
    private final Logger log = LoggerFactory.getLogger(UserSessionsRegistry.class);
    
    /* The next two collections are going to store all the users */
    private final ConcurrentHashMap<String, UserSession> usersByUserName = new ConcurrentHashMap();
    private final ConcurrentHashMap<String, UserSession> usersBySessionId = new ConcurrentHashMap();
    
    /* It stores the students which are not in a room */
    //private final ConcurrentHashMap<String, UserSession> incomingParticipantsByUserName = new ConcurrentHashMap();
    

    public UserSessionsRegistry(){
        log.info("UserSessionsRegistry");
    }


    public boolean isThereAlreadyThisUser(String userName) {
        log.info("{} UserRegistry.isThereAlreadyThisUser: {}, {}", Info.START_SYMBOL, userName, Hour.getTime());
        return this.usersByUserName.containsKey(userName);
    }
    
    public void addUser (UserSession user){
        log.info("{} UserRegistry.addUser: {}, {}", Info.START_SYMBOL, user.getUserName(), Hour.getTime());
        
        this.usersByUserName.put(user.getUserName(), user);
        log.info(" add to usersByName");
        this.usersBySessionId.put(user.getSession().getId(), user);
        log.info(" add to usersBySessionId");
       
        Info.logInfoFinish("UserRegistry.addUser");
    }
    
    public UserSession getUserByUserName(String userName){
     //   log.info("{} UserRegistry.getUserByUserName: {} {}", Info.START_SYMBOL,userName, Hour.getTime());
      //  Info.logInfoFinish("UserRegistry.getUserByUserName");
        
        return usersByUserName.get(userName);
    }
    
    public UserSession getUserBySessionId(String sessionId){
       // log.info("{} UserRegistry.getUserBySessionId: {} {}", Info.START_SYMBOL,sessionId, Hour.getTime());
      //  Info.logInfoFinish("UserRegistry.getUserBySessionId: " + usersBySessionId.get(sessionId));
        
        return usersBySessionId.get(sessionId);
    }

    public UserSession removeUser (String userName){
        log.info("{} UserRegistry.removeUser: {}, {}", Info.START_SYMBOL, userName, Hour.getTime());
        
        UserSession outgoingUser = this.usersByUserName.remove(userName);
        if (outgoingUser != null) {
            this.usersBySessionId.remove(outgoingUser.getSessionId());
        }
        return outgoingUser;
    }
    
    /*
    public void addIncomingParticipant (UserSession user){
        log.info("{} UserRegistry.addIncomingParticipant: {} {}",Info.START_SYMBOL, user.getUserName(), Hour.getTime());
        this.printIncomingParticipants(); //*
        if (user.isAStudent()){
            incomingParticipantsByUserName.put(user.getUserName(), user);
            log.info("An incoming participant has been added");
            log.info("Now there are {} students in the waiting room",incomingParticipantsByUserName.size());
        }
        this.printUsers(); //*
        Info.logInfoFinish("UserRegistry.addIncomingParticipant");
     }
    
    public UserSession getIncomingParticipantByUserName(String userName){
        log.info("{} UserRegistry.getIncomingParticipantByUserName: {} {}", Info.START_SYMBOL,userName, Hour.getTime());
        Info.logInfoFinish("UserRegistry.getIncomingParticipantByUserName");
        
        return incomingParticipantsByUserName.get(userName);
    }
    
    public List<UserSession> getIncomingParticipants(){
        return Collections.list(this.incomingParticipantsByUserName.elements());
    }
    
    public UserSession removeIncomingParticipant(UserSession user){
        log.info("{} UserRegistry.removeIncomingParticipant: {} {}",Info.START_SYMBOL, user.getUserName(), Hour.getTime());
         
       UserSession incomingParticipant = this.removeIncomingParticipant(user.getUserName());
         
        Info.logInfoFinish("UserRegistry.removeIncomimgParticipant");
        
        return incomingParticipant;
    }
    
    public UserSession removeIncomingParticipant(String userName){
        log.info("{} UserRegistry.removeIncomingParticipant: {} {}",Info.START_SYMBOL, userName, Hour.getTime());
         
        UserSession user = this.incomingParticipantsByUserName.remove(userName);
        
        log.info("An incoming participant has been removed");
        log.info("Now there are {} students in the waiting room",incomingParticipantsByUserName.size());
        Info.logInfoFinish("UserRegistry.removeIncomimgParticipant");
        
        return user;
    }
    
   
    //#
    public void printIncomingParticipants(){
        log.info("The incoming participants are: " + this.incomingParticipantsByUserName.size());
        for (Map.Entry <String, UserSession> entry : this.incomingParticipantsByUserName.entrySet()){
            log.info("- " + entry.getKey());
        }   
    }
    */
    

    //#
    public String toString(){
        return "UserSessionsRegistry";
    }

    
     //#
    public void printUsers(){
        log.info("The users are: " + this.usersByUserName.size());
        for (Map.Entry <String, UserSession> entry : this.usersByUserName.entrySet()){
            log.info("- " + entry.getKey());
        }   
    }
}
