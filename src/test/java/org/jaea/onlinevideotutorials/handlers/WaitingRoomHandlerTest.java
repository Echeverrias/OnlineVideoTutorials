package org.jaea.onlinevideotutorials.handlers;


import com.google.gson.JsonObject;
import java.util.List;
import org.jaea.onlinevideotutorials.domain.ParticipantSession;
import org.jaea.onlinevideotutorials.managers.RoomsManager;
import org.jaea.onlinevideotutorials.managers.RoomsManagerTestConfig;
import org.jaea.onlinevideotutorials.managers.UserSessionsRegistry;
import org.jaea.onlinevideotutorials.managers.UserSessionsRegistryTestConfig;
import org.jaea.onlinevideotutorials.mocks.WebSocketSessionMock;
import org.jaea.onlinevideotutorials.services.KurentoTestConfig;
import org.jaea.onlinevideotutorials.utilities.ParticipantSessionDispenser;


import org.jaea.onlinevideotutorials.utilities.TextMessageDispenser;
import org.junit.After;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.TextMessage;
import org.springframework.test.context.ContextConfiguration;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
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
    UserSessionsRegistryTestConfig.class, WaitingRoomHandlerTestConfig.class})
public class WaitingRoomHandlerTest {
    
    @Autowired
    UserSessionsRegistry usersRegistry;
    
    @Autowired
    RoomsManager roomsManager;
    
    @Autowired
    WaitingRoomHandler waitingRoomHandler;
    
    private ParticipantSession participant = ParticipantSessionDispenser.getStudentParticipant("morgan.lander");
    
    private WebSocketSessionMock ws = new WebSocketSessionMock("1");
    private String valueIdOfAnswerEnterMessage = "availableRooms";
    private String attributeNameOfAnswerEnterMessage = "availableRoomNames";
    
    @Before
    public void setUpBefore(){
       TextMessageDispenser.setAttributeNameOfTheMessageId(waitingRoomHandler.getAttributeNameOfTheMessageId());
       usersRegistry.addUser(this.participant);
    }
    
    @After
    public void setUpAfter(){
       usersRegistry.removeUser(this.participant.getUserName());
    }
    
    @Test
    public void enterTest(){
        TextMessage tm = TextMessageDispenser.getParticipantTextMessage(WaitingRoomHandler.ID_ENTER, this.participant);
        try{
            waitingRoomHandler.handleTextMessage(ws, tm);
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
           ParticipantSession participant2 = (ParticipantSession) roomsManager.getIncomingParticipantByUserName(this.participant.getUserName());
           assertEquals(this.participant, participant2);
        }
    }
    
    @Test
    public void exitTest(){
        roomsManager.addIncomingParticipant(this.participant);
        TextMessage tm = TextMessageDispenser.getParticipantTextMessage(WaitingRoomHandler.ID_EXIT, this.participant);
        try{
            waitingRoomHandler.handleTextMessage(ws, tm);
        }
        catch(Exception e){
                  
        }
        finally{
           ParticipantSession participant2 = (ParticipantSession) roomsManager.getIncomingParticipantByUserName(participant.getUserName());
           assertNull(participant2);
        }
        
        
    }
    
}
