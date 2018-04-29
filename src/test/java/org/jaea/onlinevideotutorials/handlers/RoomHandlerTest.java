package org.jaea.onlinevideotutorials.handlers;

import org.jaea.onlinevideotutorials.config.ApplicationContextTest;
import org.jaea.onlinevideotutorials.controllers.UserController;
import org.jaea.onlinevideotutorials.domain.MediaRoom;
import org.jaea.onlinevideotutorials.domain.ParticipantSession;
import org.jaea.onlinevideotutorials.domain.Room;
import org.jaea.onlinevideotutorials.managers.RoomsManager;
import org.jaea.onlinevideotutorials.managers.UserSessionsRegistry;
import org.jaea.onlinevideotutorials.mocks.WebSocketSessionMock;
import org.jaea.onlinevideotutorials.repositories.MediaRoomRepository;
import org.jaea.onlinevideotutorials.utilities.MediaRoomMookDispenser;
import org.jaea.onlinevideotutorials.utilities.ParticipantSessionDispenser;
import org.jaea.onlinevideotutorials.utilities.TextMessageDispenser;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import static org.hamcrest.Matchers.hasSize;
import org.junit.Before;
import org.junit.Test;
import org.junit.After;
import org.junit.Assert;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.TextMessage;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author Juan Antonio echeverrías Aranda
 */
@RunWith(SpringRunner.class)
@ContextConfiguration(classes={ApplicationContextTest.class, 
    RoomHandlerTestConfig.class})
public class RoomHandlerTest {
    
    private final Logger log = LoggerFactory.getLogger(UserController.class);
    
    @Autowired
    UserSessionsRegistry usersRegistry;
    
    @Autowired
    RoomsManager roomsManager;
    
    @Autowired
    RoomHandler roomHandler;
    
    @MockBean
    private MediaRoomRepository roomRepository;
    
    private String tutorName = "angela.gossow";
    private String roomName = "room";
    private ParticipantSession student = ParticipantSessionDispenser.getStudentParticipant("morgan.lander");
    private ParticipantSession tutor = ParticipantSessionDispenser.getTutorParticipant(tutorName);
    private MediaRoom room; // = new RoomMock("room", this.tutorName);
    private boolean initialize = false;
    
    @Before
    public void setUp(){
        if(! this.initialize){
            TextMessageDispenser.setAttributeNameOfTheMessageId(roomHandler.getAttributeNameOfTheMessageId());
            TextMessageDispenser.setAttributeNameOfTheMessagePayload(roomHandler.getAttributeNameOfTheMessagePayload());
       
            this.usersRegistry.registerUser(this.tutor);
            this.usersRegistry.registerUserSession(this.tutor.getUserName(), this.tutor.getSession());
            Assert.assertEquals(this.tutor, this.usersRegistry.getUserBySessionId(this.tutor.getSession().getId()));
            
            this.usersRegistry.registerUser(this.student);
            this.usersRegistry.registerUserSession(this.student.getUserName(), this.student.getSession());
            Assert.assertEquals(this.student, this.usersRegistry.getUserBySessionId(this.student.getSession().getId()));
            
            this.room = MediaRoomMookDispenser.getMediaRoom(this.roomName, this.tutorName);
            Mockito.when(this.roomRepository.findOne(this.room.getId()))
                 .thenReturn(this.room);
            
            this.initialize = true;
        
        }
        
        roomsManager.createRoom(this.room);
        
    }
    
    @After
    public void setUpAfter(){
       roomsManager.removeRoom(this.room.getId());
    }
    
     /*
    @Before
    public void setUpBefore(){
       
       
    }
    
    @After
    public void setUpAfter(){
       usersRegistry.unregisterUser(this.student.getUserName());
       usersRegistry.unregisterUser(this.tutor.getUserName());
       roomsManager.removeRoom(this.room.getId());
    }
    */
    
    @Test
    public void joinRoomTutorTest(){
        TextMessage tm = TextMessageDispenser.getRoomParticipantTextMessage(RoomHandler.ID_JOIN_ROOM, this.room, this.tutor);
        WebSocketSessionMock ws = new WebSocketSessionMock(this.tutor.getSessionId());
        try{
            
            // The tutor joins into the room
            roomHandler.handleTextMessage(ws, tm);
        }
        catch(Exception e){
            
    /*
            JsonObject msg = new JsonObject();
            List <String> availableRoomsNames = roomsManager.getAvailableRoomsNames();
            msg.addProperty(waitingRoomHandler.getAttributeNameOfTheMessageId(), this.valueIdOfAnswerEnterMessage);
            msg.addProperty(this.attributeNameOfAnswerEnterMessage, availableRoomsNames.toString());
            assertEquals(msg.getAsString(), e.getMessage());
    /*/
        }
        finally{
           // The room has been created
           assertTrue(roomsManager.existRoom(this.room.getId()));
           // The tutor is in the room
           Room room = roomsManager.getRoom(this.room.getId());
           assertTrue(room.isTheTutor(this.tutor.getUserName()));
           assertThat(roomsManager.getParticipantsByRoomId(this.room.getId()), hasSize(1));
        }
    }
    
