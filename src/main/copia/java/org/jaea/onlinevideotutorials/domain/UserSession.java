/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jaea.onlinevideotutorials.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.google.gson.JsonObject;
import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;
import org.jaea.onlinevideotutorials.Hour;
import org.jaea.onlinevideotutorials.SendMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.WebSocketSession;

/**
 *
 * @author juanan
 */

@MappedSuperclass
@JsonIgnoreProperties(value={"log", "session"})
public class UserSession extends User{
    
    
    @Transient
    protected final Logger log = LoggerFactory.getLogger(UserSession.class);
    
    @Transient
    private WebSocketSession session;
    
    protected UserSession(){
        super();
    }
    
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

    public void attachSession(WebSocketSession session){
        if (this.session == null) {
            this.session = session;
        }
    }
    
    @JsonIgnore
    public String getSessionId() {
        return session.getId();
    }
    
    public boolean sendMeAMessage(JsonObject message){
        
        boolean result = SendMessage.toClient(message, this.session);
        return result;
    }

    public boolean sendMeAMessage(WebSocketMessage message){
        log.info("UserSession.sendMeAMessage:");
        log.info(message.toString());
        boolean result = SendMessage.toClient(message, this.session);
        return result;
    }
    
    
}
