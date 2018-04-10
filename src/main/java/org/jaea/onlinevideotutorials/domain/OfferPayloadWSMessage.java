/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jaea.onlinevideotutorials.domain;

import com.google.gson.JsonObject;
import org.kurento.client.IceCandidate;
import org.kurento.jsonrpc.JsonUtils;

/**
 *
 * @author juanan
 */
public class OfferPayloadWSMessage {
    
    @Exclude
    private final static String ID_PREFIX_RECEIVE_VIDEO_ANSWER = "receiveVideoAnswer-"; 
    
    public Long roomId;
    public String userName;
    public String offerSdp;
    public String answerSdp;

    public OfferPayloadWSMessage(Long roomId, String userName, String offerSdp){
        this.roomId = roomId;
        this.userName = userName;
        this.offerSdp = offerSdp;
    }

    public OfferPayloadWSMessage(String answerSdp, String userName, Long roomId){
        this.answerSdp = answerSdp;
        this.userName = userName;
        this.roomId = roomId;   
    }

    public String getIdForWsMessage(){
        return ID_PREFIX_RECEIVE_VIDEO_ANSWER + userName;
    }

    public Long getRoomId(){
        return this.roomId;
    }

    public String getUserName(){
        return this.userName;
    }

    public String getOfferSdp(){
        return this.offerSdp;
    }

    public String getAnswerSdp(){
        return this.answerSdp;
    }

    public void setAnswerSdp(String answerSdp){
        this.answerSdp = answerSdp;
    }
    

}
