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
package org.jaea.onlinevideotutorials.handlers;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import java.util.HashMap;
import java.util.Map;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

/**
 * Online Video Tutorials handler 
 * 
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
*/


public class OnlineVideoTutorialsHandler extends TextWebSocketHandler implements GeneralHandler{
    
     /**
     * Name of the message payload attribute that tells 
     * how handle the message.
     */
    private String attributeNameOfTheMessageId;
    private final Logger log = LoggerFactory.getLogger(OnlineVideoTutorialsHandler.class);
    private Gson gson = new GsonBuilder().create();
    
    private HashMap<String, TextMessageWebSocketHandler> handlers = new HashMap();
    


    public OnlineVideoTutorialsHandler(String attributeNameOfTheMessageId){
        log.info("OnlineVideoTutorialsHandler created");
        this.attributeNameOfTheMessageId = attributeNameOfTheMessageId;
    }


    @Override
    public synchronized void handleTextMessage(WebSocketSession session, TextMessage message) throws HandlerException {
       // log.info(""); 
       
        JsonObject jsonMessage = this.gson.fromJson(message.getPayload(), JsonObject.class);
        String id = jsonMessage.get(this.attributeNameOfTheMessageId).getAsString(); 
        
        //#
        if (!id.equals("receiveAddress")){ //**
            this.log.info(""); 
            this.log.info("OnlineVideoTutorialsHandler.handleTextMessage"); 
            this.log.info("<- A message has arrived: " + id);
        }   

        TextMessageWebSocketHandler handler = this.handlers.get(id);
        try{
            handler.handleTextMessage(session, message);
        }
        catch(Exception e){
           try{ 
                /* If the general handler doesn't find a specific handler for the message,
               it send the message to all the handlers with the hope that one knows how to
               handler the message */       
               this.log.error("The message " + id + " could not be handled"); 
               for(Map.Entry<String,TextMessageWebSocketHandler> entry : this.handlers.entrySet()){
                    entry.getValue().handleTextMessage(session, message);
                }
           }
           catch(Exception e2){
               throw new HandlerException("There is no handler avaible for this message");
           }
        }
    }

    @Override
    public String getAttributeNameOfTheMessageId(){
        return this.attributeNameOfTheMessageId;
    }

    @Override
    public void attach (String messageId, TextMessageWebSocketHandler handler){
        log.info("OnlineVideoTutorialsHandler.attach");

        this.handlers.put(messageId, handler);
    }


        
    
}
