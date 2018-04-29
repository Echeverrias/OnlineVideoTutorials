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
import java.util.stream.Stream;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.jaea.onlinevideotutorials.Hour;
import org.jaea.onlinevideotutorials.Info;
import org.jaea.onlinevideotutorials.domain.ParticipantSession;
import org.jaea.onlinevideotutorials.domain.MediaRoom;
import org.jaea.onlinevideotutorials.domain.Room;
import org.jaea.onlinevideotutorials.domain.UserSession;
import org.jaea.onlinevideotutorials.repositories.MediaRoomRepository;

import org.kurento.client.KurentoClient;
import org.kurento.client.IceCandidate;
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

    @Autowired
    private MediaRoomRepository roomRepository;

    private final ConcurrentHashMap<String, MediaRoom> roomsByUserName = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<Long, MediaRoom> roomsById = new ConcurrentHashMap<>(); 
    private final CopyOnWriteArrayList<Room> availableRooms = new CopyOnWriteArrayList<>();
    
    // It stores the students which are not still in a room
    private final ConcurrentHashMap<String, UserSession> incomingParticipantsByUserName = new ConcurrentHashMap<>();

    public RoomsManager(){
        log.info("new RoomsManager");
    }   


    public MediaRoom createRoom(Room room){
        //We supose the room name will never be repeated
        log.info("{} RoomsManager.createRoom {} if doesn't exist. Will create now! {}", Info.START_SYMBOL, room.getId(), Hour.getTime());
	
        // First we check if the room is an available room
        MediaRoom solicitedRoom = this.getRoom(room.getId());
        
        if (solicitedRoom == null){
            // The room is not available, so we try to retrieve it from the repository
            log.info("La room {} no está registrada", room.getId());
            solicitedRoom = this.roomRepository.findOne(room.getId());
           
            
            if (solicitedRoom == null){    
                log.info("La room {} no está en la BBDD", room.getId());
                solicitedRoom = this.createRoom(room.getName(), room.getTutor());
            }
            else{ // The room exists in the repository
                log.info("La room {} está en la BBDD y se va a registrar", room.getId());
                log.info("La room del tutor {} está en la BBDD", solicitedRoom.getTutor());
                solicitedRoom.attachPipeline(kurento.createMediaPipeline());
                log.info(solicitedRoom.toString());
                this.registerRoom(solicitedRoom);
            }    
        }

        log.info("{} RoomsManager.createRoom {}", Info.FINISH_SYMBOL, Hour.getTime());
        log.info(solicitedRoom.toString());
        return solicitedRoom;
    }

    public MediaRoom createRoom(String roomName, String tutor){
        //We supose the room name will never be repeated
        log.info("{} RoomsManager.createRoom {}. Will create now! {}", Info.START_SYMBOL, roomName, Hour.getTime());
	
        MediaRoom room = new MediaRoom(roomName, tutor, kurento.createMediaPipeline());
        this.roomRepository.save(room); //* #*
        
        log.info("The room has been persisted and his id is {}", room.getId());
	this.registerRoom(room);

        log.info("{} RoomsManager.createRoom {}", Info.FINISH_SYMBOL, Hour.getTime());
        return room;
    }
    
    private void registerRoom(MediaRoom room){
        log.info("* RoomsManager.registerRoom");
        log.info("La room del tutor {} está en la BBDD y se va a registrar", room.getTutor());
        this.roomsById.put(room.getId(), room); //# 
        log.info(room.toString());
        Room r = new Room(room);
        this.availableRooms.add(r); //#
        log.info(r.toString());
        log.info("/ RoomsManager.registerRoom");
    }

    
    public boolean isThereRoom(Room room){

        return this.existRoom(room.getId());
    }
    
    public boolean existRoom(Long roomId){
        return roomsById.containsKey(roomId);
    }

    
    
    public MediaRoom getRoom(Long id) {
        log.info("{} RoomManager.getRoom: {} {}",Info.START_SYMBOL, id, Hour.getTime());
        
        MediaRoom room = this.roomsById.get(id);

        if (room == null) {
            log.debug("MediaRoom {} not existent.", id);
        }
                
        log.debug("{} MediaRoom {} found! {}",Info.FINISH_SYMBOL, id, Hour.getTime());
        return room;
    }

    
    public List<Room> getAvailableRooms(){
        log.info("{} RoomManager.getAvaibleRooms: {} {}",Info.START_SYMBOL, this.availableRooms.size(), Hour.getTime());
     
        return this.availableRooms;
    }
    
    // Suniendo que no existe this.availableRooms
    public List<Room> getAvailableRooms2(){
        log.info("{} RoomManager.getAvaibleRooms2: {} {}",Info.START_SYMBOL,this.roomsById.size(), Hour.getTime());
        
        List<Room> availableRooms = this.roomsById.values().stream()
            .map(room -> new Room(room))
            .collect(Collectors.toList());

        Info.logInfoFinish("RoomManager.getAvaibleRooms2");
        //return Collections.list(roomsByName.keys());
        return availableRooms;
    }

    
    public List<Room> getTutorAvailableRooms(String userName){
        log.info("{} RoomManager.getTutorAvailableRooms: {}",Info.START_SYMBOL, Hour.getTime());
        
        List<Room> availableTutorRooms = roomsById.values().stream() 
        		.filter(room -> room.isTheTutor(userName))
        		.map(room -> new Room(room))
        		.collect(Collectors.toList());
        log.info("The number of the available rooms of the tutor are: {}", availableTutorRooms.size());	
        Info.logInfoFinish("RoomManager.getTutorAvailableRooms");
        return availableTutorRooms;
    }
    
    public void addParticipant (UserSession user, Long roomId){
        log.info("{} RoomManager.addParticipant: {} to {} {}",Info.START_SYMBOL,  user.getUserName(), roomId, Hour.getTime());
          
        ParticipantSession participant = (ParticipantSession) user;
        MediaRoom mediaRoom = this.roomsById.get(roomId);
       
        if (mediaRoom != null) {
            log.info("Participant {} is going to be added into room {}", participant.getUserName(), roomId);
            mediaRoom.addParticipant(participant);
            log.info("Participant {} has been added into room {}", participant.getUserName(), roomId);
            this.roomsByUserName.put(participant.getUserName(), mediaRoom);
        }
        else{
            log.error("The room {} doesn't exist", roomId);
        }    
        Info.logInfoFinish("RoomManager.addParticipant");
    }
    
    
    public List<String> getParticipantsUserNamesByRoom(Long roomId){
        log.info("{} RoomManager.getStudentsNamesByRoom: {} {}",Info.START_SYMBOL, roomId, Hour.getTime());
        
        List <ParticipantSession> participants = this.getParticipantsByRoomId(roomId);
        List <String> participantsUserNames = participants.stream()
            .map(participant -> participant.getUserName())
            .collect(Collectors.toList());
                   
        Info.logInfoFinish("RoomManager.getStudentsNamesByRoom");
        return participantsUserNames;
    }
    
    
    public List<ParticipantSession> getParticipantsByRoomId(Long roomId){
        log.info("{} RoomManager.getParticipantsByRoomName: {} {}",Info.START_SYMBOL, roomId, Hour.getTime());
        
        List<ParticipantSession> participants = new ArrayList<>();
        MediaRoom mediaRoom = this.roomsById.get(roomId);
        
        if (mediaRoom != null){
            Info.logInfoFinish("RoomManager.getParticipantsByRoom");
            participants.addAll(mediaRoom.getParticipants());
        }    
        
        return participants;
    }
    

    public UserSession participantLeavesARoom (String participantUserName, Long roomId){
        log.info("{} RoomManager.participantLeavesARoom {} from {} {}",Info.START_SYMBOL, participantUserName, roomId, Hour.getTime());
        
        UserSession user = null;

        MediaRoom mediaRoom = this.roomsById.get(roomId);
        
        if (mediaRoom != null){

            user = mediaRoom.leave(participantUserName);
            if (user != null){
                this.roomsByUserName.remove(user.getUserName());
            }
            if (mediaRoom.isEmpty()){
                this.removeRoom(mediaRoom);
            }
            
            mediaRoom.printTheRoomParticipants(); //*
        }
        else{
            log.info("There is no room with ig " + roomId);
        }
        Info.logInfoFinish("/ RoomManager.participantLeavesARoom");
        return user;
    }
    
    public void removeRoom(Long roomId) {
        log.info("{} RoomManager.removeRoom {} {}",Info.START_SYMBOL, roomId, Hour.getTime());
        
        MediaRoom room = this.roomsById.get(roomId);
        this.log.info("NUMBER OF AVAILABLE ROOMS: {}", this.availableRooms.size() ); //#
        this.removeRoom(room);
        
	   Info.logInfoFinish("/ RoomManager.remove: removed and closed");
    }
    
    
    public void removeRoom(MediaRoom room) {
        log.info("{} RoomManager.removeRoom");
        
        if (room != null){
            this.log.info(room.toString());
            this.log.info("NUMBER OF AVAILABLE ROOMS: {}", this.availableRooms.size() ); //#
            this.log.info(this.availableRooms.get(0).toString()); //#
            this.availableRooms.remove(room);
            room.close();
            this.roomsById.remove(room.getId());
            this.log.info("### The room is going to be closed and persisted");
            this.log.info("### room.tutor = " + room.getTutor());
            this.log.info("### room.numberOfParticipantsHistory = " + room.getParticipantsHistory().size());
            this.log.info("### room.numberOfFilesHistory = " + room.getFilesHistory().size());
            try{
                roomRepository.save(room);
            }
            catch(Exception e){
                this.log.info("!!! Error al persistir la room: " + e.getMessage());
            }    
	    }
	Info.logInfoFinish("/ RoomManager.remove: removed and closed");
    }
    
    public String manageOfferVideo(String addresseeUserName, String senderUserName, String offer){
        log.info("* RoomManager.manageOfferVideo -> {} <- {}: {}", addresseeUserName, senderUserName);
         
        MediaRoom room = this.roomsByUserName.get(addresseeUserName);
        String sdpAnswer = null;

        if (room != null){
            sdpAnswer = room.manageOfferVideo(addresseeUserName, senderUserName, offer);
        }

        log.info("/ RoomManager.manageOfferVideo"); 
        return sdpAnswer;
    }
    
    public void manageAddress(String addresseeUserName, String senderUserName, IceCandidate iceCandidate){
    //    log.info("* RoomManager.manageAddress -> {} <- {}: {}", addresseeUserName, senderUserName);
        
        MediaRoom room = this.roomsByUserName.get(addresseeUserName);
        if (room != null){
            room.manageAddress(addresseeUserName, senderUserName, iceCandidate);
        }
     //   log.info("/ RoomManager.manageAddress"); 
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
