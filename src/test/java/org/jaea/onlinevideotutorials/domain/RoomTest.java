package org.jaea.onlinevideotutorials.domain;

import org.jaea.onlinevideotutorials.utilities.ParticipantSessionDispenser;
import org.junit.Assert;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.test.context.junit4.SpringRunner;


@RunWith(value=SpringRunner.class)
public class RoomTest {
    private final Logger log = LoggerFactory.getLogger(Room.class);
    private Room room;
    static ParticipantSession studentParticipant;
    static ParticipantSession tutorParticipant;

    @BeforeClass
    public static void setUpParticipantsBefore() {
        studentParticipant = ParticipantSessionDispenser.getStudentParticipant((String)"doro.pesch");
        tutorParticipant = ParticipantSessionDispenser.getTutorParticipant((String)"angela.gossow");
    }

    @Before
    public void setUpBefore() {
        this.room = new Room("room", ParticipantSessionDispenser.PIPELINE_ROOM_TEST);
    }

    @Test
    public void addAParticipantTest() {
        this.room.addParticipant(tutorParticipant);
        Assert.assertEquals((Object)tutorParticipant, (Object)this.room.getParticipant(tutorParticipant.getUserName()));
    }

    @Test
    public void isATutorRightByParticipantTest() {
        this.room.addParticipant(tutorParticipant);
        Assert.assertTrue((boolean)this.room.isTheTutor(tutorParticipant.getUserName()));
    }

    @Test
    public void isATutorRightByUserNameTest() {
        this.room.addParticipant(tutorParticipant);
        Assert.assertTrue((boolean)this.room.isTheTutor(tutorParticipant.getUserName()));
    }

    @Test
    public void isATutorWrongtByParticipantTest() {
        this.room.addParticipant(studentParticipant);
        Assert.assertFalse((boolean)this.room.isTheTutor(studentParticipant.getUserName()));
    }

    @Test
    public void isATutorWrongByUserNameTest() {
        this.room.addParticipant(studentParticipant);
        Assert.assertFalse((boolean)this.room.isTheTutor(studentParticipant.getUserName()));
    }

    @Test
    public void leaveTest() {
        this.room.addParticipant(studentParticipant);
        Assert.assertEquals((Object)studentParticipant, (Object)this.room.leave(studentParticipant.getUserName()));
        Assert.assertNull((Object)this.room.leave(studentParticipant.getUserName()));
    }

    @Test
    public void getParticipantsNumberEqualsZeroTest() {
        Assert.assertEquals((long)0, (long)this.room.getParticipantsNumber());
        this.room.addParticipant(studentParticipant);
        this.room.leave(studentParticipant.getUserName());
        Assert.assertEquals((long)0, (long)this.room.getParticipantsNumber());
    }

    @Test
    public void getParticipantsNumberEqualsOneTest() {
        this.room.addParticipant(studentParticipant);
        Assert.assertEquals((long)1, (long)this.room.getParticipantsNumber());
    }
}
