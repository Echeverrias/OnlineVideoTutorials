package org.jaea.onlinevideotutorials.handlers;


import org.jaea.onlinevideotutorials.domain.ParticipantSession;
import org.jaea.onlinevideotutorials.utilities.ParticipantSessionDispenser;
import org.junit.Test;
import org.springframework.test.context.junit4.SpringRunner;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.jaea.onlinevideotutorials.managers.UserSessionsRegistryTestConfig;
import org.jaea.onlinevideotutorials.managers.UserSessionsRegistry;
import org.jaea.onlinevideotutorials.mocks.WebSocketSessionMock;
import org.jaea.onlinevideotutorials.utilities.TextMessageDispenser;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import org.junit.Before;
import org.springframework.web.socket.TextMessage;



/**
 *
 * @author Juan Antonio Echeverrías Aranda
 */
@RunWith(SpringRunner.class)
@ContextConfiguration(classes = {UserSessionsRegistryTestConfig.class, LoginHandlerTestConfig.class  })
public class LoginHandlerTest {
    
    @Autowired
    private LoginHandler loginHandler;
     
    @Autowired
    private UserSessionsRegistry usersRegistry;
    
    private WebSocketSessionMock ws = new WebSocketSessionMock("1");
   
    @Before
    public void setUpBefore(){
        TextMessageDispenser.setAttributeNameOfTheMessageId(loginHandler.getAttributeNameOfTheMessageId());
    }
    
    @Test
    public void loginTest(){
        ParticipantSession participant = ParticipantSessionDispenser.getStudentParticipant("morgan.lander");
        TextMessage tm = TextMessageDispenser.getParticipantTextMessage(LoginHandler.ID_LOGIN, participant);
        try{
            loginHandler.handleTextMessage(ws, tm);
        }
        catch(Exception e){
        
        }
        finally{
            ParticipantSession participant2 = (ParticipantSession) usersRegistry.getUserBySessionId(ws.getId());
            assertEquals(participant, participant2);
        }
    }
    
    @Test
    public void logoutTest(){
        ParticipantSession participant = ParticipantSessionDispenser.getStudentParticipant("morgan.lander");
        //usersRegistry.addUser(participant);
        TextMessage tm = TextMessageDispenser.getParticipantTextMessage(LoginHandler.ID_LOGOUT, participant);
        try{
            loginHandler.handleTextMessage(ws, tm);
        }
        catch(Exception e){
        
        }
        finally{
            assertFalse(usersRegistry.isThereAlreadyThisUser(participant.getUserName()));
        }
    }
    
    
}
