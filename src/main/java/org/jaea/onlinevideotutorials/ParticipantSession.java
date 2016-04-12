/*
 * (C) Copyright 2015 Kurento (http://kurento.org/)
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Lesser General Public License
 * (LGPL) version 2.1 which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/lgpl-2.1.html
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 */
package org.jaea.onlinevideotutorials;

import com.google.gson.JsonObject;
import java.io.IOException;
import java.util.logging.Level;
import org.kurento.client.IceCandidate;
import org.kurento.client.WebRtcEndpoint;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.WebSocketSession;


public class ParticipantSession  extends UserSession{
    
    private TutorialMedia tutorialMedia; 
    
   
    public ParticipantSession(WebSocketSession session, String userName, String userType, String name){
        super(session, userName, userType, name);
    
    }
    
    public ParticipantSession(UserSession user){
        super(user);
    }
    
    public void assignRoomMedia (TutorialMedia tutorialMedia){
        Info.logInfoStart("* User.assignRoomMedia: " + this.getUserName());
        
        this.tutorialMedia = tutorialMedia;
        
        Info.logInfoFinish("/ User.assignRoomMedia");
    }
    
    public void addCandidate(IceCandidate candidate, String userName) {
        this.tutorialMedia.addCandidate(candidate, userName);
    }
    
    public void receivesGreetingsFrom(ParticipantSession participant, String sdpOffer){
        log.info("{} User.receivesGreetingsFrom {} from {} {}", this.getUserName(), participant.getUserName(), sdpOffer, Hour.getTime());
        
        try {
            this.tutorialMedia.receiveVideoFrom(participant, sdpOffer);
        } catch (IOException ex) {
            java.util.logging.Logger.getLogger(ParticipantSession.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        Info.logInfoFinish("User.receivesGreetingsFrom");
    }
    
    public void connectToRemote(WebRtcEndpoint incomingMedia) {
        this.tutorialMedia.connectToRemote(incomingMedia);
    }
    
    public void receivesFarewellFrom(String userName){
        log.info("{} User.receivesFarewellFrom: {} from {} {}",Info.START_SYMBOL, this.getUserName(), userName, Hour.getTime());
        
        this.tutorialMedia.cancelVideoFrom(userName);
        
        Info.logInfoFinish("User.receivesFarewellFrom");
    }
    
    public void leavesRoom(){
        
        log.info("{} User.leavesRoom: {} - {} {}", Info.START_SYMBOL, this.getUserName(), this.tutorialMedia.getRoomName(), Hour.getTime());
        try {
            this.tutorialMedia.close();
        } catch (IOException ex) {
            java.util.logging.Logger.getLogger(ParticipantSession.class.getName()).log(Level.SEVERE, null, ex);
        
        }
        Info.logInfoFinish("User.leavesRoom");
    }
    
    

}
