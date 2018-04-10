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
public class IceCandidatePayloadWSMessage {
    
    @Exclude
    private final static String ID_PREFIX_ICE_CANDIDATE = "iceCandidate-";
    
    public Long roomId;
    public String userName;
    public IceCandidate iceCandidate;

    public IceCandidatePayloadWSMessage(Long roomId, String userName, IceCandidate iceCandidate){
        this.roomId = roomId;
        this.userName = userName;
        this.iceCandidate = iceCandidate;
    }

    public String getIdForWsMessage(){
        return ID_PREFIX_ICE_CANDIDATE + userName;
    }

    public Long getRoomId(){
        return this.roomId;
    }

    public String getUserName(){
        return this.userName;
    }

    public IceCandidate getIceCandidate(){
        return this.iceCandidate;
    }
    

}
