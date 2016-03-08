/*
 * (C) Copyright 2014 Kurento (http://kurento.org/)
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

import java.io.Closeable;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import javax.annotation.PreDestroy;

import org.kurento.client.Continuation;
import org.kurento.client.MediaPipeline;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.WebSocketSession;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;
import java.util.Collections;

/**
 * @author Ivan Gracia (izanmail@gmail.com)
 * @since 4.3.1
 */
public class Room implements Closeable {
    private final Logger log = LoggerFactory.getLogger(Room.class);
    
    private UserSession tutor = null;
    
    // the tutor is included in the participants
    private final ConcurrentHashMap<String, UserSession> participants = new ConcurrentHashMap<String, UserSession>();
    private final MediaPipeline pipeline;
    private final String name;
    
    public Room(String name, MediaPipeline pipeline) {
        Info.logInfoStart();
        log.info("% ROOM");
        this.name = name;
        this.pipeline = pipeline;
	log.info("/ ROOM {} has been created", this.name);
        Info.logInfoFinish();
    }
    
    /**
    * @return the name
    */
    public String getName() {
        return name;
    }
    
    public int getParticipantsNumber(){
        
        int participantsNumber = 0;
        if (participants!=null) {
            participantsNumber = participants.size();
        }
        return participantsNumber;
    }
    
    
    /**
	 * @return a collection with all the participants in the room
    */
    public List<UserSession> getParticipants() {
        return Collections.list(participants.elements());
    }

    /**
        * @param name
	* @return the participant from this session
    */
    public UserSession getParticipant(String userName) {
        return participants.get(userName);
    }

    
    public boolean isTheTutor(UserSession user){
        return this.tutor.equals(user);
    }
    
    public boolean isTheTutor(String userName){
        
        String tutorUserName = this.tutor.getUserName();
        return tutorUserName.equals(userName);
    }

    public void addParticipant(UserSession user) {
        Info.logInfoStart();
        log.info("{} ROOM.addParticipant {} to", Info.START_SYMBOL, user.getUserName(), this.name);
        
        Info.logInfoStart2("assignRoomMedia");
	user.assignRoomMedia(new RoomMedia(this.pipeline, this.name, user.getSession(), user.getUserName())); 
	Info.logInfoFinish2("assignRoomMedia");
        
        this.makeKnowThereIsANewParticipant(user);
        participants.put(user.getUserName(), user);
        this.makeKnowTheParticipantsOfRoom(user);
        
	
        
        log.info("{} ROOM.addParticipant", Info.FINISH_SYMBOL);
        Info.logInfoFinish();
	
    }
    
    
    /**
     * 
     * @param participant
     */
    private void makeKnowThereIsANewParticipant(UserSession newParticipant){
        Info.logInfoStart();
        log.info("{} Room.makeKnowThereIsANewParticipant ({}) to participants of room {}:", Info.START_SYMBOL, newParticipant.toString(), this.name);
        
        JsonObject jsonAnswer = new JsonObject();
        jsonAnswer.addProperty("id", "thereIsANewParticipant");
        jsonAnswer.addProperty("userName", newParticipant.getUserName());
        jsonAnswer.addProperty("name", newParticipant.getName());
        jsonAnswer.addProperty("userType", newParticipant.getUserType());
        
        
        log.info("Mensaje: {}",jsonAnswer.toString());
        this.sendAMessageToParticipants(jsonAnswer);
        log.info("{} Room.makeKnowThereIsANewParticipant - the messages have been sent", Info.FINISH_SYMBOL);
       Info.logInfoFinish();
	
    }
    
    
    public void sendAMessageToParticipants(JsonObject message){
        Info.logInfoStart();
        log.info("{} Room.sendAMessageToAllStudentsOfRoom - message: {}, room: {}, to:", Info.START_SYMBOL, message.get("id").getAsString(), this.name);
        
        Collection<UserSession> participants = this.participants.values();
        
        if (participants!=null){
            
            for (UserSession participant : participants){
                log.info("Student: {}", participant.getSession().getId());

                participant.sendMeAMessage(message);
            }  
            
        }
        
        log.info("the message has been sent to all participants of the '{}' room ", this.name);
        log.info("{} Room.sendAMessageToAllStudentsOfRoom", Info.FINISH_SYMBOL); 
        Info.logInfoFinish();
    }
    
    
    public void makeKnowTheParticipantsOfRoom (UserSession newParticipant){
        Info.logInfoStart();
        log.info("{} Room.makeKnowTheParticipantsOfRoom", Info.START_SYMBOL);
        
        JsonObject jsonAnswer = new JsonObject();
        jsonAnswer.addProperty("id", "thereIsAParticipant");
        
        Collection<UserSession> participants = this.participants.values();
        if (participants != null){
            for (UserSession participant : participants){
                
                log.info("participant: {}", participant.toString());
                
                jsonAnswer.addProperty("userName", participant.getUserName());
                jsonAnswer.addProperty("name", participant.getName());
                jsonAnswer.addProperty("userType", participant.getUserType());
                
                newParticipant.sendMeAMessage(jsonAnswer);
            }
        }    
        
        log.info("{} Room.makeKnowTheParticipantsOfRoom - the messages have been sent", Info.FINISH_SYMBOL);
       Info.logInfoFinish();
        
    }
    

