package org.jaea.onlinevideotutorials.domain;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.annotations.Expose;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class WebSocketMessage{

   private final Logger log = LoggerFactory.getLogger(WebSocketMessage.class);

   private Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();

    @Expose
    private String id;

    @Expose
    private Object payload;

    @Expose
    private String error;

    public WebSocketMessage(String id, Object payload){
        this.id = id;
        this.payload = payload;
    }

    public String getId(){
        return this.id;
    }

    public Object getPayload(){
        return this.payload;
    }

    public String getError(){
        return this.error;
    }

    public void setId(String id){
        this.id = id;
    }

    public void setPayload(Object payload){
        this.payload = payload;
    }

    public void setError(String error){
        this.error = error;
    }

    public String toString(){
        String msg = null;
        try{
            msg = this.gson.toJson(this);
        }    
        catch(Exception e){
            this.log.info("ERROR: {}", e.getMessage());
            this.setPayload(null);
            this.setError(e.getMessage());
            msg = this.gson.toJson(this);
        }
        return msg;
    }

    public String toString2(){
        return this.gson.toJson(this);
    }

}