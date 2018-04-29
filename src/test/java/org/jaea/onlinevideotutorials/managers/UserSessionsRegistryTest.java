package org.jaea.onlinevideotutorials.managers;

import org.jaea.onlinevideotutorials.config.ApplicationContextTest;
import org.jaea.onlinevideotutorials.domain.UserSession;
import org.jaea.onlinevideotutorials.utilities.ParticipantSessionDispenser;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;


@RunWith(value=SpringRunner.class)
@ContextConfiguration(classes = {ApplicationContextTest.class})
public class UserSessionsRegistryTest {
    
    @Autowired
    UserSessionsRegistry usersRegistry;
    String userName = "angela.gossow";
    UserSession user = ParticipantSessionDispenser.getTutorUser((String)this.userName);
    UserSession user2 = ParticipantSessionDispenser.getStudentUser((String)"doro.pesch");

    @Before
    public void setUpBefore() {
        //this.usersRegistry = new UserSessionsRegistry();
    }
    
    @Test
    public void registerUser_isThereAlreadyThisUserTest(){
        this.usersRegistry.registerUser(this.user);
        Assert.assertTrue(this.usersRegistry.isThereAlreadyThisUser(this.userName));
    }
    
    @Test
    public void getUserByUserNameTest(){
        this.usersRegistry.registerUser(this.user);
        UserSession registeredUser = this.usersRegistry.getUserByUserName(this.user.getUserName());
        Assert.assertEquals((Object)this.user, (Object)registeredUser );
    }
    
    @Test
    public void registerUserSession_getUserBySessionIdTest(){
        this.usersRegistry.registerUser(this.user);
        this.usersRegistry.registerUserSession(this.user.getUserName(), this.user.getSession());
        UserSession registeredUser = this.usersRegistry.getUserBySessionId(this.user.getSessionId());
        Assert.assertEquals((Object)this.user, (Object)registeredUser );
    }
    

    @Test
    public void removeUserFoundTest() {
        this.usersRegistry.registerUser(this.user);
        this.usersRegistry.registerUserSession(this.user.getUserName(), this.user.getSession());
        UserSession removedUser = this.usersRegistry.unregisterUser(this.userName);
        Assert.assertEquals((Object)this.user, (Object)removedUser);
        Assert.assertNull((Object)this.usersRegistry.unregisterUser(this.userName));
        Assert.assertNull((Object)this.usersRegistry.getUserByUserName(this.user.getUserName()));
        Assert.assertNull((Object)this.usersRegistry.getUserBySessionId(this.user.getSessionId()));
        Assert.assertFalse(this.usersRegistry.isThereAlreadyThisUser(this.userName));
    }

    @Test
    public void removeUserNotFoundTest() {
        UserSession removedUser = this.usersRegistry.unregisterUser(this.userName + "xxx");
        Assert.assertNull((Object)removedUser);
    }
}
