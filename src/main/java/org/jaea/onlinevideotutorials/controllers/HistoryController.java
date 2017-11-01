package org.jaea.onlinevideotutorials.controllers;

import org.jaea.onlinevideotutorials.domain.MediaRoom;
import org.jaea.onlinevideotutorials.domain.ParticipantSession;
import org.jaea.onlinevideotutorials.repositories.ParticipantSessionRepository;
import org.jaea.onlinevideotutorials.repositories.UserFileRepository;
import org.jaea.onlinevideotutorials.repositories.MediaRoomRepository;

import java.util.List;
import java.util.ArrayList;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
public class HistoryController {

    private final Logger log = LoggerFactory.getLogger(HistoryController.class);

    @Autowired
    private ParticipantSessionRepository participantRepository;  

    @Autowired
    private MediaRoomRepository roomRepository; 

    @GetMapping("/{userName:.+}/roomshistory")
    public ResponseEntity<List<MediaRoom>> getRoomsHistorial(@PathVariable String userName){
        HttpStatus httpStatus = null;
        List<MediaRoom> rooms = new ArrayList<>();
        ParticipantSession participant = this.participantRepository.findByUserName(userName);
        if (participant == null) {
            httpStatus = HttpStatus.NOT_FOUND;
        }
        else{
            rooms = participant.getRoomsHistory();
            for(MediaRoom r : rooms){
                this.log.info("MediaRoom: {} {}", r.getId(), r.getName());
            }
            httpStatus = HttpStatus.OK;
        }    
        return new ResponseEntity(rooms, httpStatus);
    }

    

    
}
