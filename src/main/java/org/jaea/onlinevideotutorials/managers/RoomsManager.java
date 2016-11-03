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
package org.jaea.onlinevideotutorials.managers;


import com.google.gson.JsonObject;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Collections;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;
import org.jaea.onlinevideotutorials.Hour;
import org.jaea.onlinevideotutorials.Info;
import org.jaea.onlinevideotutorials.domain.ParticipantSession;
import org.jaea.onlinevideotutorials.domain.Room;
import org.jaea.onlinevideotutorials.domain.UserSession;

import org.kurento.client.KurentoClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
*/
public class RoomsManager {

    private final Logger log = LoggerFactory.getLogger(RoomsManager.class);

    @Autowired
    private KurentoClient kurento;
    
    private final ConcurrentHashMap<String, String> roomsNamesByUserName = new ConcurrentHashMap();
    private final ConcurrentHashMap<String, Room> roomsByName = new ConcurrentHashMap<>(); 
    private final CopyOnWriteArrayList<String> availableRoomsNames = new CopyOnWriteArrayList<>();;
    // It stores the students which are not still in a room
    private final ConcurrentHashMap<String, UserSession> incomingParticipantsByUserName = new ConcurrentHashMap();

    public RoomsManager(){
        log.info("new RoomsManager");
    }   


    public Room createRoom(String roomName){
        //We supose the room name will never be repeated
        log.info("{} Room.createRoom {} not existent. Will create now! {}", Info.START_SYMBOL, roomName, Hour.getTime());
	
        Room room = new Room(roomName, kurento.createMediaPipeline());
	    this.roomsByName.put(roomName, room); 
        this.availableRoomsNames.add(roomName);
            
        log.info("{} Room.createRoom {}", Info.FINISH_SYMBOL, Hour.getTime());
        return room;
    }
    
    public Room getRoom(String roomName) {
        log.info("{} RoomManager.getRoom: {} {}",Info.START_SYMBOL, roomName, Hour.getTime());
        
        Room room = this.roomsByName.get(roomName);

        if (room == null) {
            log.debug("Room {} not existent.", roomName);
        }
                
        log.debug("{} Room {} found! {}",Info.FINISH_SYMBOL, roomName, Hour.getTime());
        return room;
    }
    
    public List<String> getAvailableRoomsNames(){
        log.info("{} RoomManager.getAvaibleRoomsNames: {} {}",Info.START_SYMBOL,this.availableRoomsNames.toString(), Hour.getTime());
        
        int numberOfAvaibleRooms = this.availableRoomsNames.size();
        
        List<String> avaibleRoomsNames = this.availableRoomsNames.subList(0, numberOfAvaibleRooms);
        
        log.info("Avaible Rooms Names: {}", avaibleRoomsNames);
        Info.logInfoFinish("RoomManager.getAvaibleRoomsNames");
        return avaibleRoomsNames;
    }
    
    
    /* If the incoming participant is a tutor and there is no room it will be created */    
    public void addParticipant (UserSession user, String roomName){
        log.info("{} RoomManager.addParticipant: {} to {} {}",Info.START_SYMBOL,  user.getUserName(), roomName, Hour.getTime());
        
        ParticipantSession participant = (ParticipantSession) user;
        
        Room room = this.roomsByName.get(roomName);
        if (room == null && participant.isATutor()){
            log.info("The user is a tutor named {}", participant.getUserName());
            room = this.createRoom(roomName);
           
        }
        if (room != null) {
            log.info("Participant {} is going to be added to room {}", participant.getUserName(), room.getName());
            room.addParticipant(participant);
            this.roomsNamesByUserName.put(participant.getUserName(), roomName);
        }    
        Info.logInfoFinish("RoomManager.addParticipant");
    }
    
    public List<String> getParticipantsUserNamesByRoomName(String roomName){
        log.info("{} RoomManager.getStudentsNamesByRoomName: {} {}",Info.START_SYMBOL, roomName, Hour.getTime());
        
        List <ParticipantSession> participants = this.getParticipantsByRoomName(roomName);
        List <String> participantsUserNames = new ArrayList();
        
        for(ParticipantSession user : participants){
            participantsUserNames.add(user.getUserName());
        }
            
        Info.logInfoFinish("RoomManager.getStudentsNamesByRoomName");
        return participantsUserNames;
    }
    
    public List<ParticipantSession> getParticipantsByRoomName(String roomName){
        log.info("{} RoomManager.getParticipantsByRoomName: {} {}",Info.START_SYMBOL, roomName, Hour.getTime());
        
        List<ParticipantSession> participants = new ArrayList();
        Room room = this.roomsByName.get(roomName);
        
        if (room != null){
            Info.logInfoFinish("RoomManager.getParticipantsByRoomName");
            participants.addAll(room.getParticipants());
        }    
        
        return participants;
    }
    
