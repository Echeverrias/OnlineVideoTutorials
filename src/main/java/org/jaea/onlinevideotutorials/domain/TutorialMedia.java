/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jaea.onlinevideotutorials.domain;

import com.google.gson.JsonObject;
import java.io.Closeable;
import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import org.jaea.onlinevideotutorials.Hour;
import org.jaea.onlinevideotutorials.Info;
import org.jaea.onlinevideotutorials.SendMessage;
import org.kurento.client.Continuation;
import org.kurento.client.EventListener;
import org.kurento.client.IceCandidate;
import org.kurento.client.MediaPipeline;
import org.kurento.client.OnIceCandidateEvent;
import org.kurento.client.WebRtcEndpoint;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.WebSocketSession;


import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 *
 * @author juanan
 */

/**
* It allows the communication of a participant with the others in a room.
*/
public class TutorialMedia implements Closeable{
    
    private final Logger log = LoggerFactory.getLogger(TutorialMedia.class);
    
    public String TutorialMediaprueba;

    @Exclude
    @JsonIgnore
    public String tutorialMediaPrueba2;

    private Long roomId;
    private String userName;
    
    private final MediaPipeline pipeline;
    private WebSocketSession session;

    private final WebRtcEndpoint outgoingMedia;
    private final ConcurrentMap<String, WebRtcEndpoint> incomingMediaByUserName = new ConcurrentHashMap<>();;

    
    public TutorialMedia(final MediaPipeline pipeline, final WebSocketSession session, final String userName, final Long roomId){
        //Info.logInfoStart();
        log.info("");
        log.info("% TutorialMedia Constructor for user: {}", userName, Hour.getTime());
        
        this.roomId = roomId;
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
       // Info.logInfoStart("TutorialMedia.addOnIceCandidateListenerToWebRtc");
        webRtc.addOnIceCandidateListener(new EventListener<OnIceCandidateEvent>() {

                @Override
                public void onEvent(OnIceCandidateEvent event) {
                    //Info.logInfoStart2("OnIceCandidateEvent");
                    IceCandidatePayloadWSMessage icpwsm = new IceCandidatePayloadWSMessage(roomId, userName, event.getCandidate());
                    synchronized (session) {
                        WSMessage msg = new WSMessage(icpwsm.getIdForWsMessage(), icpwsm);
                        SendMessage.toClient(msg, session);
                    }
                 //   Info.logInfoFinish2("OnIceCandidateEvent");
                }    
            });
       //  Info.logInfoFinish("TutorialMedia.addOnIceCandidateListenerToWebRtc");
    }
    
    public void addCandidate(IceCandidate iceCandidate, ParticipantSession participant) {
       // Info.logInfoStart();
      //  log.info("");
      //  log.info("{} TutorialMedia.addCandidate {} to {} {}", Info.START_SYMBOL, candidate.toString(), userName, Hour.getTime());
       /*
        IceCandidate cand = new IceCandidate( candidate.get("candidate").getAsString(),
                                              candidate.get("sdpMid").getAsString(),
					                          candidate.get("sdpMLineIndex").getAsInt()
                                              );
       
        */                                      
       WebRtcEndpoint userWebRtc = this.getEndpointFromUser(participant);
        userWebRtc.addIceCandidate(iceCandidate);
	
        
      //  Info.logInfoFinish("/ TutorialMedia.addCandidate");
    }
    
    public String receiveVideoFrom(ParticipantSession sender, String offer) throws IOException {
        log.info("{} TutorialMedia.receiveVideoFrom {} {}",Info.START_SYMBOL, sender.getUserName(), Hour.getTime());
        log.info("USER {}: connecting with {}", this.userName, sender.getUserName());
        log.trace("USER {}: SdpOffer for {} is {}", this.userName, sender.getUserName(), offer);
        
        WebRtcEndpoint senderWebRtc = this.getEndpointFromUser(sender);
        sender.connectToRemote(senderWebRtc); 
	    final String ipSdpAnswer = senderWebRtc.processOffer(offer);
        
        log.debug("gather candidates");
    	senderWebRtc.gatherCandidates();
        Info.logInfoFinish("TutorialMedia.receiveVideoFrom");  
        
        return ipSdpAnswer;
    }
    
