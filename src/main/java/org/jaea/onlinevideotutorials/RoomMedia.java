/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jaea.onlinevideotutorials;

import com.google.gson.JsonObject;
import java.io.Closeable;
import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.logging.Level;
import org.kurento.client.Continuation;
import org.kurento.client.EventListener;
import org.kurento.client.IceCandidate;
import org.kurento.client.MediaPipeline;
import org.kurento.client.OnIceCandidateEvent;
import org.kurento.client.WebRtcEndpoint;
import org.kurento.jsonrpc.JsonUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

/**
 *
 * @author juanan
 */
public class RoomMedia implements Closeable{
    
    private final Logger log = LoggerFactory.getLogger(UserSession.class);
    
    private String roomName;
    private String userName;
    
    private final MediaPipeline pipeline;
    private WebSocketSession session;

	
    private final WebRtcEndpoint outgoingMedia;
    private final ConcurrentMap<String, WebRtcEndpoint> incomingMedia = new ConcurrentHashMap<>();;

    
    public RoomMedia(final MediaPipeline pipeline, String roomName, final WebSocketSession session, final String userName){
        Info.logInfoStart();
        log.info("% RoomMedia");
        
        this.roomName = roomName;
        this.userName = userName;
        this.session = session;
        this.pipeline = pipeline;
        
        log.info("@ Creating wbrtc");
        this.outgoingMedia = new WebRtcEndpoint.Builder(pipeline).build();
        log.info("# wbrtc created");

        this.addOnIceCandidateListenerToWebRtc(outgoingMedia, this.userName, this.session);
        
        log.info(   "Creating user: {}", userName);
         Info.logInfoFinish("/ RoomMedia");
        
    }

    
    
    public String getRoomName() {
        return this.roomName;
    }
    
    public void setRoomName (String roomName){
        this.roomName = roomName;
    }
    
    
    
    public WebRtcEndpoint getOutgoingMedia(){
        return this.outgoingMedia;
    }
    
    
    private void addOnIceCandidateListenerToWebRtc(WebRtcEndpoint webRtc, final String userName, final WebSocketSession session){
        Info.logInfoStart("RoomMedia.addOnIceCandidateListenerToWebRtc");
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
         Info.logInfoFinish("RoomMedia.addOnIceCandidateListenerToWebRtc");
    }
    
    
    public void addCandidate(IceCandidate candidate, String userName) {
        Info.logInfoStart();
        log.info("{} RoomMedia.addCandidate {} to {}", Info.START_SYMBOL, candidate.toString(), userName);
        if (this.userName.compareTo(userName) == 0) {
            outgoingMedia.addIceCandidate(candidate);
	} 
        else {
            WebRtcEndpoint userWebRtc = this.incomingMedia.get(userName);
                if (userWebRtc != null) {
                    userWebRtc.addIceCandidate(candidate);
		}
	}
        
        Info.logInfoFinish("Roomedia.addCandidate");
    }
    
    
    /**
	 * @param sender
	 * @param sdpOffer
	 * @throws IOException
    */
    public void receiveVideoFrom(UserSession sender, String sdpOffer) throws IOException {
        Info.logInfoStart();
        log.info("{} RoomMedia.receiveVideoFrom {}: ",Info.START_SYMBOL, sender.getName());
        log.info("USER {}: connecting with {} in room {}", this.userName, sender.getName(), this.roomName);

        log.trace("USER {}: SdpOffer for {} is {}", this.userName, sender.getName(), sdpOffer);
        
        WebRtcEndpoint senderWebRtc = this.getEndpointFromUser(sender);
	final String ipSdpAnswer = senderWebRtc.processOffer(sdpOffer);
        
	final JsonObject scParams = new JsonObject();
	scParams.addProperty("id", "receiveVideoAnswer");
	scParams.addProperty("userName", sender.getUserName());
	scParams.addProperty("sdpAnswer", ipSdpAnswer);

	log.trace("USER {}: SdpAnswer for {} is {}", this.userName, sender.getUserName(), ipSdpAnswer);
	SendMessage.toClient(scParams, this.session);
	log.debug("gather candidates");
	senderWebRtc.gatherCandidates();
        Info.logInfoFinish("RoomMedia.receiveVideoFrom");    
       
	}
    
    
    /**
    * @param sender
    *            the user
    * @return the endpoint used to receive media from a certain user
    */
    private WebRtcEndpoint getEndpointFromUser(final UserSession sender) {
        Info.logInfoStart();
        log.info("{} RoomMedia.getEndpointFromUser {}",  Info.START_SYMBOL, sender.getUserName());
        if (sender.getUserName().equals(this.userName)) {
            log.debug("PARTICIPANT {}: configuring loopback", this.userName);
            return outgoingMedia;
	}

	log.debug("PARTICIPANT {}: receiving video from {}", this.userName, sender.getUserName());

	WebRtcEndpoint incoming = this.incomingMedia.get(sender.getUserName());
	if (incoming == null) {
            log.debug("PARTICIPANT {}: creating new endpoint for {}", this.userName, sender.getUserName());
            incoming = new WebRtcEndpoint.Builder(pipeline).build();
            
            this.addOnIceCandidateListenerToWebRtc(incoming, sender.getUserName(), this.session);
            
            this.incomingMedia.put(sender.getUserName(), incoming);
        }

	log.debug("PARTICIPANT {}: obtained endpoint for {}", this.userName, sender.getUserName());
	sender.getRoomMedia().getOutgoingMedia().connect(incoming);
        
        Info.logInfoFinish("RoomMedia.getEndpointFromUser ");
        return incoming;
    }
    
    
    
    
    