    @Test
    public void joinRoomStudentTest(){
        //TextMessage joinTutorMsg = TextMessageDispenser.getRoomParticipantTextMessage(RoomHandler.ID_JOIN_ROOM, this.room, this.tutor);
        TextMessage joinStudentMsg = TextMessageDispenser.getRoomParticipantTextMessage(RoomHandler.ID_JOIN_ROOM, this.room, this.student);
       // WebSocketSessionMock tutorWS = new WebSocketSessionMock(this.tutor.getSessionId());
        WebSocketSessionMock studentWS = new WebSocketSessionMock(this.student.getSessionId());
        try{
          //  roomHandler.handleTextMessage(tutorWS, joinTutorMsg);
            
            // The student joins into the room
            roomHandler.handleTextMessage(studentWS, joinStudentMsg);
        }
        catch(Exception e){
        }
        finally{
           assertThat(roomsManager.getParticipantsByRoomId(this.room.getId()), hasSize(1)); 
           List<String> expectedParticipantsUserNameList = Arrays.asList(this.student.getUserName());
           Collections.sort(expectedParticipantsUserNameList);
           List<String> realParticipantsUserNameList = roomsManager.getParticipantsUserNamesByRoom(this.room.getId());
           Collections.sort(realParticipantsUserNameList);
           assertEquals(expectedParticipantsUserNameList, realParticipantsUserNameList);
           Room room = roomsManager.getRoom(this.room.getId());
           assertTrue(room.isTheTutor(this.tutor.getUserName()));
        }
    }
    
    @Test
    public void exitRoomTutorTest(){
        TextMessage joinTutorMsg = TextMessageDispenser.getRoomParticipantTextMessage(RoomHandler.ID_JOIN_ROOM, this.room, this.tutor);
        TextMessage joinStudentMsg = TextMessageDispenser.getRoomParticipantTextMessage(RoomHandler.ID_JOIN_ROOM, this.room, this.student);
        TextMessage exitMsg = TextMessageDispenser.getRoomParticipantTextMessage(RoomHandler.ID_EXIT_ROOM, this.room, this.tutor);
        WebSocketSessionMock tutorWS = new WebSocketSessionMock(this.tutor.getSessionId());
        WebSocketSessionMock studentWS = new WebSocketSessionMock(this.student.getSessionId());
        try{
            roomHandler.handleTextMessage(tutorWS, joinTutorMsg);
            roomHandler.handleTextMessage(studentWS, joinStudentMsg);
            
            // The tutor letf the room
            roomHandler.handleTextMessage(tutorWS, exitMsg);
        }
        catch(Exception e){
        }
        finally{
            // The tutor has left the room 
           List<String> expectedParticipantsUserNameList = Arrays.asList(this.student.getUserName());
           Collections.sort(expectedParticipantsUserNameList);
           List<String> realParticipantsUserNameList = roomsManager.getParticipantsUserNamesByRoom(this.room.getId());
           Collections.sort(realParticipantsUserNameList);
           this.log.info("### Expected: {}, real: {}",1, realParticipantsUserNameList.size());
           assertEquals(expectedParticipantsUserNameList, realParticipantsUserNameList);
           Room room = roomsManager.getRoom(this.room.getId());
           assertTrue(room.isTheTutor(this.tutor.getUserName()));
           // The room still exists
           assertTrue(roomsManager.existRoom(this.room.getId()));
           // The tutor is still in the app
           ParticipantSession realTutor = (ParticipantSession)usersRegistry.getUserByUserName(this.tutor.getUserName());
           assertNotNull(realTutor);
        }
    }
    
    @Test
    public void exitRoomLastParticipantTest(){
        TextMessage joinTutorMsg = TextMessageDispenser.getRoomParticipantTextMessage(RoomHandler.ID_JOIN_ROOM, this.room, this.tutor);
        TextMessage joinStudentMsg = TextMessageDispenser.getRoomParticipantTextMessage(RoomHandler.ID_JOIN_ROOM, this.room, this.student);
        TextMessage exitTutorMsg = TextMessageDispenser.getRoomParticipantTextMessage(RoomHandler.ID_EXIT_ROOM, this.room, this.tutor);
        TextMessage exitStudentMsg = TextMessageDispenser.getRoomParticipantTextMessage(RoomHandler.ID_EXIT_ROOM, this.room, this.student);
        WebSocketSessionMock tutorWS = new WebSocketSessionMock(this.tutor.getSessionId());
        WebSocketSessionMock studentWS = new WebSocketSessionMock(this.student.getSessionId());
        try{
            roomHandler.handleTextMessage(tutorWS, joinTutorMsg);
            roomHandler.handleTextMessage(studentWS, joinStudentMsg);
            roomHandler.handleTextMessage(tutorWS, exitTutorMsg);
            
            // The student exit of the room
            roomHandler.handleTextMessage(studentWS, exitStudentMsg);
        }
        catch(Exception e){
        }
        finally{
           // The room doesn't exist
           assertTrue(roomsManager.existRoom(this.room.getId()));
          // The users are still in the app
           assertTrue(usersRegistry.isThereAlreadyThisUser(this.tutor.getUserName()));
           assertTrue(usersRegistry.isThereAlreadyThisUser(this.student.getUserName()));
        }
    }
    
}
    

