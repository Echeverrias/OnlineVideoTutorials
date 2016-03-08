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
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.CopyOnWriteArrayList;

import org.kurento.client.KurentoClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * @author Ivan Gracia (izanmail@gmail.com)
 * @since 4.3.1
 */
public class RoomManager {

    private final Logger log = LoggerFactory.getLogger(RoomManager.class);

    @Autowired
    private KurentoClient kurento;

    private final ConcurrentHashMap<String, Room> rooms = new ConcurrentHashMap<String, Room>(); 
    private final CopyOnWriteArrayList<String> avaibleRoomsNames = new CopyOnWriteArrayList<String>();;
        
    
    
    /**
    * @param roomName
    *            the name of the room
    * @return the room if it was already created
    */
    public Room getRoom(String roomName) {
        Info.logInfoStart();
        log.debug("{} RoomManager.getRoom: {}",Info.START_SYMBOL, roomName);
        Room room = this.rooms.get(roomName);

        if (room == null) {
            log.debug("Room {} not existent.", roomName);
        }
                
        log.debug("{} Room {} found!",Info.FINISH_SYMBOL, roomName);
        Info.logInfoFinish();
        return room;
    }
    
    public UserSession getParticipant(String roomName, String userName){
        Info.logInfoStart();
        log.info("{} RoomManager.getParticipant {} from {}", Info.START_SYMBOL, userName, roomName);
        UserSession participant = null;
        Room room = this.rooms.get(roomName);
        
        if (room!=null) {
            participant = room.getParticipant(userName);
        }
        log.info("{} RoomManager.getParticipant", Info.FINISH_SYMBOL);
        
        return participant;
    }
    
    
    public List getAvaibleRoomsNames(){
        Info.logInfoStart();
        log.info("{} RoomManager.getAvaibleRoomsNames: {}",Info.START_SYMBOL,this.avaibleRoomsNames.toString());
        int numberOfAvaibleRooms = this.avaibleRoomsNames.size();
        
        List avaibleRoomsNames = this.avaibleRoomsNames.subList(0, numberOfAvaibleRooms);
        log.info("Avaible Rooms Names: {}", avaibleRoomsNames);
       Info.logInfoFinish("RoomManager.getAvaibleRoomsNames");
        return avaibleRoomsNames;
        
    }
    
    
    public List<UserSession> getParticipantsByRoomName(String roomName){
        Info.logInfoStart();
        log.info("{} RoomManager.getParticipantsByRoomName: {}",Info.START_SYMBOL, roomName);
        
        Room room = this.rooms.get(roomName);
        
        Info.logInfoFinish("RoomManager.getParticipantsByRoomName");
        return room.getParticipants();
    }
    
    /**
     * 
     * @param roomName
     * @return List<String> or null 
     */
    public List<String> getStudentsNamesByRoomName(String roomName){
         Info.logInfoStart();
        log.info("{} RoomManager.getStudentsNamesByRoomName: {}",Info.START_SYMBOL, roomName);
        
        List <UserSession> students = this.getParticipantsByRoomName(roomName);
        List <String> studentsNames = null;
        if (students != null){
            
            studentsNames = new ArrayList<String>();
            for(UserSession user : students){
                studentsNames.add(user.getUserName());
            }
            
        }
        
        Info.logInfoFinish("RoomManager.getStudentsNamesByRoomName");
        return studentsNames;
    }
    
    
    
    
    public Room createRoom(String roomName){
    //We supose the room name will never be repeated
        Info.logInfoStart();
        log.info("{} Room.createRoom {} not existent. Will create now!", Info.START_SYMBOL, roomName);
	Room room = new Room(roomName, kurento.createMediaPipeline());
	this.rooms.put(roomName, room); 
        this.avaibleRoomsNames.add(roomName);
            
        log.info("{} Room.createRoom", Info.FINISH_SYMBOL);
        return room;
    }
        
        
    /* If the incoming participant is a tutor, a room will bre created */    
    public void addParticipant (UserSession user, String roomName){
        Info.logInfoStart();
        log.info("{} RoomManager.addParticipant: {} to {}",Info.START_SYMBOL,  user.getUserName(), roomName);
        
        Room room = this.rooms.get(roomName);
        if (room == null && user.isATutor()){
            this.createRoom(roomName);
        }
        if (room != null) {
            room.addParticipant(user);
        }    
        Info.logInfoFinish("RoomManager.addParticipant");
        
    }
    
    
    
   
    
    /**
     * 
     * 
     * 
     */
    public UserSession participantLeavesARoom (String participantUserName, String roomName){
        
        Info.logInfoStart();
        log.info("{} RoomManager.participantLeavesARoom {} from {}",Info.START_SYMBOL, participantUserName, roomName);
        
        Room room = this.rooms.get(roomName);
        
        if (room.isTheTutor(participantUserName)){
            this.avaibleRoomsNames.remove(roomName);
        }
        
        UserSession user = room.leave(participantUserName);
        
        if (room.getParticipantsNumber() == 0){
            room.close();
            this.rooms.remove(roomName);
        }
        
        
        Info.logInfoFinish("RoomManager.participantLeavesARoom");
        
        return user;
    }
    
    
    public void removeRoom(String roomName) {
        Info.logInfoStart();
        log.info("{} Room.removeRoom {}",Info.START_SYMBOL, roomName);
        Room room = this.rooms.get(roomName);
        this.removeRoom(room);
	Info.logInfoFinish("Room.remove: removed and closed");
    }
    /**
    * Removes a room from the list of available rooms
    *   
    * @param room
    * @throws IOException
    */
    public void removeRoom(Room room) {
         Info.logInfoStart();
        log.info("{} Room.removeRoom {}",Info.START_SYMBOL, room.getName());
        String roomName = room.getName();
        room.close();
        this.rooms.remove(roomName);
	this.avaibleRoomsNames.remove(roomName);
	Info.logInfoFinish("Room.remove: removed and closed");
    }
    
    
    
}
