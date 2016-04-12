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

import com.google.gson.JsonObject;
import java.io.Closeable;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import javax.annotation.PreDestroy;
import org.kurento.client.Continuation;
import org.kurento.client.MediaPipeline;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Collections;

/**
 * Room
 * 
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
*/
public class Room implements Closeable {
    private final Logger log = LoggerFactory.getLogger(Room.class);
    
    private ParticipantSession tutor = null;
    
    // The tutor is included in the participants
    private final ConcurrentHashMap<String, ParticipantSession> participants = new ConcurrentHashMap<String, ParticipantSession>();
    private final MediaPipeline pipeline;
    private final String name;
    
    
    public Room(String name, MediaPipeline pipeline) {
        log.info("% ROOM {}", Hour.getTime());
        this.name = name;
        this.pipeline = pipeline;
        
	log.info("/ ROOM {} has been created {}", this.name, Hour.getTime());
    }
    
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
    
    public List<ParticipantSession> getParticipants() {
        return Collections.list(participants.elements());
    }

    public ParticipantSession getParticipant(String userName) {
        return participants.get(userName);
    }

    public boolean isTheTutor(ParticipantSession user){
        return this.tutor.equals(user);
    }
    
    public boolean isTheTutor(String userName){
        log.info("* Room.isTheTutor?: {}", userName);
        
        String tutorUserName = this.tutor.getUserName();
        
        log.info("/ Room.isTheTutor? The tutor is {}", tutorUserName);
        return tutorUserName.equals(userName);
    }

    public void addParticipant(ParticipantSession user) {
        log.info("{} ROOM.addParticipant {} to {} {}", Info.START_SYMBOL, user.getUserName(), this.name, Hour.getTime());
        Info.logInfoStart2("assignRoomMedia");
        
	user.assignRoomMedia(new TutorialMedia(this.pipeline, this.name, user.getSession(), user.getUserName())); 
	
        Info.logInfoFinish2("assignRoomMedia");
        
        participants.put(user.getUserName(), user);
        if (user.isATutor()) {
            this.tutor = user;
        }
        
        this.makeKnowTheParticipantsOfRoom(user);
        this.makeKnowThereIsANewParticipant(user);
        
        log.info(participants.keys().toString());
        log.info("{} ROOM.addParticipant {}", Info.FINISH_SYMBOL, Hour.getTime());
    }
    
    public void makeKnowTheParticipantsOfRoom (ParticipantSession newParticipant){
        log.info("{} Room.makeKnowTheParticipantsOfRoom {}", Info.START_SYMBOL, Hour.getTime());
        
        JsonObject jsonAnswer = new JsonObject();
        jsonAnswer.addProperty("id", "thereIsAParticipant");
        
        Collection<ParticipantSession> participants = new ArrayList<ParticipantSession>();
        participants.addAll(this.participants.values());
        
        if (participants.size() != 0){
            
            for (ParticipantSession participant : participants){
                log.info("participant: {}", participant.toString());

                jsonAnswer.addProperty("userName", participant.getUserName());
                jsonAnswer.addProperty("name", participant.getName());
                jsonAnswer.addProperty("userType", participant.getUserType());

                newParticipant.sendMeAMessage(jsonAnswer);
            }
        }    
        log.info("{} Room.makeKnowTheParticipantsOfRoom - the messages have been sent", Info.FINISH_SYMBOL, Hour.getTime());
    }
    
    private void makeKnowThereIsANewParticipant(ParticipantSession newParticipant){
        log.info("{} Room.makeKnowThereIsANewParticipant ({}) to participants of room {} {}", Info.START_SYMBOL, newParticipant.toString(), this.name, Hour.getTime());
        
        JsonObject jsonAnswer = new JsonObject();
        jsonAnswer.addProperty("id", "thereIsANewParticipant");
        jsonAnswer.addProperty("userName", newParticipant.getUserName());
        jsonAnswer.addProperty("name", newParticipant.getName());
        jsonAnswer.addProperty("userType", newParticipant.getUserType());
        
       log.info("Mensaje: {}",jsonAnswer.toString());
       Collection<ParticipantSession> participants = this.participants.values();
        
        if (participants!=null){
            
            for (ParticipantSession participant : participants){
                log.info("Student: {}", participant.getSession().getId());
                
                // The new participant already knows he's in the room
                if (!participant.equals(newParticipant)){
                    participant.sendMeAMessage(jsonAnswer);
                }    
            }  
            
        }
        log.info("{} Room.makeKnowThereIsANewParticipant - the messages have been sent {}", Info.FINISH_SYMBOL, Hour.getTime());
    }
    
    public ParticipantSession leave(String userName) {
        log.info("{} Room.leave - PARTICIPANT {}: Leaving room {} {}", Info.START_SYMBOL, userName, this.name, Hour.getTime());
        
        ParticipantSession participant = participants.remove(userName);
        
        if (participant != null) {
            makeKnowAParticipantHasLeftTheRoom(participant);
            participant.leavesRoom();
        }    
        log.info("{} Room.leave {}", Info.FINISH_SYMBOL, Hour.getTime());
        
        return participant;
    }
    
    private void makeKnowAParticipantHasLeftTheRoom(ParticipantSession user){
        log.info("{} Room.makeKnowAParticipantHasLeftTheRoom: {} {}", Info.START_SYMBOL, user.getUserName(), Hour.getTime());
        
        String userName = user.getUserName();
        JsonObject participantLeftJson = new JsonObject();
        participantLeftJson.addProperty("id", "aParticipantHasLeftTheRoom");
        participantLeftJson.addProperty("userName", userName);
        participantLeftJson.addProperty("userType", user.getUserType());
        participantLeftJson.addProperty("roomName", this.name);
        
        final List<ParticipantSession> unnotifiedParticipants = new ArrayList<>();
	boolean hasMessageBeenSend;
        for (final ParticipantSession participant : participants.values()) {
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
        
        log.info("{} Room.makeKnowAParticipantHasLeftTheRoom - the messages have been sent {}", Info.FINISH_SYMBOL, Hour.getTime());
       
    }

    @PreDestroy
    private void shutdown() {
        Info.logInfoStart("Room.shutdown");
        this.close();
        Info.logInfoFinish("Room.shutdown");
    }

    @Override
    public void close() {
        Info.logInfoStart("Room.close");
            
        for (final ParticipantSession participant : this.participants.values()) {
            participant.leavesRoom();
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
        
    public void sendAMessageToParticipants(JsonObject message){
        log.info("{} Room.sendAMessageToAllStudentsOfRoom - message: {}, room: {}, to:   {}", Info.START_SYMBOL, message.get("id").getAsString(), this.name, Hour.getTime());
        
        Collection<ParticipantSession> participants = this.participants.values();
        
        if (participants!=null){
            
            for (ParticipantSession participant : participants){
                log.info("Participant: {}", participant.getSession().getId());

                participant.sendMeAMessage(message);
            }  
            
        }
        
        log.info("the message has been sent to all participants of the '{}' room ", this.name);
        log.info("{} Room.sendAMessageToAllStudentsOfRoom {}", Info.FINISH_SYMBOL, Hour.getTime()); 
     }
    
    
    
    

       
        
}
