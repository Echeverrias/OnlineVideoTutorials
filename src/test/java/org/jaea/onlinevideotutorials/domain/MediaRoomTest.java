package org.jaea.onlinevideotutorials.domain;

import org.jaea.onlinevideotutorials.utilities.MediaRoomMookDispenser;
import org.jaea.onlinevideotutorials.utilities.ParticipantSessionDispenser;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@RunWith(value=SpringRunner.class)
public class MediaRoomTest {
    private final Logger log = LoggerFactory.getLogger(Room.class);
    private MediaRoom room;
    private static String tutorUserName = "angela.gossow";
    static ParticipantSession studentParticipant;
    static ParticipantSession tutorParticipant;
    private String roomName = "room";
    private boolean initialize = false;

    @Before
    public void setUp() {
        if(!initialize){
            
        studentParticipant = ParticipantSessionDispenser.getStudentParticipant((String)"doro.pesch");
        tutorParticipant = ParticipantSessionDispenser.getTutorParticipant((String)tutorUserName);
        this.room = MediaRoomMookDispenser.getMediaRoom(roomName, tutorUserName);
        initialize = true;
        
        }
    }

    @Before
    public void setUpBefore() {
        
    }

    @Test
    public void addAParticipant_leaveTest() {
        this.room.addParticipant(tutorParticipant);
        Assert.assertEquals((Object)tutorParticipant, (Object)this.room.getParticipant(tutorParticipant.getUserName()));
        
        Assert.assertEquals((Object)tutorParticipant, (Object)this.room.leave(tutorParticipant.getUserName()));
        Assert.assertNull((Object)this.room.leave(tutorParticipant.getUserName()));
        Assert.assertTrue(this.room.getParticipantsNumber() == 0);
    }
    
    @Test
    public void leaveTest() {
        this.room.addParticipant(studentParticipant);
        Assert.assertEquals((Object)studentParticipant, (Object)this.room.leave(studentParticipant.getUserName()));
        Assert.assertNull((Object)this.room.leave(studentParticipant.getUserName()));
    }
    
    @Test
    public void getParticipantsNumber_addingTheSameParticipantTest() {
        this.room.addParticipant(tutorParticipant);
        this.room.addParticipant(tutorParticipant);
        this.room.addParticipant(tutorParticipant);
        this.room.addParticipant(studentParticipant);
        Assert.assertTrue(2 == this.room.getParticipantsNumber());
        Assert.assertEquals((Object)tutorParticipant, (Object)this.room.leave(tutorParticipant.getUserName()));
        Assert.assertNull((Object)this.room.leave(tutorParticipant.getUserName()));
        
        this.room.leave(tutorParticipant.getUserName());
        this.room.leave(studentParticipant.getUserName());
        Assert.assertEquals((long)0, (long)this.room.getParticipantsNumber());
    }
    
    @Test
    public void getParticipantsNumberEqualsZeroTest() {
        Assert.assertEquals((long)0, (long)this.room.getParticipantsNumber());
        this.room.addParticipant(studentParticipant);
        this.room.leave(studentParticipant.getUserName());
        Assert.assertEquals((long)0, (long)this.room.getParticipantsNumber());
    }
    
    

    @Test
    public void isATutorRightByParticipantTest() {
        this.room.addParticipant(tutorParticipant);
        Assert.assertTrue((boolean)this.room.isTheTutor(tutorParticipant.getUserName()));
        
        this.room.leave(tutorParticipant.getUserName());
    }


    
    @Test
    public void isATutorWrongByUserNameTest() {
        this.room.addParticipant(studentParticipant);
        Assert.assertFalse((boolean)this.room.isTheTutor(studentParticipant.getUserName()));
        
        this.room.leave(studentParticipant.getUserName());
    }


    

    
}
