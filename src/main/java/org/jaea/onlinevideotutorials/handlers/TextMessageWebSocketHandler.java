/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jaea.onlinevideotutorials.handlers;


import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonElement;
import com.google.gson.JsonPrimitive;
import java.lang.reflect.Type;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.jaea.onlinevideotutorials.domain.Room;
/**
 *
 * @author juanan
 */
public abstract class TextMessageWebSocketHandler extends TextWebSocketHandler {
    
    private final Logger log = LoggerFactory.getLogger(TextMessageWebSocketHandler.class);

     /**
     * Name of the message payload attribute that tells 
     * how handle the message.
     */
    private String attributeNameOfTheMessageId;
     
    /**
     * Name of the message payload attribute that has 
     * the information.
     */
    private String attributeNameOfTheMessagePayload;
    
    protected static final String ID_CLOSE_TAB = "closeTab";

    private Gson gson = new GsonBuilder().create();
    
    protected TextMessageWebSocketHandler(){};
    protected TextMessageWebSocketHandler(String attributeNameOfTheMessageId, String attributeNameOfTheMessagePayload){
        this.attributeNameOfTheMessageId = attributeNameOfTheMessageId;
        this.attributeNameOfTheMessagePayload = attributeNameOfTheMessagePayload;
    }
    
    abstract public void handleTextMessage(WebSocketSession session, TextMessage message)  throws Exception;

    public String getAttributeNameOfTheMessageId(){
        return this.attributeNameOfTheMessageId;
    }

    public String getAttributeNameOfTheMessagePayload(){
        return this.attributeNameOfTheMessagePayload;
    }

    protected String getTextMessageId(TextMessage message) {
        //this.log.info("TextMessageWebSocketHandler.getTextMessageId()");
        JsonObject jsonMessage = this.gson.fromJson(message.getPayload(), JsonObject.class);
        //this.log.info("jsonMessage: {}", jsonMessage.toString());
        //this.log.info("###1");
        String id = null;
        try {
            //this.log.info("get attribute: {}", this.attributeNameOfTheMessageId);
            id = jsonMessage.get(this.attributeNameOfTheMessageId).getAsString(); 
            //this.log.info("###2 id: {}", id);
        }
        catch (Exception e){
            this.log.info("ERROR: {}", e.getMessage());
            this.log.info("message: {}", jsonMessage.toString());
            id = "";
        }
        return id;
    }
    
    protected JsonObject getTextMessagePayLoad(TextMessage message){

        JsonObject jsonMessage = this.gson.fromJson(message.getPayload(), JsonObject.class);
        JsonObject payload = null;
        try {
            payload = jsonMessage.getAsJsonObject(this.attributeNameOfTheMessagePayload); 
        }
        catch (Exception e){
            payload = new JsonObject();
        }
        return payload;
      
    }

    protected Object getTextMessagePayLoadAsObject(Type dataType, TextMessage message){
        
                JsonObject jsonMessage = this.gson.fromJson(message.getPayload(), JsonObject.class);
                JsonObject payload = null;
                try {
                    payload = jsonMessage.getAsJsonObject(this.attributeNameOfTheMessagePayload); 
                }
                catch (Exception e){
                    payload = new JsonObject();
                }
                Object data = null;
                try {
                    data = this.gson.fromJson(payload, dataType);
                }
                catch(Exception e){
                    this.log.info("ERROR:{}", e.getMessage());
                }  
                return data;
              
            }


        protected String getTextMessagePayLoadAsString(TextMessage message){
                
            JsonObject jsonMessage = this.gson.fromJson(message.getPayload(), JsonObject.class);
            this.log.info("jsonMessage: {}", jsonMessage.toString());
            String payload = null;
            try {
                payload = jsonMessage.get("payload").getAsString(); 
            }
            catch (Exception e){
                this.log.info("ERROR:{}", e.getMessage());
            }  
            return payload;
        }        

    protected String getTextMessagePayLoadData(String dataName, TextMessage message){
        JsonObject payload = this.getTextMessagePayLoad(message);
        return payload.get(dataName).getAsString();
    }

    protected Object getTextMessagePayLoadDataAsObject(String dataName, Type dataType, TextMessage message){
        this.log.info("TextMessageWebSocketHandler.getTextMessagePayLoadDataAsObject()");
        JsonObject payload = this.getTextMessagePayLoad(message);
        this.log.info("payload: {}", payload.toString());
        
        try{
            JsonObject rawData = payload.getAsJsonObject(dataName);
            this.log.info("{}: {}", dataName, rawData.toString());
        }
        catch(Exception e){
            this.log.info("!!!!! ERROR #1: {}", e.getMessage());
        }   
        /* 
        try{
            JsonElement rawData2 = payload.get(dataName);
            this.log.info("data2: {}", rawData2.toString());
        }
        catch(Exception e){
            this.log.info("ERROR #2: {}", e.getMessage());
        }   
        try{//ERROR
            JsonPrimitive rawData3 = payload.getAsJsonPrimitive(dataName);
            this.log.info("data3: {}", rawData3.toString());
        }
        catch(Exception e){
            this.log.info("ERROR #3: {}", e.getMessage());
        }    
        */
        Object data = null;
        
        this.log.info("###");
        try {
            //data = this.gson.fromJson(payload.getAsJsonObject(dataName), Object.class);
            data = this.gson.fromJson(payload.getAsJsonObject(dataName), dataType);
        }
        catch (Exception e){
            this.log.info("ERROR - Gson.fromJson({}, {}):{}", dataName, dataType.toString(), e.getMessage());
        }
        this.log.info("#########");
        return data;
    }

    protected String getTextMessagePayLoadData(String dataName, String subDataName, TextMessage message){
        JsonObject payload = this.getTextMessagePayLoad(message);
        JsonObject attribute = payload.getAsJsonObject(dataName); 
        return attribute.get(subDataName).getAsString();
    }
}