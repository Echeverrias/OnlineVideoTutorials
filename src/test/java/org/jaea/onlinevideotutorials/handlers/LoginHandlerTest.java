package org.jaea.onlinevideotutorials.handlers;


import org.jaea.onlinevideotutorials.config.ApplicationContextTest;
import org.jaea.onlinevideotutorials.domain.ParticipantSession;
import org.jaea.onlinevideotutorials.domain.User;
import org.jaea.onlinevideotutorials.utilities.ParticipantSessionDispenser;
import org.junit.Test;
import org.springframework.test.context.junit4.SpringRunner;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.jaea.onlinevideotutorials.managers.UserSessionsRegistry;
import org.jaea.onlinevideotutorials.utilities.TextMessageDispenser;
import org.junit.Before;
import org.springframework.web.socket.WebSocketSession;



/**
 *
 * @author Juan Antonio Echeverrías Aranda
 */
@RunWith(SpringRunner.class)
@ContextConfiguration(classes = {ApplicationContextTest.class, LoginHandlerTestConfig.class  })
public class LoginHandlerTest {
    
    @Autowired
    private LoginHandler loginHandler;
    
    @Autowired
    private UserSessionsRegistry usersRegistry;
    
    private WebSocketSession participant_ws;
    
    private ParticipantSession participant = ParticipantSessionDispenser.getStudentParticipant("morgan.lander");
    private boolean initialize = false;
    
    @Before
    public void setUpBefore(){
        
        if (! this.initialize){
            TextMessageDispenser.setAttributeNameOfTheMessageId(loginHandler.getAttributeNameOfTheMessageId());
            TextMessageDispenser.setAttributeNameOfTheMessagePayload(loginHandler.getAttributeNameOfTheMessagePayload());
            this.initialize = true;
        }
        
        User user = (User) this.participant;
        /*
            The user is already registered because the server checks first the user
            exists in the ddbb and let him to login in the system after and then
            register him (his data, but not his session)    
        */
        this.usersRegistry.registerUser(user);
        this.participant_ws = this.participant.getSession();
         
    }
    
    
    @Test
    public void pruebaTest(){}
    
    /*
    @Test
    public void logoutTest(){
        TextMessage tm = TextMessageDispenser.getParticipantTextMessage(LoginHandler.ID_LOGOUT, this.participant);
        try{
            loginHandler.handleTextMessage(this.participant_ws, tm);
        }
        catch(Exception e){
        
        }
        finally{
            assertFalse(usersRegistry.isThereAlreadyThisUser(this.participant.getUserName()));
        }
    }
    
    @Test
    public void loginTest(){
        
        TextMessage tm = TextMessageDispenser.getParticipantTextMessage(LoginHandler.ID_LOGIN, this.participant);
        try{
            loginHandler.handleTextMessage(this.participant_ws, tm);
        }
        catch(Exception e){
        }
        finally{
            ParticipantSession participant2 = (ParticipantSession) usersRegistry.getUserBySessionId(this.participant_ws.getId());
            assertEquals(this.participant, participant2);
        }
    }
      
    
    */
    
    
}