    public UserSession participantLeavesARoom (String participantUserName, String roomName){
        log.info("{} RoomManager.participantLeavesARoom {} from {} {}",Info.START_SYMBOL, participantUserName, roomName, Hour.getTime());
        
        UserSession user = null;

        Room room = this.roomsByName.get(roomName);
        
        if (room != null){

            user = room.leave(participantUserName);
            if (user != null){
                this.roomsNamesByUserName.remove(user.getUserName());
            }
            if (room.isEmpty()){
                this.removeRoom(roomName);
            }
            
            room.printTheRoomParticipants(); //*
        }
        Info.logInfoFinish("/ RoomManager.participantLeavesARoom");
        return user;
    }
    
    public void removeRoom(String roomName) {
        log.info("{} Room.removeRoom {} {}",Info.START_SYMBOL, roomName, Hour.getTime());
        
        Room room = this.roomsByName.get(roomName);
        this.removeRoom(room);
        
	   Info.logInfoFinish("/ Room.remove: removed and closed");
    }
    
    public void removeRoom(Room room) {
        log.info("{} Room.removeRoom {} {}",Info.START_SYMBOL, room.getName(), Hour.getTime());
        
        if (room != null){
            String roomName = room.getName();
            this.availableRoomsNames.remove(roomName);
            room.close();
            this.roomsByName.remove(roomName);
	    }
	Info.logInfoFinish("/ Room.remove: removed and closed");
    }
    
    public String manageOfferVideo(String addresseeUserName, String senderUserName, String offer){
        log.info("* RoomManager.manageOfferVideo -> {} <- {}: {}", addresseeUserName, senderUserName);
        
        String roomName = this.roomsNamesByUserName.get(addresseeUserName);
        Room room = this.roomsByName.get(roomName);
        String sdpAnswer = null;

        if (room != null){
            sdpAnswer = room.manageOfferVideo(addresseeUserName, senderUserName, offer);
        }

        log.info("/ RoomManager.manageOfferVideo"); 
        return sdpAnswer;
    }
    
    public void manageAddress(String addresseeUserName, String senderUserName, JsonObject address){
    //    log.info("* RoomManager.manageAddress -> {} <- {}: {}", addresseeUserName, senderUserName);
        
         
        String roomName = this.roomsNamesByUserName.get(addresseeUserName);
        Room room = this.roomsByName.get(roomName);
        if (room != null){
            room.manageAddress(addresseeUserName, senderUserName, address);
        }
     //   log.info("/ RoomManager.manageAddress"); 
    }

    public boolean existRoom(String roomName){
        return roomsByName.containsKey(roomName);
    }

    public void addIncomingParticipant (UserSession user){
        log.info("{} RoomManager.addIncomingParticipant: {} {}",Info.START_SYMBOL, user.getUserName(), Hour.getTime());
        this.printIncomingParticipants(); //*
        if (user.isAStudent()){
            this.incomingParticipantsByUserName.put(user.getUserName(), user);
            log.info("An incoming participant has been added");
            log.info("Now there are {} students in the waiting room",this.incomingParticipantsByUserName.size());
        }
        this.printIncomingParticipants(); //*
        Info.logInfoFinish("RoomManager.addIncomingParticipant");
     }
    
    public UserSession getIncomingParticipantByUserName(String userName){
        log.info("{} RoomManager.getIncomingParticipantByUserName: {} {}", Info.START_SYMBOL,userName, Hour.getTime());
        Info.logInfoFinish("RoomManager.getIncomingParticipantByUserName");
        
        return incomingParticipantsByUserName.get(userName);
    }
    
    public List<UserSession> getIncomingParticipants(){
        return Collections.list(this.incomingParticipantsByUserName.elements());
    }
    
    public UserSession removeIncomingParticipant(UserSession user){
        log.info("{} RoomManager.removeIncomingParticipant: {} {}",Info.START_SYMBOL, user.getUserName(), Hour.getTime());
         
       UserSession incomingParticipant = this.removeIncomingParticipant(user.getUserName());
         
        Info.logInfoFinish("RoomManager.removeIncomimgParticipant");
        
        return incomingParticipant;
    }
    
    public UserSession removeIncomingParticipant(String userName){
        log.info("{} RoomManager.removeIncomingParticipant: {} {}",Info.START_SYMBOL, userName, Hour.getTime());
         
        UserSession user = this.incomingParticipantsByUserName.remove(userName);
        
        log.info("An incoming participant has been removed");
        log.info("Now there are {} students in the waiting room",incomingParticipantsByUserName.size());
        Info.logInfoFinish("RoomManager.removeIncomimgParticipant");
        
        return user;
    }
    
   
    //#
    public void printIncomingParticipants(){
        log.info("The incoming participants are: " + this.incomingParticipantsByUserName.size());
        for (Map.Entry <String, UserSession> entry : this.incomingParticipantsByUserName.entrySet()){
            log.info("- " + entry.getKey());
        }   
    }

    //#
    public String toString(){
        return "RoomsManager";
    }

}
