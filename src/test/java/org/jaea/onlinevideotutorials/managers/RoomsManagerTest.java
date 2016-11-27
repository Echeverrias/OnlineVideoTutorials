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

import java.util.Arrays;
import java.util.Collections;
import org.jaea.onlinevideotutorials.utilities.ParticipantSessionDispenser;

import java.util.List;
import static org.hamcrest.CoreMatchers.hasItems;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import org.hamcrest.collection.IsEmptyCollection;
import org.jaea.onlinevideotutorials.domain.ParticipantSession;
import org.jaea.onlinevideotutorials.domain.Room;
import org.jaea.onlinevideotutorials.domain.UserSession;


import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertEquals;
import org.springframework.test.context.junit4.SpringRunner;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;

import org.jaea.onlinevideotutorials.utilities.ParticipantSessionDispenser;

import org.springframework.test.context.ContextConfiguration;

import org.jaea.onlinevideotutorials.services.KurentoConfig;
import org.junit.After;
import static org.junit.Assert.assertThat;
import org.kurento.client.MediaPipeline;
import org.kurento.client.WebRtcEndpoint;
/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
*/

@RunWith(SpringRunner.class)
@ContextConfiguration(classes = {KurentoConfig.class, ManagersConfig.class})
public class RoomsManagerTest {
    
    
    @Autowired
    private RoomsManager roomsManager;
    private String roomName = "roomName";
    
    @Before
    public void setUpBefore(){
        this.roomsManager.createRoom(this.roomName);
    }
    
    @After
    public void setUpAfter(){
        this.roomsManager.removeRoom(this.roomName);
    }
    
    @Test
    public void createRoomTest(){
        Room room = this.roomsManager.createRoom("roomZ");
        assertEquals("roomZ", room.getName());
        this.roomsManager.removeRoom("roomZ");
        
    }
    
    @Test
    public void getRoomNullTest(){
        assertNull(this.roomsManager.getRoom("..."));
    }
    
    @Test
    public void removeRoomTest(){
        assertEquals(this.roomName, this.roomsManager.getRoom(this.roomName).getName());
        this.roomsManager.removeRoom(this.roomName);
        assertNull(this.roomsManager.getRoom(this.roomName));
    }
    
    @Test
    public void getAvailableRoomsNamesNotEmptyTest(){
        List<String> roomsList = this.roomsManager.getAvailableRoomsNames();
        assertThat(roomsList, hasItems(this.roomName)); 
        assertThat(roomsList, hasSize(1));
    }
    
    @Test
    public void getAvailableRoomsNamesEmptyTest(){
        this.roomsManager.removeRoom(this.roomName);
        List<String> roomsList = this.roomsManager.getAvailableRoomsNames();
        assertThat(roomsList, IsEmptyCollection.empty()); 
    }
    
    @Test
    public void addParticipantTutorInANonExistentRoomTest(){
        // The tutor will creates the room
        ParticipantSession participant = ParticipantSessionDispenser.getTutorParticipant("angela.gossow");
        this.roomsManager.addParticipant(participant, "...");
        Room room = this.roomsManager.getRoom("...");
        assertNotNull(room);
        assertEquals(1, room.getParticipantsNumber());
        this.roomsManager.removeRoom("...");
    }
    
    @Test
    public void addParticipantInAnExistentRoomTest(){
        ParticipantSession expectedParticipant = ParticipantSessionDispenser.getStudentParticipant("doro.pesch");
        this.roomsManager.addParticipant(expectedParticipant, this.roomName);
        Room room = this.roomsManager.getRoom(this.roomName);
        ParticipantSession realParticipant = room.getParticipant(expectedParticipant.getUserName());
        assertEquals(expectedParticipant, realParticipant);
    }
    
    @Test 
    public void getParticipantsUserNamesByRoomNameEmptyRoomTest(){
       List<String> userNamesList = this.roomsManager.getParticipantsUserNamesByRoomName(this.roomName);
       assertThat(userNamesList, IsEmptyCollection.empty()); 
    }
    
    @Test 
    public void getParticipantsUserNamesByRoomNameNotEmptyRoomTest(){
       ParticipantSession participant = ParticipantSessionDispenser.getTutorParticipant("angela.gossow");
       ParticipantSession participant2 = ParticipantSessionDispenser.getStudentParticipant("doro.pesch");
       this.roomsManager.addParticipant(participant, this.roomName);
       this.roomsManager.addParticipant(participant2, this.roomName);
       List <String> expectedUserNamesList = Arrays.asList("angela.gossow", "doro.pesch");
       List<String> realUserNamesList = this.roomsManager.getParticipantsUserNamesByRoomName(this.roomName);
       Collections.sort(realUserNamesList);
       assertEquals(expectedUserNamesList, realUserNamesList);
    }
    
    @Test 
    public void getParticipantsByRoomNameEmptyRoomTest(){
       List<ParticipantSession> userNamesList = this.roomsManager.getParticipantsByRoomName(this.roomName);
       assertThat(userNamesList, IsEmptyCollection.empty()); 
    }
    
