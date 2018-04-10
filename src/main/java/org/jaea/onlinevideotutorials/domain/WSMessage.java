package org.jaea.onlinevideotutorials.domain;

import org.jaea.onlinevideotutorials.domain.PayloadWSMessageExclusionStrategy;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.Transient;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class WSMessage{
   
    @Exclude
   private final Logger log = LoggerFactory.getLogger(WSMessage.class);

  //private Gson gson = new GsonBuilder().addSerializationExclusionStrategy(new PayloadWSMessageExclusionStrategy()).create();
  @Exclude  
  @JsonIgnore
  @Transient
  //private Gson gson = new GsonBuilder().create();
  private Gson gson = new GsonBuilder().addSerializationExclusionStrategy(new PayloadWSMessageExclusionStrategy()).create();
 
    
    private String id;

    
    private Object payload;


    private String error;
    
    public WSMessage(String id, Object payload){
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
        this.log.info("WSMessage.toString(" + this.id + ")");
        String msg = null;
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("id", this.id);  
        jsonObject.addProperty("error", "");  
      //  try{
            this.log.info("jsonObject.add('payload', this.gson.toJsonTree(this.payload));");
            jsonObject.add("payload", this.gson.toJsonTree(this.payload));
            this.log.info(" msg = this.gson.toJson(jsonObject);");
            msg = this.gson.toJson(jsonObject);
      //  }  
        /*  
        catch(Exception e){
            this.log.info("ERROR: {}", e.getMessage());
            this.setPayload(null);
            this.setError(e.getMessage());
            msg = this.gson.toJson(this);
        }
        */
        return msg;
    }

    public String toString2(){
        return this.gson.toJson(this);
    }

}