    public UserSession leave(String userName) {
        Info.logInfoStart();
	log.debug("{} Room.leave - PARTICIPANT {}: Leaving room {}", Info.START_SYMBOL, userName, this.name);
        
        UserSession participant = participants.remove(userName);
        
        if (participant != null) {
            participant.leavesRoom();
            makeKnowAParticipantHasLeftTheRoom(participant);
        }    
        log.debug("{} Room.leave", Info.FINISH_SYMBOL);
        
        Info.logInfoFinish();
        return participant;
    }
    
    /**
     * 
     * @param participant
     */
    private void makeKnowAParticipantHasLeftTheRoom(UserSession user){
        Info.logInfoStart();
        log.info("{} Room.makeKnowAParticipantHasLeftTheRoom: {}", Info.START_SYMBOL, user.getUserName());
        
        String userName = user.getUserName();
        JsonObject participantLeftJson = new JsonObject();
        participantLeftJson.addProperty("id", "aParticipantHasLeftTheRoom");
        participantLeftJson.addProperty("userName", userName);
        participantLeftJson.addProperty("userType", user.getUserType());
        participantLeftJson.addProperty("roomName", this.name);
        
        final List<UserSession> unnotifiedParticipants = new ArrayList<>();
	boolean hasMessageBeenSend;
        for (final UserSession participant : participants.values()) {
            participant.receivesFarewellFrom(userName);
            hasMessageBeenSend = SendMessage.toClient(participantLeftJson, participant.getSession());
            if (!hasMessageBeenSend){
                unnotifiedParticipants.add(participant);
            }
        }

	if (!unnotifiedParticipants.isEmpty()) {
            log.debug( "ROOM {}: The users {} could not be notified that {} left the room",
		this.name, unnotifiedParticipants, name);
	}
        
        log.info("{} Room.makeKnowAParticipantHasLeftTheRoom - the messages have been sent", Info.FINISH_SYMBOL);
        Info.logInfoFinish();
    }

   

	

	@Override
	public void close() {
            Info.logInfoStart("Room.close");
            
            for (final UserSession participant : this.participants.values()) {
		try {
                    participant.getRoomMedia().close();
		} 
                catch (IOException e) {
                    log.debug("ROOM {}: Could not invoke close on participant {}",
                        this.name, participant.getUserName(), e);
		}
            }

            this.participants.clear();

            this.pipeline.release(new Continuation<Void>() {

                @Override
                public void onSuccess(Void result) throws Exception {
                    log.trace("ROOM {}: Released Pipeline", Room.this.name);
		}

		@Override
		public void onError(Throwable cause) throws Exception {
                    log.warn("PARTICIPANT {}: Could not release Pipeline",
                    Room.this.name);
		}
	});

		log.debug("{} Room {} closed",Info.FINISH_SYMBOL, this.name);
                Info.logInfoFinish();
	}
        
    @PreDestroy
    private void shutdown() {
         Info.logInfoStart("Room.shutdown");
        this.close();
        Info.logInfoFinish("Room.shutdown");
    }
       
        
}
