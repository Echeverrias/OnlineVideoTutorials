package org.jaea.onlinevideotutorials.utilities;

import com.google.gson.JsonObject;
import org.jaea.onlinevideotutorials.domain.ParticipantSession;
import org.jaea.onlinevideotutorials.handlers.LoginHandler;
import org.jaea.onlinevideotutorials.handlers.WaitingRoomHandler;
import org.springframework.web.socket.TextMessage;

/**
 *
 * @author Juan Antonio Echeverrías Aranda
 */
public class TextMessageDispenser {
    
    private static String attributeNameOfTheMessageId = "id";
    
    public static void setAttributeNameOfTheMessageId(String attributeName){
        attributeNameOfTheMessageId = attributeName;
    } 
    
    public static TextMessage getParticipantTextMessage(String messageId, ParticipantSession participant){
        JsonObject msg = new JsonObject();
        msg.addProperty(attributeNameOfTheMessageId, messageId);
        msg.addProperty("userName",participant.getUserName());
        msg.addProperty("name", participant.getName());
        msg.addProperty("userType", participant.getUserType());
        TextMessage tm = new TextMessage(msg.toString());
        
        return tm;
    }
    
    public static TextMessage getRoomParticipantTextMessage(String messageId, String roomName, ParticipantSession participant){
        JsonObject msg = new JsonObject();
        msg.addProperty(attributeNameOfTheMessageId, messageId);
        msg.addProperty("userName",participant.getUserName());
        msg.addProperty("name", participant.getName());
        msg.addProperty("userType", participant.getUserType());
        msg.addProperty("roomName", roomName);
        TextMessage tm = new TextMessage(msg.toString());
        
        return tm;
    }
}
