/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jaea.onlinevideotutorials;

import com.google.gson.JsonObject;
import java.io.IOException;
import org.kurento.client.Continuation;
import org.kurento.client.EventListener;
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
public class MediaUtilities {
    
    private static Logger log = LoggerFactory.getLogger(ParticipantSession.class);
     
    public static void sendMessageToClient(JsonObject message, WebSocketSession session){
        TextMessage textAnswer = new TextMessage(message.toString());
        
        try{
            log.info("Sending message: {} to {}", message.toString(), session.getId());
            session.sendMessage(textAnswer);
        }
        catch(IOException e){
            log.error("Sender: {}", session.getId());
        }
    }
    
    
    public static void releaseWebRtc(WebRtcEndpoint webRtc, final String webRtcAlias){
        
        webRtc.release(new Continuation<Void>() {

            @Override
            public void onSuccess(Void result) throws Exception {
                log.trace("Released successfully {}", webRtcAlias);
            }

            @Override
            public void onError(Throwable cause) throws Exception {
                log.warn("Could not release {}", webRtcAlias);
            }
        });
    }
    
    
    public static void addOnIceCandidateListenerToWebRtc(WebRtcEndpoint webRtc, final JsonObject onIceCandidateEventResponse, final WebSocketSession session){
        
        webRtc.addOnIceCandidateListener(new EventListener<OnIceCandidateEvent>() {

                @Override
                public void onEvent(OnIceCandidateEvent event) {
                    onIceCandidateEventResponse.add("candidate", 
                            JsonUtils.toJsonObject(event.getCandidate()));
                    synchronized (session) {
                        MediaUtilities.sendMessageToClient(onIceCandidateEventResponse, session);
                    }
                }    
            });
    }
}
