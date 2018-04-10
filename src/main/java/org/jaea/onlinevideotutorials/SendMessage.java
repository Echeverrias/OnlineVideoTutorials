/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jaea.onlinevideotutorials;

import com.google.gson.JsonObject;
import java.io.IOException;
import org.jaea.onlinevideotutorials.domain.WSMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

/**
 *
 * @author juanan
 */
public class SendMessage {
    
    private static Logger log = LoggerFactory.getLogger(SendMessage.class);
     
    public static synchronized boolean toClient(JsonObject message, WebSocketSession session){
        
        return toClient(message.toString(), session);
    }

    public static synchronized boolean toClient(WSMessage message, WebSocketSession session){
        
        return toClient(message.toString(), session);
    }

    private static synchronized boolean toClient(String message, WebSocketSession session){
        log.info("SendMessage.toClient");
       
        //log.info("session: {}", session);
        log.info("message: {}", message);
        //Info.SendMsg(session.getId());
        boolean isSuccessful = false;
        
        TextMessage textAnswer = new TextMessage(message);
        log.info("TextMessage created");
        try{
            
               log.info("Sending message: {} to {}", message.toString(), session.getId());
            
            session.sendMessage(textAnswer);
           
            log.info("message has been sent");
            isSuccessful = true;
        }
        catch(IOException e){
           
           log.info("!!! ERROR: Can't deliver the message: {} to {} ", message.toString(), session.getId());
            log.error("Sender: {}", session.getId());
        }
        
          // log.info("(message has been sent: {})", isSuccessful);
         
        return isSuccessful;
    }
    
    // for debugging
    public static synchronized void toClientDebug(String value, WebSocketSession session){
        
        JsonObject msg = new JsonObject();
        msg.addProperty("id", "server");
        msg.addProperty("value",value);
        toClient(msg, session);
    }
}
