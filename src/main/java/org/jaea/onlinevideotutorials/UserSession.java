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
import java.io.Closeable;
import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.logging.Level;
import org.kurento.client.Continuation;
import org.kurento.client.EventListener;
import org.kurento.client.IceCandidate;
import org.kurento.client.MediaPipeline;
import org.kurento.client.OnIceCandidateEvent;
import org.kurento.client.WebRtcEndpoint;
import org.kurento.jsonrpc.JsonUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

public class UserSession  {
    
    private final Logger log = LoggerFactory.getLogger(UserSession.class);
    
    public static final String TUTOR_TYPE = "tutor";
    public static final String STUDENT_TYPE = "student";
            
    
    private final String name;
    private final String userName;
    private final String userType;
    private RoomMedia roomMedia;
    
    
    private final WebSocketSession session;
   
    public UserSession(WebSocketSession session, String userName, String userType, String name){
        Info.logInfoStart();
        log.info("% UserSession");
        this.name = name;
        this.session = session;
        this.userName = userName;
        this.userType = userType;
        
        
        log.info("/ UserSession: {}", name);
        Info.logInfoFinish();
    }
    
    public UserSession(UserSession user){
        Info.logInfoStart();
        log.info("% UserSession");
        this.name = user.getName();
        this.session = user.getSession();
        this.userName = user.getName();
        this.userType = user.getUserType();
        
        log.info("/ UserSession: {}", name);
        Info.logInfoFinish();
    }

    
    
    public String getName() {
        return this.name;
    }
    
    public String getUserName() {
        return this.userName;
    }

    public String getUserType() {
        return this.userType;
    }

    public boolean isATutor(){
        return this.userType.equals(TUTOR_TYPE);
    }
    
    public boolean isAStudent(){
        return this.userType.equals(STUDENT_TYPE);
    }
    
    public WebSocketSession getSession() {
        return session;
    }
    
    public RoomMedia getRoomMedia(){
        return this.roomMedia;
    }
    
    
    public String getRoomName(){
        return this.roomMedia.getRoomName();
    }
    
    public boolean assignRoomMedia (RoomMedia roomMedia){
        Info.logInfoStart("User.assignRoomMedia");
        
        boolean assignmentSucessfull = false;
        
        if (this.roomMedia == null){
            this.roomMedia = roomMedia;
            assignmentSucessfull = true;
        }
        
        Info.logInfoFinish("User.assignRoomMedia");
        return assignmentSucessfull;
    }
    
    
    
    public void receivesGreetingsFrom(UserSession participant, String sdpOffer){
        Info.logInfoStart();
        log.info("{} User.receivesGreetingsFrom {} <- {}", this.userName, participant.userName, sdpOffer);
        try {
            this.roomMedia.receiveVideoFrom(participant, sdpOffer);
        } catch (IOException ex) {
            java.util.logging.Logger.getLogger(UserSession.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        Info.logInfoFinish("User.receivesGreetingsFrom");
    }
    
    public void leavesRoom(){
        Info.logInfoStart();
        log.info("{} User.leavesRoom: {} - {}", Info.START_SYMBOL, this.name, this.getRoomName());
        try {
            
            this.roomMedia.close();
            
        } catch (IOException ex) {
            
            java.util.logging.Logger.getLogger(UserSession.class.getName()).log(Level.SEVERE, null, ex);
        }
        Info.logInfoFinish("User.leavesRoom");
    }
    
    public void receivesFarewellFrom(String userName){
        Info.logInfoStart();
        log.info("{} User.receivesFarewellFrom: {}",Info.START_SYMBOL, userName);
        this.roomMedia.cancelVideoFrom(userName);
        Info.logInfoFinish("User.receivesFarewellFrom");
    }
    
    public void addCandidate(IceCandidate candidate, String userName) {
        Info.logInfoStart();
        log.info("{} User.addCandidate: {} to {}", Info.START_SYMBOL, candidate, userName);
        this.roomMedia.addCandidate(candidate, userName);
        Info.logInfoFinish("User.addCandidate");
    }
    
    /**
     * 
     * @param message 
     */
    public void sendMeAMessage(JsonObject message){
        
        SendMessage.toClient(message, this.session);
    }
    
    
    
    public String toString(){
        return "userName: " + this.userName + ", userType: " + this.userType + ", name: " + this.name;
    }
    
    @Override
    public boolean equals(Object obj) {
        
        
        if (this == obj) {
            return true;
	}
	if (obj == null || !(obj instanceof UserSession)) {
            return false;
	}
	UserSession other = (UserSession) obj;
	boolean eq = this.userName.equals(other.userName);

	return eq;
    }
    
    /*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
            int result = 1;
            result = 31 * result + this.userName.hashCode();
            return result;
	}

    
    
	
}
