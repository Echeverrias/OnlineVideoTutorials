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
    
    private final ConcurrentHashMap<String, ParticipantSession> participantsBySessionId = new ConcurrentHashMap();
    private final ConcurrentHashMap<String, Room> rooms = new ConcurrentHashMap<String, Room>(); 
    private final CopyOnWriteArrayList<String> avaibleRoomsNames = new CopyOnWriteArrayList<String>();;
        
    public void createRoom(String roomName){
    //We supose the room name will never be repeated
        log.info("{} Room.createRoom {} not existent. Will create now! {}", Info.START_SYMBOL, roomName, Hour.getTime());
	
        Room room = new Room(roomName, kurento.createMediaPipeline());
	this.rooms.put(roomName, room); 
        this.avaibleRoomsNames.add(roomName);
            
        log.info("{} Room.createRoom {}", Info.FINISH_SYMBOL, Hour.getTime());
    }
    
    public Room getRoom(String roomName) {
        log.info("{} RoomManager.getRoom: {} {}",Info.START_SYMBOL, roomName, Hour.getTime());
        
        Room room = this.rooms.get(roomName);

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
        this.participantsBySessionId.put(participant.getSessionId(), participant);
        Room room = this.rooms.get(roomName);
        if (room == null && participant.isATutor()){
            this.createRoom(roomName);
        }
        if (room != null) {
            log.info("Participant {} is going to be added to room {}", participant.getUserName(), room.getName());
            room.addParticipant(participant);
        }    
        Info.logInfoFinish("RoomManager.addParticipant");
    }
    
    public ParticipantSession getParticipant(String sessionId){
        
        return this.participantsBySessionId.get(sessionId);
    }
    
    public ParticipantSession getParticipant(String userName, String roomName){
        log.info("{} RoomManager.getParticipant {} from {} {}", Info.START_SYMBOL, userName, roomName, Hour.getTime());
        
        ParticipantSession participant = null;
        Room room = this.rooms.get(roomName);
        
        if (room!=null) {
            participant = room.getParticipant(userName);
        }
        
        log.info("{} RoomManager.getParticipant", Info.FINISH_SYMBOL, Hour.getTime());
        return participant;
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
        
        Room room = this.rooms.get(roomName);
        
        Info.logInfoFinish("RoomManager.getParticipantsByRoomName");
        return room.getParticipants();
    }
    
    public ParticipantSession participantLeavesARoom (String participantUserName, String roomName){
        log.info("{} RoomManager.participantLeavesARoom {} from {} {}",Info.START_SYMBOL, participantUserName, roomName, Hour.getTime());
        
        Room room = this.rooms.get(roomName);
        
        if (room.isTheTutor(participantUserName)){
            this.avaibleRoomsNames.remove(roomName);
        }
       
        ParticipantSession user = room.leave(participantUserName);
       
        if (room.getParticipantsNumber() == 0){
            room.close();
            this.rooms.remove(roomName);
        }
        
        Info.logInfoFinish("RoomManager.participantLeavesARoom");
        return user;
    }
    
    public void removeRoom(String roomName) {
        log.info("{} Room.removeRoom {} {}",Info.START_SYMBOL, roomName, Hour.getTime());
        
        Room room = this.rooms.get(roomName);
        this.removeRoom(room);
        
	Info.logInfoFinish("Room.remove: removed and closed");
    }
    
    public void removeRoom(Room room) {
        log.info("{} Room.removeRoom {} {}",Info.START_SYMBOL, room.getName(), Hour.getTime());
        
        String roomName = room.getName();
        room.close();
        this.rooms.remove(roomName);
	this.avaibleRoomsNames.remove(roomName);
        
	Info.logInfoFinish("Room.remove: removed and closed");
    }

}
