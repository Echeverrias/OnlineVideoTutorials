package org.jaea.onlinevideotutorials.handlers;


import org.jaea.onlinevideotutorials.config.ApplicationContextTest;
import org.jaea.onlinevideotutorials.domain.ParticipantSession;
import org.jaea.onlinevideotutorials.managers.RoomsManager;
import org.jaea.onlinevideotutorials.managers.UserSessionsRegistry;
import org.jaea.onlinevideotutorials.mocks.WebSocketSessionMock;
import org.jaea.onlinevideotutorials.utilities.ParticipantSessionDispenser;
import org.jaea.onlinevideotutorials.utilities.TextMessageDispenser;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.TextMessage;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

/**
 *
 * @author Juan Antonio echeverrías Aranda
 */
@RunWith(SpringRunner.class)
@ContextConfiguration(classes={ApplicationContextTest.class, 
     WaitingRoomHandlerTestConfig.class})
public class WaitingRoomHandlerTest {
    
    @Autowired
    UserSessionsRegistry usersRegistry;
    
    @Autowired
    RoomsManager roomsManager;
    
   @Autowired
    WaitingRoomHandler waitingRoomHandler;
    
    private ParticipantSession participant = ParticipantSessionDispenser.getStudentParticipant("morgan.lander");
     private WebSocketSessionMock fakews = new WebSocketSessionMock("1");
     private boolean initialize = false;
    
    @Before
    public void setUpBefore(){
       if (!this.initialize){ 
        TextMessageDispenser.setAttributeNameOfTheMessageId(waitingRoomHandler.getAttributeNameOfTheMessageId());
        TextMessageDispenser.setAttributeNameOfTheMessagePayload(waitingRoomHandler.getAttributeNameOfTheMessagePayload());
        this.initialize = true;
       }
       this.usersRegistry.registerUser(this.participant);
       this.usersRegistry.registerUserSession(this.participant.getUserName(), this.participant.getSession());
    }
    
    @After
    public void setUpAfter(){
       this.usersRegistry.unregisterUser(this.participant.getUserName());
    }
    
    @Test
    public void enterTest(){
        TextMessage tm = TextMessageDispenser.getParticipantTextMessage(WaitingRoomHandler.ID_ENTER_WAITING_ROOM, this.participant);
        try{
            waitingRoomHandler.handleTextMessage(this.fakews, tm);
        }
        catch(Exception e){
        }
        finally{
           ParticipantSession participant2 = (ParticipantSession) roomsManager.getIncomingParticipantByUserName(this.participant.getUserName());
           assertEquals(this.participant, participant2);
        }
    }
    
   
    @Test
    public void exitTest(){
        roomsManager.addIncomingParticipant(this.participant);
        TextMessage tm = TextMessageDispenser.getParticipantTextMessage(WaitingRoomHandler.ID_EXIT_WAITING_ROOM, this.participant);
        try{
            waitingRoomHandler.handleTextMessage(this.fakews, tm);
        }
        catch(Exception e){
                  
        }
        finally{
           ParticipantSession participant2 = (ParticipantSession) roomsManager.getIncomingParticipantByUserName(participant.getUserName());
           assertNull(participant2);
        }
        
        
    }
    
}
