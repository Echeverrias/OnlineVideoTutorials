package org.jaea.onlinevideotutorials.controllers;

import org.jaea.onlinevideotutorials.domain.MediaRoom;
import org.jaea.onlinevideotutorials.domain.Room;
import org.jaea.onlinevideotutorials.repositories.MediaRoomRepository;
import org.jaea.onlinevideotutorials.managers.RoomsManager;

import java.util.List;
import java.util.ArrayList;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
public class RoomController {

    private final Logger log = LoggerFactory.getLogger(RoomController.class);
    
    private SimpMessagingTemplate template;

    @Autowired
    private RoomsManager roomsManager;

    @Autowired
	public RoomController(SimpMessagingTemplate template){
		this.template = template;
	}

    @PostMapping("/create_room")
    public ResponseEntity<Room> createRoom(@RequestBody Room room){
        this.log.info("The room {} {} is going to be create ", room.getName(), room.getCreatedAt());
        Room persistedRoom = null;
        if (this.roomsManager.isThereRoom(room)){
            persistedRoom = room;
        }
        else{    
            MediaRoom mediaRoom = this.roomsManager.createRoom(room);
            persistedRoom = new Room(mediaRoom);
            this.template.convertAndSend("/created_room", persistedRoom);
        }    
        return new ResponseEntity<Room>(persistedRoom, HttpStatus.CREATED);
    }

    

    
}
