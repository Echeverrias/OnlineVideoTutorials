package org.jaea.onlinevideotutorials.managers;


import org.jaea.onlinevideotutorials.config.ApplicationContextTest;
import org.jaea.onlinevideotutorials.domain.MediaRoom;
import org.jaea.onlinevideotutorials.domain.ParticipantSession;
import org.jaea.onlinevideotutorials.domain.Room;
import org.jaea.onlinevideotutorials.domain.UserSession;
import org.jaea.onlinevideotutorials.mocks.MediaRoomMock;
import org.jaea.onlinevideotutorials.utilities.ParticipantSessionDispenser;
import org.jaea.onlinevideotutorials.utilities.MediaRoomMookDispenser;
import org.jaea.onlinevideotutorials.repositories.MediaRoomRepository;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.Assert;
import static org.junit.Assert.assertThat;
import org.junit.runner.RunWith;
import static org.hamcrest.CoreMatchers.hasItems;
import static org.hamcrest.Matchers.hasSize;
import org.hamcrest.collection.IsEmptyCollection;

import org.mockito.Mockito;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.junit4.SpringRunner;
import org.kurento.client.MediaPipeline;
import org.kurento.client.WebRtcEndpoint;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

 
@RunWith(SpringRunner.class)
@ContextConfiguration(classes = {ApplicationContextTest.class})
public class RoomsManagerTest {
    
    private final Logger log = LoggerFactory.getLogger(RoomsManagerTest.class);

    
    
    @Autowired
    private RoomsManager roomsManager;
    
    @MockBean
    private MediaRoomRepository roomRepository;
    
    
    private String roomName = "room";
    private String tutorName = "tutor";
    private MediaRoomMock room;
   
    private Long roomId = new Long(1);
    private MediaPipeline pipelineRoom;
    private Long non_existentRoomId = new Long(5);
    
    private boolean initialize = false;
    
    @Before
    public void setUp() {
        
        if (!this.initialize){
            
            //this.room = new MediaRoomMock(this.roomName, this.tutorName, ParticipantSessionDispenser.PIPELINE_ROOM_TEST);
            //1º
            /*
            this.room = mock(MediaRoom.class);
            Mockito.when(this.room.getId()).thenReturn(this.roomId);
            Mockito.when(this.room.getName()).thenReturn(this.roomName);
            Mockito.when(this.room.getTutor()).thenReturn(this.tutorName);
            Mockito.when(this.room.getCreatedAt()).thenReturn(new Date());
            */
            this.room = MediaRoomMookDispenser.getMediaRoom(this.roomName, this.tutorName);
            this.pipelineRoom = this.room.getPipeline();
            //2º
            Mockito.when(this.roomRepository.findOne(this.room.getId()))
                 .thenReturn(this.room);
            this.initialize = true;
        }
    }
    
    /*
    @Before
    public void setUpBefore(){
       // this.roomsManager.createRoom(room);
       // roomId = this.room.getId();
    }
    */
    
    @After
    public void setUpAfter(){
        this.roomsManager.removeRoom(room.getId());
    }
    
    @Test
    public void removeRoomTest(){
        log.info(this.room.toString());
        MediaRoom createdRoom = this.roomsManager.createRoom(this.room);
        log.info(createdRoom.toString());
        this.roomsManager.removeRoom(createdRoom.getId());
        assertNull(this.roomsManager.getRoom(createdRoom.getId()));
    }
    
    
    
