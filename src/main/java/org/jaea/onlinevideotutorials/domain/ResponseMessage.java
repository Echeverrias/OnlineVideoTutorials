package org.jaea.onlinevideotutorials.domain;

public class ResponseMessage {

    private boolean ok;
    private String payLoad;
    private String message;

    public ResponseMessage(){}

    public ResponseMessage(boolean ok) {
        this.ok = ok;
    }

    public ResponseMessage(boolean ok, String payLoad) {
        this.ok = ok;
        this.message = message;
    }

    public boolean getOk(){
        return this.ok;
    }

    public String getPayLoad(){
        return this.payLoad;
    }
            
    public String getMessage(){
        return this.message;
    }
            
    public void setOk(boolean ok){
        this.ok = ok;
    }

    public void setPayLoad(String payLoad){
        this.payLoad = payLoad;
    }
            
    public void setMessage(String message){
        this.message= message;
    }
      
    
            
}
