/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jaea.onlinevideotutorials.domain;

import com.google.gson.JsonObject;
import org.jaea.onlinevideotutorials.Hour;
import org.jaea.onlinevideotutorials.SendMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.WebSocketSession;

/**
 *
 * @author juanan
 */
public class UserSession extends User{
    
    protected final Logger log = LoggerFactory.getLogger(UserSession.class);
    
    
    
    private final WebSocketSession session;

    public UserSession(WebSocketSession session, String userName, String userType, String name){
        
        super(userName, userType, name);
        this.session = session;
        
        log.info("% UserSession {}", Hour.getTime());
        log.info("/ UserSession: {} {}", name, Hour.getTime());
    }
    
    public UserSession(WebSocketSession session, User user){
        
        super(user);
        this.session = session;
        
        log.info("% UserSession {}", Hour.getTime());
        log.info("/ UserSession: {} {}", name, Hour.getTime());
    }
    
    public UserSession(UserSession user){
        
        super(user.getUserName(), user.getUserType(), user.getUserName());
        this.session = user.getSession();
       
        log.info("% UserSession {}", Hour.getTime());
        log.info("/ UserSession: {} {}", name, Hour.getTime());
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