    @Test 
    public void getParticipantsByRoomNameNotEmptyRoomTest(){
       ParticipantSession participant = ParticipantSessionDispenser.getTutorParticipant("angela.gossow");
       ParticipantSession participant2 = ParticipantSessionDispenser.getStudentParticipant("doro.pesch");
       this.roomsManager.addParticipant(participant, this.roomName);
       this.roomsManager.addParticipant(participant2, this.roomName);
       List <ParticipantSession> expectedUserNamesList = Arrays.asList(participant, participant2);
       List<ParticipantSession> realUserNamesList = this.roomsManager.getParticipantsByRoomName(this.roomName);
       Collections.sort(realUserNamesList);
       assertEquals(expectedUserNamesList, realUserNamesList);
    }
    
    @Test 
    public void participantLeavesARoomTest(){
       ParticipantSession expectedParticipant = ParticipantSessionDispenser.getTutorParticipant("angela.gossow");
       ParticipantSession participant2 = ParticipantSessionDispenser.getStudentParticipant("doro.pesch");
       this.roomsManager.addParticipant(expectedParticipant,  this.roomName); 
       this.roomsManager.addParticipant(participant2, this.roomName);
       UserSession realUser = this.roomsManager.participantLeavesARoom(expectedParticipant.getUserName(), this.roomName);
       assertEquals(expectedParticipant,realUser);
       Room room = this.roomsManager.getRoom(this.roomName);
       assertNotNull(room);
    }
    
    @Test 
    public void participantLeavesARoomIsTheLastOneTest(){
       ParticipantSession expectedParticipant = ParticipantSessionDispenser.getTutorParticipant("angela.gossow");
       this.roomsManager.addParticipant(expectedParticipant,  this.roomName); 
       UserSession realUser = this.roomsManager.participantLeavesARoom(expectedParticipant.getUserName(), this.roomName);
       assertEquals(expectedParticipant,realUser);
       Room room = this.roomsManager.getRoom(this.roomName);
       assertNull(room);
    }
    
    @Test 
    public void participantLeavesARoomNotParticipantFoundTest(){
       UserSession user = this.roomsManager.participantLeavesARoom("...", this.roomName);
       assertNull(user);
    }
    
    @Test 
    public void participantLeavesARoomNotRoomFoundTest(){
       UserSession user = this.roomsManager.participantLeavesARoom("...", "...");
       assertNull(user);
    }
    
    @Test
    public void manageOfferVideoTest(){
       ParticipantSession participant = ParticipantSessionDispenser.getTutorParticipant("angela.gossow");
       ParticipantSession participant2 = ParticipantSessionDispenser.getStudentParticipant("doro.pesch");
       this.roomsManager.addParticipant(participant,  this.roomName); 
       this.roomsManager.addParticipant(participant2, this.roomName);
       MediaPipeline pipeline = ParticipantSessionDispenser.PIPELINE_ROOM_TEST;
       WebRtcEndpoint wre = new WebRtcEndpoint.Builder(pipeline).build();
       String answer = this.roomsManager.manageOfferVideo(participant.getUserName(), participant2.getUserName(), wre.generateOffer());  
       assertNotNull(answer); 
    }
    
    @Test
    public void addIncomingParticipantStudentTest(){
        ParticipantSession participant = ParticipantSessionDispenser.getStudentParticipant("doro.pesch");
        this.roomsManager.addIncomingParticipant(participant);
        ParticipantSession participant2 = (ParticipantSession)this.roomsManager.getIncomingParticipantByUserName(participant.getUserName());
        assertEquals(participant, participant2);
        this.roomsManager.removeIncomingParticipant(participant.getUserName());
    }
    
    @Test
    public void addIncomingParticipantTutorTest(){
        ParticipantSession participant = ParticipantSessionDispenser.getTutorParticipant("angela.gossow");
        this.roomsManager.addIncomingParticipant(participant);
        ParticipantSession participant2 = (ParticipantSession)this.roomsManager.getIncomingParticipantByUserName(participant.getUserName());
        assertNull(participant2);
    }
    
    @Test
    public void removeIncomingParticipantTest(){
        ParticipantSession participant = ParticipantSessionDispenser.getStudentParticipant("doro.pesch");
        this.roomsManager.addIncomingParticipant(participant);
        this.roomsManager.removeIncomingParticipant(participant);
        ParticipantSession participant2 = (ParticipantSession)this.roomsManager.getIncomingParticipantByUserName(participant.getUserName());
        assertNull(participant2);
    }
    
    @Test 
    public void getIncomingParticipantsTest(){
       ParticipantSession participant = ParticipantSessionDispenser.getStudentParticipant("morgan.lander");
       ParticipantSession participant2 = ParticipantSessionDispenser.getStudentParticipant("doro.pesch");
       this.roomsManager.addIncomingParticipant(participant);
       this.roomsManager.addIncomingParticipant(participant2);
       List <UserSession> expectedIncomingParticipantsList = Arrays.asList(participant, participant2);
       List <UserSession> realIncomingParticipantsList = this.roomsManager.getIncomingParticipants();
       Collections.sort(expectedIncomingParticipantsList);
       Collections.sort(realIncomingParticipantsList);
       assertEquals(expectedIncomingParticipantsList, realIncomingParticipantsList);
       this.roomsManager.removeIncomingParticipant(participant.getUserName());
       this.roomsManager.removeIncomingParticipant(participant2.getUserName());
    }
    
    @Test 
    public void getIncomingParticipantsEmptyListTest(){
       List <UserSession> incomingParticipantsList = this.roomsManager.getIncomingParticipants();
       assertThat(incomingParticipantsList, IsEmptyCollection.empty());
    }
    
}

