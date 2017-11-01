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
package org.jaea.onlinevideotutorials.domain;

import org.jaea.onlinevideotutorials.Hour;
import org.jaea.onlinevideotutorials.Info;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.gson.JsonObject;
import java.io.Closeable;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import javax.annotation.PreDestroy;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.EntityListeners;
import javax.persistence.Transient;
import javax.persistence.CascadeType;
import org.kurento.client.Continuation;
import org.kurento.client.MediaPipeline;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;



/**
 * Room
 * 
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
*/
@Entity
@Table(name="rooms")
@JsonIgnoreProperties(value={"log","participantsByUserName", "pipeline"})
@EntityListeners(AuditingEntityListener.class)
public class Room extends AvailableRoom implements Closeable{
    
    
    @Transient
    private final Logger log = LoggerFactory.getLogger(Room.class);

    
    
    @ManyToMany(cascade = {CascadeType.PERSIST,CascadeType.MERGE})
    @JoinTable(
        name="rooms_users",
        joinColumns=@JoinColumn(name="room_id", referencedColumnName="id"),
        inverseJoinColumns=@JoinColumn(name="user_id", referencedColumnName="id")
        )
    @JsonIgnoreProperties(value = "roomsHistory")
    private List<ParticipantSession> participantsHistory = new ArrayList<>();
    
    // The tutor is included in the participants
    @Transient
    private final ConcurrentHashMap<String, ParticipantSession> participantsByUserName = new ConcurrentHashMap<>();
    
    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties(value = "room")
    private List<UserFile> filesHistory = new ArrayList<>();

    @Transient
    private MediaPipeline pipeline;
    
    private Room(){};
    
    public Room(String name, MediaPipeline pipeline) {
        super(name);
        log.info("% ROOM {}", Hour.getTime());
        this.pipeline = pipeline;
        
	log.info("/ ROOM {} has been created {}", this.name, Hour.getTime());
    }


    public List<UserFile> getFilesHistory(){
        return this.filesHistory;
    }
    
    public void addFileToHistory(UserFile userFile){
        this.filesHistory.add(userFile);
        userFile.setRoom(this);
    }

    public void removeFile(UserFile userFile){
        this.filesHistory.remove(userFile);
        userFile.setRoom(null);
    }
    

    @JsonIgnore
    public boolean isEmpty(){
        return this.participantsByUserName.isEmpty();
    }
    
    @JsonIgnore
    public int getParticipantsNumber(){
        int participantsNumber = 0;
        if (this.participantsByUserName != null) {
            participantsNumber = this.participantsByUserName.size();
        }
        return participantsNumber;
    }
    
    public List<ParticipantSession> getParticipants() {
        return Collections.list(this.participantsByUserName.elements());
    }

    public ParticipantSession getParticipant(String userName) {
        return this.participantsByUserName.get(userName);
    }

    public List<ParticipantSession> getParticipantsHistory(){
        return this.participantsHistory;
    }

    public void addParticipant(ParticipantSession user) {
        log.info("{} ROOM.addParticipant {} to {} {}", Info.START_SYMBOL, user.getUserName(), this.name, Hour.getTime());
        Info.logInfoStart2("attachRoomMedia");
        
        this.addParticipantToHistory(user);
        user.attachRoomMedia(new TutorialMedia(this.pipeline, user.getSession(), user.getUserName())); 
        this.checkIfTheUserIsATutor(user);
        Info.logInfoFinish2("attachRoomMedia");
        
        this.participantsByUserName.put(user.getUserName(), user);
               
        this.printTheRoomParticipants(); //*
        log.info(participantsByUserName.keys().toString());
        log.info("{} ROOM.addParticipant {}", Info.FINISH_SYMBOL, Hour.getTime());
    }

    private void addParticipantToHistory(ParticipantSession participant){
     
        if (!this.participantsHistory.contains(participant)){
            this.log.info("Participant: " + participant.getUserName() + "has been added to the history");
            this.log.info(participant.getUserName()); //*
            this.log.info(participant.getEmail()); //*
            this.log.info("... has been added to the history");//*
            this.participantsHistory.add(participant);
        }    
        List<Room> roomsHistory = participant.getRoomsHistory();
        if (!roomsHistory.contains(this)){
            roomsHistory.add(this);
        }
    }

    private void checkIfTheUserIsATutor(ParticipantSession user){
        log.info("START: checkIfTheUserIsATutor");//*
        if (this.tutor.equals("") && user.isATutor() ) {
            log.info("The participant is a tutor named: " + user.getUserName());//*
            this.setTutor(user.getUserName());
        }
        log.info("END: checkIfTheUserIsATutor");//*
    }

   
    public ParticipantSession leave(String userName) {
        log.info("{} Room.leave - PARTICIPANT {}: Leaving room {} {}", Info.START_SYMBOL, userName, this.name, Hour.getTime());
        
        ParticipantSession participant = participantsByUserName.remove(userName);
        
        if (participant != null) {
            log.info("-----------------------------------------------");//*
            log.info("I'M GOING TO CLOSE THEM");//*

            participant.leavesRoom();
            
            log.info("-----------------------------------------------");//*
            log.info("-----------------------------------------------");//*
            log.info("THEY'RE GOING TO CLOSE ME");//*
            
            /*
            if (this.isTheTutor(participant.getUserName())){
                this.tutor = "";
            }
            */
        }  
        
        this.printTheRoomParticipants();//*
        log.info("{} Room.leave {}", Info.FINISH_SYMBOL, Hour.getTime());
        
        return participant;
    }
    
    @PreDestroy
    public void shutdown() {
        Info.logInfoStart("Room.shutdown");
        this.close();
        Info.logInfoFinish("Room.shutdown");
    }

    @Override
    public void close() {
        Info.logInfoStart("Room.close");
        this.printTheRoomParticipants(); //*    
        for (final ParticipantSession participant : this.participantsByUserName.values()) {
            participant.leavesRoom();
        }

        this.participantsByUserName.clear();

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
    
    public String manageOfferVideo(String addresseeUserName, String senderUserName, String offer){
        log.info("* Room.manageOfferVideo -> {} <- {}: {}", addresseeUserName, senderUserName);
        
        ParticipantSession addressee = this.getParticipant(addresseeUserName);
        ParticipantSession sender = this.getParticipant(senderUserName);
        
        String sdpAnswer = null;
        if ((addressee != null) && (sender != null)){
            sdpAnswer = addressee.receivesGreetingsFrom(sender, offer);
        }
        else {
            log.error("Impossible to manage the offer video");
        }    
        log.info("/ Room.manageOfferVideo"); 
        return sdpAnswer;
    }
    
    public void manageAddress(String addresseeUserName, String senderUserName, JsonObject address){
     //   log.info("* RoomManager.manageAddress -> {} <- {}: {}", addresseeUserName, senderUserName);
        
        ParticipantSession addressee = this.getParticipant(addresseeUserName);
        ParticipantSession sender = this.getParticipant(senderUserName);
        
	    if ((addressee != null) && (sender != null)) {
            addressee.addAddress(address, sender);
	    }
        else{
            log.error("Impossible to manage the ice candidate");
        }
        
    //    log.info("/ RoomManager.manageAddress"); 
    }
   
    //#
    public void printTheRoomParticipants(){
        log.info("The participants of the " + this.name + " room are: " + this.participantsByUserName.size());
        for(Map.Entry<String, ParticipantSession> entry : this.participantsByUserName.entrySet()){
            log.info("- " + entry.getKey());
        }
    }

    
    
 }