    /**
    * @param participant
    *            the participant
    */
    public void cancelVideoFrom(final UserSession participant) {
        Info.logInfoStart();
        log.info("{} RoomMedia.cancelVideoFrom {}",  Info.START_SYMBOL, participant.getUserName());
        this.cancelVideoFrom(participant.getUserName());
        Info.logInfoFinish("RoomMedia.cancelVideoFrom");
    }

    /**
    * @param participantUserName
    *            the participant
    */
    public void cancelVideoFrom(final String participantUserName) {
	Info.logInfoStart("RoomMedia.cancelVideoFrom");	
        log.debug("PARTICIPANT {}: canceling video reception from {}", this.userName, participantUserName);
        
        final WebRtcEndpoint canceledWebRtc = this.incomingMedia.remove(participantUserName);
        log.debug("PARTICIPANT {}: removing endpoint for {}", this.userName, participantUserName);
	
        this.releaseWebRtc(canceledWebRtc, participantUserName);
           
        Info.logInfoFinish("RoomMedia.cancelVideoFrom");	
    }
    
    
    
    
    @Override
    public void close() throws IOException {
        
        Info.logInfoStart("RoomMEdia.close");
        log.debug("PARTICIPANT {}: Releasing resources", this.userName);
        
        for (final String remoteParticipantUserName : incomingMedia.keySet()) {

            log.trace("PARTICIPANT {}: Released incoming EP for {}", this.userName, remoteParticipantUserName);

            final WebRtcEndpoint participantWebRtc = this.incomingMedia.get(remoteParticipantUserName);

            this.releaseWebRtc(participantWebRtc, remoteParticipantUserName);
	}
        
        this.releaseWebRtc(this.outgoingMedia, this.userName);
        
        this.incomingMedia.clear();
        
        Info.logInfoFinish("RoomMedia.close");
        
		
    }
    
    private void releaseWebRtc(WebRtcEndpoint webRtc, final String userNameReleased) {
        
        Info.logInfoFinish();
        log.info("{} RoomMedia.releaseWebRtc from {}",Info.START_SYMBOL, userNameReleased);
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
        
        Info.logInfoFinish("RoomMedia.releaseWebRtc");
    }
    
}