    @Test
    public void createRoom_existRoom_thatIsntRegisteredAndIsInTheRepositoryTest(){
        MediaRoom createdRoom = this.roomsManager.createRoom(this.room);
        assertEquals(this.room.getId(), createdRoom.getId());
        assertTrue(this.roomsManager.existRoom(createdRoom.getId()));
        
        this.roomsManager.removeRoom(createdRoom.getId());
    }
    
    
     @Test
    public void isThereRoomTest(){
        MediaRoom createdRoom = this.roomsManager.createRoom(this.room);
        
        assertTrue(this.roomsManager.isThereRoom(room));
        
        this.roomsManager.removeRoom(createdRoom.getId());
    }
    
    
    @Test
    public void getRoomTest(){
        MediaRoom createdRoom = this.roomsManager.createRoom(this.room);
        
        Assert.assertEquals((Object) createdRoom, (Object)this.roomsManager.getRoom(room.getId()));
        
        this.roomsManager.removeRoom(createdRoom.getId());
    }
    
  
    @Test
    public void getRoomNullTest(){
        assertNull(this.roomsManager.getRoom(this.non_existentRoomId));
    }
    
   
    
    
   
    
    @Test
    public void getAvailableRoomsTest(){
        // Setup - One room will be created
        MediaRoom createdRoom = this.roomsManager.createRoom(this.room);
        List<MediaRoom> expectedRooms = new ArrayList<>();
        expectedRooms.add(createdRoom);
        
        List<Room> rooms = this.roomsManager.getAvailableRooms();
        log.info(createdRoom.toString());
        log.info(rooms.get(0).toString());
        assertEquals(expectedRooms.get(0).getId(),rooms.get(0).getId());
        assertEquals(expectedRooms.size(), rooms.size());
        
        this.roomsManager.removeRoom(createdRoom.getId());
    }
    
   
    
    
    
    
    @Test
    public void getAvailableRooms_NotEmptyTest(){
        MediaRoom createdRoom = this.roomsManager.createRoom(this.room);
        
        List<Room> roomsList = this.roomsManager.getAvailableRooms();
        assertThat(roomsList, hasItems(this.room)); 
        assertThat(roomsList, hasSize(1));
        this.roomsManager.removeRoom(createdRoom.getId());
    }
    
    @Test
    public void getAvailableRooms_EmptyTest(){
        MediaRoom createdRoom = this.roomsManager.createRoom(this.room);
        this.roomsManager.removeRoom(createdRoom.getId());
        
        List<Room> roomsList = this.roomsManager.getAvailableRooms();
        assertThat(roomsList, IsEmptyCollection.empty()); 
    }
    
    
    @Test
    public void addParticipantTutor_InANonExistentRoomTest(){
        ParticipantSession participant = ParticipantSessionDispenser.getTutorParticipant("angela.gossow");
        Long newId = this.non_existentRoomId;
        
        this.roomsManager.addParticipant(participant, newId);
        MediaRoom room = this.roomsManager.getRoom(newId);
        assertNull(room);
    }
    
    @Test
    public void addParticipant_InAnExistentRoomTest(){
        MediaRoom expectedRoom = this.roomsManager.createRoom(this.room);
        ParticipantSession expectedParticipant = ParticipantSessionDispenser.getStudentParticipant("doro.pesch");
        
        this.roomsManager.addParticipant(expectedParticipant, this.room.getId());
        MediaRoom room = this.roomsManager.getRoom(this.room.getId());
        ParticipantSession realParticipant = room.getParticipant(expectedParticipant.getUserName());
        assertEquals(expectedParticipant, realParticipant);
        
        this.roomsManager.removeRoom(expectedRoom.getId());
    }
    
    @Test 
    public void getParticipantsUserNamesByRoomName_EmptyRoomTest(){
       MediaRoom createdRoom = this.roomsManager.createRoom(this.room);
       
       List<String> userNamesList = this.roomsManager.getParticipantsUserNamesByRoom(this.room.getId());
       assertThat(userNamesList, IsEmptyCollection.empty()); 
       
       this.roomsManager.removeRoom(createdRoom.getId());
    }
    
    @Test 
    public void getParticipantsUserNamesByRoomNameNotEmptyRoomTest(){
       //Set up
       MediaRoom createdRoom = this.roomsManager.createRoom(this.room); 
       ParticipantSession participant = ParticipantSessionDispenser.getTutorParticipant("angela.gossow");
       ParticipantSession participant2 = ParticipantSessionDispenser.getStudentParticipant("doro.pesch");
       this.roomsManager.addParticipant(participant, this.room.getId());
       this.roomsManager.addParticipant(participant2, this.room.getId());
       List <String> expectedUserNamesList = Arrays.asList("angela.gossow", "doro.pesch");
       
       List<String> realUserNamesList = this.roomsManager.getParticipantsUserNamesByRoom(this.room.getId());
       Collections.sort(realUserNamesList);
       assertEquals(expectedUserNamesList, realUserNamesList);
       
       this.roomsManager.removeRoom(createdRoom.getId());
    }
    
