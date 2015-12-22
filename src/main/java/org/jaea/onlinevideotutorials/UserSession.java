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
import java.io.IOException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

public class UserSession {
    
    private final Logger log = LoggerFactory.getLogger(UserSession.class);
    
    public static final String TUTOR_TYPE = "tutor";
    public static final String STUDENT_TYPE = "student";
            
    private WebSocketSession session;
    private String userName;
    private String userType;
    private String roomName;
    
    public UserSession(WebSocketSession session){
        this.session = session;
       
    }
    
    public UserSession(WebSocketSession session, String userName, String userType){
        this.session = session;
        this.userName = userName;
        this.userType = userType;
        if (userType.equals(TUTOR_TYPE)){
            roomName = userName;
        }
    }
    
    public UserSession(WebSocketSession session, String userName, String userType, String roomName){
        this.session = session;
        this.userName = userName;
        this.userType = userType;
        this.roomName = roomName;
    }

    public WebSocketSession getSession() {
        return session;
    }
    
    public String getUserName() {
        return userName;
    }

    public String getUserType() {
        return userType;
    }

    public String getRoomName() {
        return roomName;
    }
    
    public void setUserName (String userName){
        this.userName = userName;
    }
    
    public void setRoomName (String roomName){
        this.roomName = roomName;
    }
    
    /**
     * 
     * @param message 
     */
    public void sendMeAMessage(JsonObject message){
        TextMessage textAnswer = new TextMessage(message.toString());
        
        try{
            log.info("sendMeAMessage: " + message.toString());
            session.sendMessage(textAnswer);
        }
        catch(IOException e){
            log.error("sendMeAMessage: {}", e.getMessage());
        }
    }
    
    public void close(){
        log.info("close");
    }
    
    
	
}
