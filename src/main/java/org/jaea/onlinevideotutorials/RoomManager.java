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


import com.google.gson.JsonElement;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

import org.kurento.client.KurentoClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
*/
public class RoomManager {

    private final Logger log = LoggerFactory.getLogger(RoomManager.class);

    @Autowired
    private KurentoClient kurento;
    
    private final ConcurrentHashMap<String, String> roomsNamesByUserName = new ConcurrentHashMap();
    private final ConcurrentHashMap<String, Room> roomsByName = new ConcurrentHashMap<>(); 
    private final CopyOnWriteArrayList<String> avaibleRoomsNames = new CopyOnWriteArrayList<>();;
        
    public void createRoom(String roomName){
    //We supose the room name will never be repeated
        log.info("{} Room.createRoom {} not existent. Will create now! {}", Info.START_SYMBOL, roomName, Hour.getTime());
	
        Room room = new Room(roomName, kurento.createMediaPipeline());
	this.roomsByName.put(roomName, room); 
        this.avaibleRoomsNames.add(roomName);
            
        log.info("{} Room.createRoom {}", Info.FINISH_SYMBOL, Hour.getTime());
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
    
    public List getAvaibleRoomsNames(){
        log.info("{} RoomManager.getAvaibleRoomsNames: {} {}",Info.START_SYMBOL,this.avaibleRoomsNames.toString(), Hour.getTime());
        
        int numberOfAvaibleRooms = this.avaibleRoomsNames.size();
        
        List avaibleRoomsNames = this.avaibleRoomsNames.subList(0, numberOfAvaibleRooms);
        
        log.info("Avaible Rooms Names: {}", avaibleRoomsNames);
        Info.logInfoFinish("RoomManager.getAvaibleRoomsNames");
        return avaibleRoomsNames;
    }
    
    
    /* If the incoming participant is a tutor, a room will be created */    
    public void addParticipant (UserSession user, String roomName){
        log.info("{} RoomManager.addParticipant: {} to {} {}",Info.START_SYMBOL,  user.getUserName(), roomName, Hour.getTime());
        
        ParticipantSession participant = (ParticipantSession) user;
        this.roomsNamesByUserName.put(participant.getUserName(), roomName);
        Room room = this.roomsByName.get(roomName);
        if (room == null && participant.isATutor()){
            this.createRoom(roomName);
        }
        if (room != null) {
            log.info("Participant {} is going to be added to room {}", participant.getUserName(), room.getName());
            room.addParticipant(participant);
        }    
        Info.logInfoFinish("RoomManager.addParticipant");
    }
    
    public List<String> getParticipantsUserNamesByRoomName(String roomName){
        log.info("{} RoomManager.getStudentsNamesByRoomName: {} {}",Info.START_SYMBOL, roomName, Hour.getTime());
        
        List <ParticipantSession> participants = this.getParticipantsByRoomName(roomName);
        List <String> participantsUserNames = null;
        
        if (participants != null){
            
            participantsUserNames = new ArrayList<String>();
            for(ParticipantSession user : participants){
                participantsUserNames.add(user.getUserName());
            }
            
        }
        
        Info.logInfoFinish("RoomManager.getStudentsNamesByRoomName");
        return participantsUserNames;
    }
    
    public List<ParticipantSession> getParticipantsByRoomName(String roomName){
        log.info("{} RoomManager.getParticipantsByRoomName: {} {}",Info.START_SYMBOL, roomName, Hour.getTime());
        
        Room room = this.roomsByName.get(roomName);
        
        Info.logInfoFinish("RoomManager.getParticipantsByRoomName");
        return room.getParticipants();
    }
    
    public UserSession participantLeavesARoom (String participantUserName, String roomName){
        log.info("{} RoomManager.participantLeavesARoom {} from {} {}",Info.START_SYMBOL, participantUserName, roomName, Hour.getTime());
        
        Room room = this.roomsByName.get(roomName);
        
        if (room.isTheTutor(participantUserName)){
            this.avaibleRoomsNames.remove(roomName);
        }
       
        UserSession user = room.leave(participantUserName);
        this.roomsNamesByUserName.remove(user.getUserName());
        
        if (room.getParticipantsNumber() == 0){
            room.close();
            this.roomsByName.remove(roomName);
        }
        
        Info.logInfoFinish("RoomManager.participantLeavesARoom");
        return user;
    }
    
    public void removeRoom(String roomName) {
        log.info("{} Room.removeRoom {} {}",Info.START_SYMBOL, roomName, Hour.getTime());
        
        Room room = this.roomsByName.get(roomName);
        this.removeRoom(room);
        
	Info.logInfoFinish("Room.remove: removed and closed");
    }
    
    public void removeRoom(Room room) {
        log.info("{} Room.removeRoom {} {}",Info.START_SYMBOL, room.getName(), Hour.getTime());
        
        String roomName = room.getName();
        room.close();
        this.roomsByName.remove(roomName);
	this.avaibleRoomsNames.remove(roomName);
        
	Info.logInfoFinish("Room.remove: removed and closed");
    }
    
    public void manageOfferVideo(String addresseeUserName, String senderUserName, JsonElement offer){
        log.info("* RoomManager.manageOfferVideo -> {} <- {}: {}", addresseeUserName, senderUserName);
        
        String roomName = this.roomsNamesByUserName.get(addresseeUserName);
        Room room = this.roomsByName.get(roomName);
        room.manageOfferVideo(addresseeUserName, senderUserName, offer);
        
        log.info("/ RoomManager.manageOfferVideo");    
    }
    
    public void manageAddress(String addresseeUserName, String senderUserName, JsonElement address){
        log.info("* RoomManager.manageAddress -> {} <- {}: {}", addresseeUserName, senderUserName);
        
         
        String roomName = this.roomsNamesByUserName.get(addresseeUserName);
        Room room = this.roomsByName.get(roomName);
        room.manageAddress(addresseeUserName, senderUserName, address);
        
        log.info("/ RoomManager.manageAddress"); 
    }

}
