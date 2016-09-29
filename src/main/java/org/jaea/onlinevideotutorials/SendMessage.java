/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jaea.onlinevideotutorials;

import com.google.gson.JsonObject;
import java.io.IOException;
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
     
    public static boolean toClient(JsonObject message, WebSocketSession session){
        Info.SendMsg(session.getId());
        boolean isSuccessful = false;
        
        TextMessage textAnswer = new TextMessage(message.toString());
        
        try{
            log.info("Sending message: {} to {}", message.toString(), session.getId());
            session.sendMessage(textAnswer);
            isSuccessful = true;
        }
        catch(IOException e){
            log.error("Sender: {}", session.getId());
        }
        log.info("(message has been sent: {})", isSuccessful);
        return isSuccessful;
    }
    
    // for debugging
    public static void toClient(String value, WebSocketSession session){
        
        JsonObject msg = new JsonObject();
        msg.addProperty("id", "server");
        msg.addProperty("value",value);
        toClient(msg, session);
    }
}