    private WebRtcEndpoint getEndpointFromUser(final ParticipantSession participant) {
        //Info.logInfoStart();
       // log.info("{} TutorialMedia.getEndpointFromUser {}",  Info.START_SYMBOL, participant.getUserName());
        
        WebRtcEndpoint incoming;

        if (participant.getUserName().equals(this.userName)) {
          //  log.info("I'm the PARTICIPANT {}: configuring loopback", this.userName);
            incoming = outgoingMedia;
	    }

        else{
        	//log.info("PARTICIPANT {}: receiving video from {}", this.userName, participant.getUserName());
            incoming = this.incomingMediaByUserName.get(participant.getUserName());
            if (incoming == null) {
                 //   log.info("PARTICIPANT {}: creating new endpoint for {}", this.userName, participant.getUserName());
                incoming = new WebRtcEndpoint.Builder(pipeline).build();
                this.addOnIceCandidateListenerToWebRtc(incoming, participant.getUserName(), this.session);
                this.incomingMediaByUserName.put(participant.getUserName(), incoming);
            }
        }        

    //	log.info("PARTICIPANT {}: obtained endpoint for {}", this.userName, participant.getUserName());
    	//Info.logInfoFinish("TutorialMedia.getEndpointFromUser ");
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
        log.info("{} has disconnected {}", this.userName, participantUserName);
        this.releaseWebRtc(canceledWebRtc, participantUserName);
        
           
        Info.logInfoFinish("TutorialMedia.cancelVideoFrom");	
    }
    
    public void disconnectToRemote(WebRtcEndpoint incomingMedia) {
        Info.logInfoStart("TutorialMedia.disconnectToRemote");
        log.info("I,m {} and i'm going to disconnect the incoming:", this.userName);
        log.info(incomingMedia.toString());
        try{
            this.outgoingMedia.disconnect(incomingMedia);
        }
        catch(Exception e){
            log.info("ERROR while try to disconnect a webRtcEndpoint");
        }    
        Info.logInfoFinish("TutorialMedia.disconnectToRemote");
    }

    private void releaseWebRtc(WebRtcEndpoint webRtc, final String userNameReleased) {
        
        //Info.logInfoStart();
        log.info("{} TutorialMedia.releaseWebRtc from {} to {}",Info.START_SYMBOL, this.userName, userNameReleased);
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
                log.info("PARTICIPANT {}: Released successfully {} EP for {}",
                    userName, webRtcType, userNameReleased);
            }

            @Override
            public void onError(Throwable cause) throws Exception {
                log.warn("PARTICIPANT {}: Could not release {} EP for {}",
                    userName, webRtcType, userNameReleased);
                log.info("PARTICIPANT {}: Could not release {} EP for {}",
                    userName, webRtcType, userNameReleased);
            }
        });
        log.info("/ TutorialMedia.releaseWebRtc");
        Info.logInfoFinish("TutorialMedia.releaseWebRtc {}");
    }
    
    
    @Override
    public void close() throws IOException {
        
        Info.logInfoStart("TutorialMedia.close");
        log.info("I'M PARTICIPANT {}: Releasing resources", this.userName);
        
        for (String remoteParticipantUserName : incomingMediaByUserName.keySet()) {
            log.info("I'm going to say googbye to: {}", remoteParticipantUserName);
            log.trace("PARTICIPANT {}: Released incoming EP for {}", this.userName, remoteParticipantUserName);

            WebRtcEndpoint participantWebRtc = this.incomingMediaByUserName.get(remoteParticipantUserName);
            
            this.disconnectToRemote(participantWebRtc);
            this.releaseWebRtc(participantWebRtc, remoteParticipantUserName);
        }
        
        log.info("I'm {} and I'm going to finish myself", this.userName);
        this.releaseWebRtc(this.outgoingMedia, this.userName);
        this.incomingMediaByUserName.clear();
        
        Info.logInfoFinish("TutorialMedia.close");
    }
}
