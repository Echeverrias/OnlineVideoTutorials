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
    private Object body;

    @Expose
    private String error;

    public WebSocketMessage(String id, Object body){
        this.id = id;
        this.body = body;
    }

    public String getId(){
        return this.id;
    }

    public Object getBody(){
        return this.body;
    }

    public String getError(){
        return this.error;
    }

    public void setId(String id){
        this.id = id;
    }

    public void setBody(Object body){
        this.body = body;
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
            this.setBody(null);
            this.setError(e.getMessage());
            msg = this.gson.toJson(this);
        }
        return msg;
    }

}