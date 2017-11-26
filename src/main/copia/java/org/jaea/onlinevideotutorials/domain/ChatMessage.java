package org.jaea.onlinevideotutorials.domain;

public class ChatMessage {

    private String sender;
    private String message;
    private String date;

    public ChatMessage() {
    }

    public ChatMessage(String sender, String message, String date) {
        this.sender = sender;
        this.message = message;
        this.date = date;
    }

    public String getSender(){
        return this.sender;
    }
            
    public String getMessage(){
        return this.message;
    }
            
    public String getDate(){
        return this.date;
    }
            
    public void setSender(String sender){
        this.sender = sender;
    }
            
    public void setMessage(String message){
        this.message= message;
    }
            
    public void setDate(String date){
        this.date = date;
    }
            
    
            
}
