/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jaea.onlinevideotutorials;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import java.io.Closeable;
import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import org.kurento.client.Continuation;
import org.kurento.client.EventListener;
import org.kurento.client.IceCandidate;
import org.kurento.client.MediaPipeline;
import org.kurento.client.OnIceCandidateEvent;
import org.kurento.client.WebRtcEndpoint;
import org.kurento.jsonrpc.JsonUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.WebSocketSession;

/**
 *
 * @author juanan
 */

/**
* It allows the communication of a participant with the others in a room.
*/
public class TutorialMedia implements Closeable{
    
    private final Logger log = LoggerFactory.getLogger(ParticipantSession.class);
    
    private String userName;
    
    private final MediaPipeline pipeline;
    private WebSocketSession session;

    private final WebRtcEndpoint outgoingMedia;
    private final ConcurrentMap<String, WebRtcEndpoint> incomingMediaByUserName = new ConcurrentHashMap<>();;


    public TutorialMedia(final MediaPipeline pipeline, final WebSocketSession session, final String userName){
        //Info.logInfoStart();
        log.info("");
        log.info("% TutorialMedia Constructor for user: {}", userName, Hour.getTime());
        
        this.userName = userName;
        this.session = session;
        this.pipeline = pipeline;
        log.info("@ Creating wbrtc");
        this.outgoingMedia = new WebRtcEndpoint.Builder(pipeline).build();
        log.info("# wbrtc created");

        this.addOnIceCandidateListenerToWebRtc(outgoingMedia, this.userName, this.session);
        
        Info.logInfoFinish("/ TutorialMedia");
    }

    private void addOnIceCandidateListenerToWebRtc(WebRtcEndpoint webRtc, final String userName, final WebSocketSession session){
        Info.logInfoStart("TutorialMedia.addOnIceCandidateListenerToWebRtc");
        webRtc.addOnIceCandidateListener(new EventListener<OnIceCandidateEvent>() {

                @Override
                public void onEvent(OnIceCandidateEvent event) {
                    Info.logInfoStart2("OnIceCandidateEvent");
                    JsonObject response = new JsonObject();
                    response.addProperty("id", "iceCandidate");
                    response.addProperty("userName", userName);
                    response.add("candidate",
                    JsonUtils.toJsonObject(event.getCandidate()));
                    synchronized (session) {
                        SendMessage.toClient(response, session);
                    }
                    Info.logInfoFinish2("OnIceCandidateEvent");
                }    
            });
         Info.logInfoFinish("TutorialMedia.addOnIceCandidateListenerToWebRtc");
    }
    
    public void addCandidate(JsonElement candidate, String userName) {
       // Info.logInfoStart();
        log.info("");
        log.info("{} TutorialMedia.addCandidate {} to {} {}", Info.START_SYMBOL, candidate.toString(), userName, Hour.getTime());
        JsonObject address = candidate.getAsJsonObject();
        IceCandidate cand = new IceCandidate(address.get("candidate").getAsString(),
                                        address.get("sdpMid").getAsString(),
					address.get("sdpMLineIndex").getAsInt());
        
        if (this.userName.compareTo(userName) == 0) {
            log.info("I'm going to add me an iceCandidate");
            outgoingMedia.addIceCandidate(cand);
	} 
        else {
            WebRtcEndpoint userWebRtc = this.incomingMediaByUserName.get(userName);
                if (userWebRtc != null) {
                    log.info("I'm going to add an iceCandidate to a participant");
                    userWebRtc.addIceCandidate(cand);
		}
	}
        
        Info.logInfoFinish("/ TutorialMedia.addCandidate");
    }
    
    public void receiveVideoFrom(ParticipantSession sender, JsonElement sdpOffer) throws IOException {
        log.info("{} TutorialMedia.receiveVideoFrom {} {}",Info.START_SYMBOL, sender.getUserName(), Hour.getTime());
        log.info("USER {}: connecting with {}", this.userName, sender.getUserName());
        log.trace("USER {}: SdpOffer for {} is {}", this.userName, sender.getUserName(), sdpOffer);
        
        String offer = sdpOffer.getAsString();
        
        WebRtcEndpoint senderWebRtc = this.getEndpointFromUser(sender);
	    final String ipSdpAnswer = senderWebRtc.processOffer(offer);
        
    	final JsonObject scParams = new JsonObject();
    	scParams.addProperty("id", "receiveVideoAnswer");
    	scParams.addProperty("userName", sender.getUserName());
    	scParams.addProperty("sdpAnswer", ipSdpAnswer);

    	log.trace("USER {}: SdpAnswer for {} is {}", this.userName, sender.getUserName(), ipSdpAnswer);
    	SendMessage.toClient(scParams, this.session);
    	log.debug("gather candidates");
    	senderWebRtc.gatherCandidates();

        Info.logInfoFinish("TutorialMedia.receiveVideoFrom");    
    }
    
