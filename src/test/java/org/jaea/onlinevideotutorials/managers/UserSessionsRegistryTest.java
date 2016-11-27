package org.jaea.onlinevideotutorials.managers;

import org.jaea.onlinevideotutorials.domain.UserSession;
import org.jaea.onlinevideotutorials.utilities.ParticipantSessionDispenser;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;


@RunWith(value=SpringRunner.class)
public class UserSessionsRegistryTest {
    UserSessionsRegistry usersRegistry;
    UserSession user;
    String userName = "angela.gossow";

    @Before
    public void setUpBefore() {
        this.user = ParticipantSessionDispenser.getTutorUser((String)this.userName);
        this.usersRegistry = new UserSessionsRegistry();
        this.usersRegistry.addUser(this.user);
    }

    @Test
    public void removeUserFoundTest() {
        UserSession removedUser = this.usersRegistry.removeUser(this.userName);
        Assert.assertEquals((Object)this.user, (Object)removedUser);
        Assert.assertNull((Object)this.usersRegistry.removeUser(this.userName));
    }

    @Test
    public void removeUserNotFoundTest() {
        UserSession removedUser = this.usersRegistry.removeUser(this.userName + "xxx");
        Assert.assertNull((Object)removedUser);
    }
}