    @Test 
    public void getParticipantsByRoomName_EmptyRoomTest(){
       MediaRoom createdRoom = this.roomsManager.createRoom(this.room); 
       
       List<ParticipantSession> userNamesList = this.roomsManager.getParticipantsByRoomId(this.room.getId());
       assertThat(userNamesList, IsEmptyCollection.empty()); 
       
       this.roomsManager.removeRoom(createdRoom.getId());
    }
    
    @Test 
    public void getParticipantsByRoomName_NotEmptyRoomTest(){
       MediaRoom createdRoom = this.roomsManager.createRoom(this.room); 
       ParticipantSession participant = ParticipantSessionDispenser.getTutorParticipant("angela.gossow");
       ParticipantSession participant2 = ParticipantSessionDispenser.getStudentParticipant("doro.pesch");
       this.roomsManager.addParticipant(participant, this.room.getId());
       this.roomsManager.addParticipant(participant2, this.room.getId());
       List <ParticipantSession> expectedUserNamesList = Arrays.asList(participant, participant2);
       
       List<ParticipantSession> realUserNamesList = this.roomsManager.getParticipantsByRoomId(this.room.getId());
       Collections.sort(realUserNamesList);
       assertEquals(expectedUserNamesList, realUserNamesList);
       this.roomsManager.removeRoom(createdRoom.getId());
    }
    
    @Test 
    public void participantLeavesARoomTest(){
       MediaRoom createdRoom = this.roomsManager.createRoom(this.room); 
       ParticipantSession expectedParticipant = ParticipantSessionDispenser.getTutorParticipant("angela.gossow");
       ParticipantSession participant2 = ParticipantSessionDispenser.getStudentParticipant("doro.pesch");
       this.roomsManager.addParticipant(expectedParticipant,  this.room.getId()); 
       this.roomsManager.addParticipant(participant2, this.room.getId());
       
       UserSession realUser = this.roomsManager.participantLeavesARoom(expectedParticipant.getUserName(), this.room.getId());
       assertEquals(expectedParticipant,realUser);
       Room room = this.roomsManager.getRoom(this.room.getId());
       assertNotNull(room);
       
       this.roomsManager.removeRoom(createdRoom.getId());
    }
    
    @Test 
    public void participantLeavesARoom_IsTheLastOneTest(){
       MediaRoom createdRoom = this.roomsManager.createRoom(this.room);
       ParticipantSession expectedParticipant = ParticipantSessionDispenser.getTutorParticipant("angela.gossow");
       this.roomsManager.addParticipant(expectedParticipant,  this.room.getId()); 
      
       UserSession realUser = this.roomsManager.participantLeavesARoom(expectedParticipant.getUserName(), this.room.getId());
       assertEquals(expectedParticipant,realUser);
       Room room = this.roomsManager.getRoom(this.room.getId());
       assertNull(room);
       
       this.roomsManager.removeRoom(createdRoom.getId());
    }
    
    @Test 
    public void participantLeavesARoom_NotParticipantFoundTest(){
       MediaRoom createdRoom = this.roomsManager.createRoom(this.room);
       
       UserSession user = this.roomsManager.participantLeavesARoom("...", this.room.getId());
       assertNull(user);
       
       this.roomsManager.removeRoom(createdRoom.getId());
    }
    
    @Test 
    public void participantLeavesARoom_NotRoomFoundTest(){
       UserSession user = this.roomsManager.participantLeavesARoom("...", this.non_existentRoomId);
       assertNull(user);
    }
   
