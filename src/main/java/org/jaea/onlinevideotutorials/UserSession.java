/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jaea.onlinevideotutorials;

import com.google.gson.JsonObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.WebSocketSession;

/**
 *
 * @author juanan
 */
public class UserSession implements User{
    
    protected final Logger log = LoggerFactory.getLogger(ParticipantSession.class);
    
    private final String name;
    private final String userName;
    private final String userType;
    
    private final WebSocketSession session;

    public UserSession(WebSocketSession session, String userName, String userType, String name){
        log.info("% UserSession {}", Hour.getTime());

        this.name = name;
        this.session = session;
        this.userName = userName;
        this.userType = userType;
        
        log.info("/ UserSession: {} {}", name, Hour.getTime());
    }
    
    public UserSession(UserSession user){
        log.info("% UserSession {}", Hour.getTime());

        this.name = user.getName();
        this.session = user.getSession();
        this.userName = user.getName();
        this.userType = user.getUserType();
        
        log.info("/ UserSession: {} {}", name, Hour.getTime());
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
    
    public String getSessionId() {
        return session.getId();
    }
    
    public void sendMeAMessage(JsonObject message){
        
        SendMessage.toClient(message, this.session);
    }
    
    @Override
    public boolean equals(Object obj) {
        
        if (this == obj) {
            return true;
	}
	if ((obj == null) || !(obj instanceof User)) {
            return false;
	}
	User other = (User) obj;
	boolean eq = this.userName.equals(other.getUserName());

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
