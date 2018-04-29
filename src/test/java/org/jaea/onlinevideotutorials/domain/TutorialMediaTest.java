package org.jaea.onlinevideotutorials.domain;

import org.jaea.onlinevideotutorials.mocks.WebSocketSessionMock;
import org.jaea.onlinevideotutorials.utilities.ParticipantSessionDispenser;
import static org.junit.Assert.assertNotNull;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.kurento.client.WebRtcEndpoint;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.socket.WebSocketSession;

@RunWith(value=SpringRunner.class)
public class TutorialMediaTest {
    
    private String userName = "angela.gossow";
    private Long id = new Long(1);
    private TutorialMedia media;
    private boolean initialize = false;
   
    
    @Before
    public void setUp() {
        if(! this.initialize){
            WebSocketSession ws = new WebSocketSessionMock(this.userName);
            this.media = new TutorialMedia(ParticipantSessionDispenser.PIPELINE_ROOM_TEST, ws, this.userName, this.id);
            this.initialize = true;
        }    
    }

    @Test
    public void receiveVideoFromMeTest() {
        WebRtcEndpoint wre = (WebRtcEndpoint)new WebRtcEndpoint.Builder(ParticipantSessionDispenser.PIPELINE_ROOM_TEST).build();
        String offer = wre.generateOffer();
        WebSocketSession ws = new WebSocketSessionMock(this.userName);
        User user = new User(this.userName, "tutor", "Angela Gossow", "zzz");
        ParticipantSession participant = new ParticipantSession(ws, user);
        participant.attachRoomMedia(this.media);
        String answer = null;
        try {
            answer = this.media.receiveVideoFrom(participant, offer);
        }
        catch (Exception e) {}
        finally {
            assertNotNull(answer);
        }
    }
    
    @Test
    public void receiveVideoFromOtherTest() {
        WebSocketSession ws1 = new WebSocketSessionMock(this.userName);
        User user1 = new User(this.userName, "tutor", "Angela Gossow", "zzz");
        ParticipantSession participant1 = new ParticipantSession(ws1, user1);
        participant1.attachRoomMedia(this.media);
        
        WebSocketSession ws2 = new WebSocketSessionMock("morgan.lander");
        TutorialMedia media2 = new TutorialMedia(ParticipantSessionDispenser.PIPELINE_ROOM_TEST, ws2, "morgan.lander", new Long(2));
        User user2 = new User("morgan.lander", "student", "Morgan Lander", "zzz");
        ParticipantSession participant2 = new ParticipantSession(ws2, user2);
        WebRtcEndpoint wre = (WebRtcEndpoint)new WebRtcEndpoint.Builder(ParticipantSessionDispenser.PIPELINE_ROOM_TEST).build();
        String offer = wre.generateOffer();
        participant2.attachRoomMedia(media2);
        String answer = null;
        try {
            answer = this.media.receiveVideoFrom(participant2, offer);
        }
        catch (Exception e) {}
        finally {
            assertNotNull(answer);
        }
    }
}
