package org.jaea.onlinevideotutorials.utilities;

import com.google.gson.JsonObject;
import org.jaea.onlinevideotutorials.domain.ParticipantSession;
import org.jaea.onlinevideotutorials.domain.Room;
import org.springframework.web.socket.TextMessage;

/**
 *
 * @author Juan Antonio Echeverrías Aranda
 */
public class TextMessageDispenser {
    
    private static String attributeNameOfTheMessageId = "id";
    private static String attributeNameOfTheMessagePayload = "payload";
    
    
    
    public static void setAttributeNameOfTheMessageId(String attributeName){
        attributeNameOfTheMessageId = attributeName;
    } 
    
    public static void setAttributeNameOfTheMessagePayload(String attributeName){
        attributeNameOfTheMessagePayload = attributeName;
    } 
    
    public static TextMessage getParticipantTextMessage(String messageId, ParticipantSession participant){
        JsonObject msg = new JsonObject();
        msg.addProperty(attributeNameOfTheMessageId, messageId);
        JsonObject payload = createJsonUser(participant);
        msg.add(attributeNameOfTheMessagePayload, payload);
        TextMessage tm = new TextMessage(msg.toString());
        
        return tm;
    }
    
    public static TextMessage getRoomParticipantTextMessage(String messageId, Room room, ParticipantSession participant){
        JsonObject msg = new JsonObject();
        String fakeDate = "2018-04-23T16:22:54.792Z";
        msg.addProperty(attributeNameOfTheMessageId, messageId);
        JsonObject payload = createJsonUser(participant);
        JsonObject jsonRoom = new JsonObject();
        jsonRoom.addProperty("id", room.getId());
        jsonRoom.addProperty("name", room.getName());
        jsonRoom.addProperty("tutor", room.getTutor());
        //jsonRoom.addProperty("createdAt", room.getCreatedAt().toString());
        jsonRoom.addProperty("createdAt", fakeDate);
        payload.add("room", jsonRoom);
        msg.add(attributeNameOfTheMessagePayload, payload);
        TextMessage tm = new TextMessage(msg.toString());
        
        return tm;
    }
    
    private static JsonObject createJsonUser(ParticipantSession participant){
        JsonObject user = new JsonObject();
        user.addProperty("userName",participant.getUserName());
        user.addProperty("name", participant.getName());
        user.addProperty("surname", participant.getSurname());
        user.addProperty("userType", participant.getUserType());
        user.addProperty("email", participant.getEmail());
        return user;
    }
}
