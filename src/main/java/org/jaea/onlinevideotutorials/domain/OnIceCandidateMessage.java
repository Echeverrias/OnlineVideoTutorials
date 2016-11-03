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
public class OnIceCandidateMessage {
    
    
    public static synchronized JsonObject getMessage(String userName, IceCandidate candidate){
        JsonObject response = new JsonObject();
        response.addProperty("id", "iceCandidate-" + userName);
        response.addProperty("userName", userName);
        response.add("candidate", JsonUtils.toJsonObject(candidate));
        
        return response;
    }
    
}