    private WebRtcEndpoint getEndpointFromUser(final ParticipantSession sender) {
        //Info.logInfoStart();
        log.info("{} TutorialMedia.getEndpointFromUser {}",  Info.START_SYMBOL, sender.getUserName());
        
        WebRtcEndpoint incoming;

        if (sender.getUserName().equals(this.userName)) {
            log.info("I'm the PARTICIPANT {}: configuring loopback", this.userName);
            incoming = outgoingMedia;
	    }

        else {
        	log.info("PARTICIPANT {}: receiving video from {}", this.userName, sender.getUserName());

        	incoming = this.incomingMediaByUserName.get(sender.getUserName());
        	if (incoming == null) {
                    log.info("PARTICIPANT {}: creating new endpoint for {}", this.userName, sender.getUserName());
                    
                    incoming = new WebRtcEndpoint.Builder(pipeline).build();
                    this.addOnIceCandidateListenerToWebRtc(incoming, sender.getUserName(), this.session);
                    this.incomingMediaByUserName.put(sender.getUserName(), incoming);
            }
        }        

    	log.info("PARTICIPANT {}: obtained endpoint for {}", this.userName, sender.getUserName());
    	sender.connectToRemote(incoming);
        
        Info.logInfoFinish("TutorialMedia.getEndpointFromUser ");
        return incoming;
    }
    
    
    public void connectToRemote(WebRtcEndpoint incomingMedia) {
        this.outgoingMedia.connect(incomingMedia);
    }
    
    
    
    public void cancelVideoFrom(final ParticipantSession participant) {
        //Info.logInfoStart();
        log.info("{} TutorialMedia.cancelVideoFrom {} {}",  Info.START_SYMBOL, participant.getUserName(), Hour.getTime());
        
        this.cancelVideoFrom(participant.getUserName());
        
        Info.logInfoFinish("TutorialMedia.cancelVideoFrom");
    }

    public void cancelVideoFrom(final String participantUserName) {
	Info.logInfoStart("TutorialMedia.cancelVideoFrom");	
        log.info("PARTICIPANT {}: canceling video reception from {}", this.userName, participantUserName);
        log.info("PARTICIPANT {}: removing endpoint for {}", this.userName, participantUserName);
        
        final WebRtcEndpoint canceledWebRtc = this.incomingMediaByUserName.remove(participantUserName);
        this.disconnectToRemote(canceledWebRtc);
        this.releaseWebRtc(canceledWebRtc, participantUserName);
        
           
        Info.logInfoFinish("TutorialMedia.cancelVideoFrom");	
    }
    
    public void disconnectToRemote(WebRtcEndpoint incomingMedia) {
        Info.logInfoStart("TutorialMedia.disconnectToRemote");
        this.outgoingMedia.disconnect(incomingMedia);
    }

    private void releaseWebRtc(WebRtcEndpoint webRtc, final String userNameReleased) {
        
        //Info.logInfoStart();
        log.info("{} TutorialMedia.releaseWebRtc from {} {}",Info.START_SYMBOL, userNameReleased, Hour.getTime());
        final String  webRtcType;
        
        if (this.userName.equals(userNameReleased)){
            webRtcType = "outgoing";
        }
        else{
            webRtcType = "incoming";
        }
        webRtc.release(new Continuation<Void>() {

            @Override
            public void onSuccess(Void result) throws Exception {
                log.trace("PARTICIPANT {}: Released successfully {} EP for {}",
                    userName, webRtcType, userNameReleased);
            }

            @Override
            public void onError(Throwable cause) throws Exception {
                log.warn("PARTICIPANT {}: Could not release {} EP for {}",
                    userName, webRtcType, userNameReleased);
            }
        });
        
        Info.logInfoFinish("TutorialMedia.releaseWebRtc {}");
    }
    
    
    @Override
    public void close() throws IOException {
        
        Info.logInfoStart("RoomMEdia.close");
        log.info("PARTICIPANT {}: Releasing resources", this.userName);
        
        for (String remoteParticipantUserName : incomingMediaByUserName.keySet()) {

            log.trace("PARTICIPANT {}: Released incoming EP for {}", this.userName, remoteParticipantUserName);

            WebRtcEndpoint participantWebRtc = this.incomingMediaByUserName.get(remoteParticipantUserName);
            
            this.disconnectToRemote(participantWebRtc);
            this.releaseWebRtc(participantWebRtc, remoteParticipantUserName);
        }
        
        this.releaseWebRtc(this.outgoingMedia, this.userName);
        this.incomingMediaByUserName.clear();
        
        Info.logInfoFinish("TutorialMedia.close");
    }
}
