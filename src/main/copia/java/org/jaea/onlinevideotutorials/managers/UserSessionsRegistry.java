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
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import org.jaea.onlinevideotutorials.Hour;
import org.jaea.onlinevideotutorials.Info;
import org.jaea.onlinevideotutorials.domain.ParticipantSession;
import org.jaea.onlinevideotutorials.domain.UserSession;
import org.jaea.onlinevideotutorials.domain.MediaRoom;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.WebSocketSession;

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
    
    public void registerUser (UserSession user){
        log.info("{} UserRegistry.registerUser: {}, {}", Info.START_SYMBOL, user.getUserName(), Hour.getTime());
        
        this.usersByUserName.put(user.getUserName(), user);
       
        Info.logInfoFinish("UserRegistry.addUser");
    }

    public boolean registerUserSession (String userName, WebSocketSession session){
        log.info("{} UserRegistry.registerUserSession: {}, {}", Info.START_SYMBOL, userName, Hour.getTime());
        
        UserSession user = this.getUserByUserName(userName);
        if (user == null) {
            log.error("El usuario {} no se encuentra en el registro", userName);
            return false;
        }
        user.attachSession(session);
        
        log.info(" add to usersBySessionId");
        Info.logInfoFinish("UserRegistry.registerUserSession");
        
        return this.registerUserSession(user);
    }

    public boolean registerUserSession (UserSession user){
        log.info("{} UserRegistry.registerUserSession: {}, {}", Info.START_SYMBOL, user.getUserName(), Hour.getTime());
        
        if ((user == null) || (user.getSession() == null)){
            log.error("La sesión del ususario {} es nula", user.getUserName());
            return false;
        }

        this.usersBySessionId.put(user.getSession().getId(), user);
        log.info(" add to usersBySessionId");
       
        Info.logInfoFinish("UserRegistry.registerUserSession");
        return true;
    }
    
    public UserSession getUserByUserName(String userName){
     //   log.info("{} UserRegistry.getUserByUserName: {} {}", Info.START_SYMBOL,userName, Hour.getTime());
      //  Info.logInfoFinish("UserRegistry.getUserByUserName");
        
        return this.usersByUserName.get(userName);
    }
    
    public UserSession getUserBySessionId(String sessionId){
       this.log.info("{} UserRegistry.getUserBySessionId: {} {}", Info.START_SYMBOL,sessionId, Hour.getTime());
      //  Info.logInfoFinish("UserRegistry.getUserBySessionId: " + usersBySessionId.get(sessionId));
        UserSession user = this.usersBySessionId.get(sessionId);
        this.log.info("this.usersBySessionId.size(): {}", this.usersBySessionId.size());
        if (user == null) {
            this.log.error("!!! No se ha encontrado al usuario");
        }
        else{ //####
            this.log.info("UserName: {}", user.getUserName());
        }
        return user;
    }

    public UserSession unregisterUser (String userName){
        log.info("{} UserRegistry.unregisterUser: {}, {}", Info.START_SYMBOL, userName, Hour.getTime());
        
        UserSession outgoingUser = this.usersByUserName.remove(userName);
        if (outgoingUser != null) {
            this.usersBySessionId.remove(outgoingUser.getSessionId());
        }
        return outgoingUser;
    }
    
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
