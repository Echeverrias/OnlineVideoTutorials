package org.jaea.onlinevideotutorials.handlers;


import com.google.gson.JsonObject;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import static org.hamcrest.CoreMatchers.is;
import org.hamcrest.collection.IsEmptyCollection;
import org.jaea.onlinevideotutorials.domain.ParticipantSession;
import org.jaea.onlinevideotutorials.domain.Room;
import org.jaea.onlinevideotutorials.domain.UserSession;
import org.jaea.onlinevideotutorials.managers.RoomsManager;
import org.jaea.onlinevideotutorials.managers.RoomsManagerTestConfig;
import org.jaea.onlinevideotutorials.managers.UserSessionsRegistry;
import org.jaea.onlinevideotutorials.managers.UserSessionsRegistryTestConfig;
import org.jaea.onlinevideotutorials.mocks.WebSocketSessionMock;
import org.jaea.onlinevideotutorials.services.KurentoTestConfig;
import org.jaea.onlinevideotutorials.utilities.ParticipantSessionDispenser;


import org.jaea.onlinevideotutorials.utilities.TextMessageDispenser;
import org.junit.After;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.TextMessage;
import org.springframework.test.context.ContextConfiguration;
import static org.junit.Assert.assertTrue;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;

/**
 *
 * @author Juan Antonio echeverrías Aranda
 */
@RunWith(SpringRunner.class)
@ContextConfiguration(classes={KurentoTestConfig.class, RoomsManagerTestConfig.class, 
    UserSessionsRegistryTestConfig.class, RoomHandlerTestConfig.class})
public class RoomHandlerTest {
    
    @Autowired
    UserSessionsRegistry usersRegistry;
    
    @Autowired
    RoomsManager roomsManager;
    
    @Autowired
    RoomHandler roomHandler;
    
    private ParticipantSession student = ParticipantSessionDispenser.getStudentParticipant("morgan.lander");
    private ParticipantSession tutor = ParticipantSessionDispenser.getTutorParticipant("angela.gossow");
    private String roomName = "room";
    ;
    
    @Before
    public void setUpBefore(){
       TextMessageDispenser.setAttributeNameOfTheMessageId(roomHandler.getAttributeNameOfTheMessageId());
       usersRegistry.addUser(this.tutor);
       usersRegistry.addUser(this.student);
    }
    
    @After
    public void setUpAfter(){
       usersRegistry.removeUser(this.student.getUserName());
       usersRegistry.removeUser(this.tutor.getUserName());
    }
    
    @Test
    public void jonRoomTutorTest(){
        TextMessage tm = TextMessageDispenser.getRoomParticipantTextMessage(RoomHandler.ID_JOIN_ROOM, this.roomName, this.tutor);
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
            */        
        }
        finally{
           // The room has been created
           assertTrue(roomsManager.existRoom(this.roomName));
           // The tutor is in the room
           Room room = roomsManager.getRoom(this.roomName);
           assertTrue(room.isTheTutor(this.tutor));
        }
    }
    
    @Test
    public void jonRoomStudentTest(){
        TextMessage joinTutorMsg = TextMessageDispenser.getRoomParticipantTextMessage(RoomHandler.ID_JOIN_ROOM, this.roomName, this.tutor);
        TextMessage joinStudentMsg = TextMessageDispenser.getRoomParticipantTextMessage(RoomHandler.ID_JOIN_ROOM, this.roomName, this.student);
        WebSocketSessionMock tutorWS = new WebSocketSessionMock(this.tutor.getSessionId());
        WebSocketSessionMock studentWS = new WebSocketSessionMock(this.student.getSessionId());
        try{
            roomHandler.handleTextMessage(tutorWS, joinTutorMsg);
            
            // The student joins into the room
            roomHandler.handleTextMessage(studentWS, joinStudentMsg);
        }
        catch(Exception e){
        }
        finally{
           // The student is in the room with the tutor 
           List<String> expectedParticipantsUserNameList = Arrays.asList(this.tutor.getUserName(), this.student.getUserName());
           Collections.sort(expectedParticipantsUserNameList);
           List<String> realParticipantsUserNameList = roomsManager.getParticipantsUserNamesByRoomName(this.roomName);
           Collections.sort(realParticipantsUserNameList);
           assertEquals(expectedParticipantsUserNameList, realParticipantsUserNameList);
           // The tutor is in room
           Room room = roomsManager.getRoom(this.roomName);
           assertTrue(room.isTheTutor(this.tutor));
        }
    }
    
    @Test
    public void exitRoomTutorTest(){
        TextMessage joinTutorMsg = TextMessageDispenser.getRoomParticipantTextMessage(RoomHandler.ID_JOIN_ROOM, this.roomName, this.tutor);
        TextMessage joinStudentMsg = TextMessageDispenser.getRoomParticipantTextMessage(RoomHandler.ID_JOIN_ROOM, this.roomName, this.student);
        TextMessage exitMsg = TextMessageDispenser.getRoomParticipantTextMessage(RoomHandler.ID_EXIT_ROOM, this.roomName, this.tutor);
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
           List<String> realParticipantsUserNameList = roomsManager.getParticipantsUserNamesByRoomName(this.roomName);
           Collections.sort(realParticipantsUserNameList);
           assertEquals(expectedParticipantsUserNameList, realParticipantsUserNameList);
           Room room = roomsManager.getRoom(this.roomName);
           assertFalse(room.isTheTutor(this.tutor));
           // The room still exists
           assertTrue(roomsManager.existRoom(this.roomName));
           // The tutor is still in the app
           ParticipantSession realTutor = (ParticipantSession)usersRegistry.getUserByUserName(this.tutor.getUserName());
           assertNotNull(realTutor);
        }
    }
    
    @Test
    public void exitRoomLastParticipantTest(){
        TextMessage joinTutorMsg = TextMessageDispenser.getRoomParticipantTextMessage(RoomHandler.ID_JOIN_ROOM, this.roomName, this.tutor);
        TextMessage joinStudentMsg = TextMessageDispenser.getRoomParticipantTextMessage(RoomHandler.ID_JOIN_ROOM, this.roomName, this.student);
        TextMessage exitTutorMsg = TextMessageDispenser.getRoomParticipantTextMessage(RoomHandler.ID_EXIT_ROOM, this.roomName, this.tutor);
        TextMessage exitStudentMsg = TextMessageDispenser.getRoomParticipantTextMessage(RoomHandler.ID_EXIT_ROOM, this.roomName, this.student);
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
           assertTrue(roomsManager.existRoom(this.roomName));
          // The users are still in the app
           assertTrue(usersRegistry.isThereAlreadyThisUser(this.tutor.getUserName()));
           assertTrue(usersRegistry.isThereAlreadyThisUser(this.student.getUserName()));
        }
    }
    
}
    

