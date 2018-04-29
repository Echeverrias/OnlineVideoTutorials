package org.jaea.onlinevideotutorials.domain;

import org.jaea.onlinevideotutorials.utilities.ParticipantSessionDispenser;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.kurento.client.MediaPipeline;
import org.kurento.client.WebRtcEndpoint;
import org.springframework.test.context.junit4.SpringRunner;


@RunWith(value=SpringRunner.class)
public class ParticipantSessionTest {
    
    private ParticipantSession participant;
    private Long roomId = new Long(1);

    @Before
    public void setUpBefore() {
        this.participant = ParticipantSessionDispenser.getStudentParticipant((String)"angela.gossow", (MediaPipeline)ParticipantSessionDispenser.PIPELINE_ROOM_TEST, roomId);
    }

    @Test
    public void receivesGreetingsFromTest() {
        ParticipantSession participant2 = ParticipantSessionDispenser.getStudentParticipant((String)"doro.pesch", (MediaPipeline)ParticipantSessionDispenser.PIPELINE_ROOM_TEST, roomId);
        WebRtcEndpoint wre = (WebRtcEndpoint)new WebRtcEndpoint.Builder(ParticipantSessionDispenser.PIPELINE_ROOM_TEST).build();
        String offer = wre.generateOffer();
        Assert.assertNotNull((Object)this.participant.receivesGreetingsFrom(participant2, offer));
    }
}