    @Test
    public void addIncomingParticipant_StudentTest(){
        MediaRoom createdRoom = this.roomsManager.createRoom(this.room);
        ParticipantSession participant = ParticipantSessionDispenser.getStudentParticipant("doro.pesch");
        
        this.roomsManager.addIncomingParticipant(participant);
        ParticipantSession participant2 = (ParticipantSession)this.roomsManager.getIncomingParticipantByUserName(participant.getUserName());
        assertEquals(participant, participant2);
        this.roomsManager.removeIncomingParticipant(participant.getUserName());
        
        this.roomsManager.removeRoom(createdRoom.getId());
    }
    
    @Test
    public void addIncomingParticipant_TutorTest(){
        MediaRoom createdRoom = this.roomsManager.createRoom(this.room);
        
        ParticipantSession participant = ParticipantSessionDispenser.getTutorParticipant("angela.gossow");
        
        this.roomsManager.addIncomingParticipant(participant);
        ParticipantSession participant2 = (ParticipantSession)this.roomsManager.getIncomingParticipantByUserName(participant.getUserName());
        assertNull(participant2);
        
        this.roomsManager.removeRoom(createdRoom.getId());
    }
    
    @Test
    public void removeIncomingParticipantTest(){
        MediaRoom createdRoom = this.roomsManager.createRoom(this.room);
        ParticipantSession participant = ParticipantSessionDispenser.getStudentParticipant("doro.pesch");
        this.roomsManager.addIncomingParticipant(participant);
        
        this.roomsManager.removeIncomingParticipant(participant);
        ParticipantSession participant2 = (ParticipantSession)this.roomsManager.getIncomingParticipantByUserName(participant.getUserName());
        assertNull(participant2);
        
        this.roomsManager.removeRoom(createdRoom.getId());
    }
    
    @Test 
    public void getIncomingParticipantsTest(){
       MediaRoom createdRoom = this.roomsManager.createRoom(this.room); 
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
       
       this.roomsManager.removeRoom(createdRoom.getId());
    }
    
    @Test 
    public void getIncomingParticipants_EmptyListTest(){
       MediaRoom createdRoom = this.roomsManager.createRoom(this.room); 
       
       List <UserSession> incomingParticipantsList = this.roomsManager.getIncomingParticipants();
       assertThat(incomingParticipantsList, IsEmptyCollection.empty());
       
       this.roomsManager.removeRoom(createdRoom.getId());
    }
   
     
    @Test
    public void manageOfferVideoTest(){
       MediaRoom createdRoom = this.roomsManager.createRoom(this.room); 
       ParticipantSession participant = ParticipantSessionDispenser.getTutorParticipant("angela.gossow");
       ParticipantSession participant2 = ParticipantSessionDispenser.getStudentParticipant("doro.pesch");
       this.roomsManager.addParticipant(participant,  createdRoom.getId()); 
       this.roomsManager.addParticipant(participant2, createdRoom.getId());
       WebRtcEndpoint wre = new WebRtcEndpoint.Builder(this.pipelineRoom).build();
       String answer = this.roomsManager.manageOfferVideo(participant.getUserName(), participant2.getUserName(), wre.generateOffer());  
       assertNotNull(answer); 
       
       this.roomsManager.removeRoom(createdRoom.getId());
    }
   
    
 
    
    /**
    
    RoomsManager.createRoom(String, String) create a new room,
    persisted it in the repository and then 
    use the private method RoomsManager.registerRoom(Room)
    to add to the hash maps attributes.
    The problem is when the created room is persisted, the attribute 'id' is setted,
    and this value is needed to add the room in the hash map.
    Nevertheless, in the test the created room isn't persisted really and the value of
    the attribute id is not setted,so both methods throw an error.
    *//*
    
    @Test
    public void createRoom_thatIsntRegisteredAndIsntInTheRepositoryTest(){
        // Set up
        Mockito.when(this.roomRepository.findOne(this.room.getId()))
             .thenReturn(null);
        
        MediaRoom createdRoom = this.roomsManager.createRoom(this.room.getName(), this.room.getTutor());
        List<Room> availableRooms = this.roomsManager.getAvailableRooms();
        assertEquals(this.room.getName(), createdRoom.getName());
        assertThat(availableRooms, hasSize(1));
        assertEquals(this.room.getName(), availableRooms.get(0).getName());
    }
    
    */
    
   
    
}

