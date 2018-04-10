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

import org.jaea.onlinevideotutorials.domain.WSMessage;
import org.jaea.onlinevideotutorials.domain.User;
import org.jaea.onlinevideotutorials.SendMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.internal.LinkedTreeMap;
import org.kurento.client.IceCandidate;

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


public class OnlineVideoTutorialsHandler extends TextMessageWebSocketHandler implements GeneralHandler{
    
    /**
     * Valid values of the message payload 'id' attribute from the client which tell 
     * the handler how handle the message.
     */
    private static final String ID_NEW_CONNECTION = "newConnection";
    private static final String ID_RECONNECT = "reconnect";
   // private String attributeNameOfTheMessageId;
    private final Logger log = LoggerFactory.getLogger(OnlineVideoTutorialsHandler.class);
   // private Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
  // private Gson gson = new GsonBuilder().create();
    
    private HashMap<String, TextMessageWebSocketHandler> handlers = new HashMap();
    


    public OnlineVideoTutorialsHandler(String attributeNameOfTheMessageId, String attributeNameOfTheMessagePayload){
        super(attributeNameOfTheMessageId, attributeNameOfTheMessagePayload);
        log.info("OnlineVideoTutorialsHandler created");
        //this.attributeNameOfTheMessageId = attributeNameOfTheMessageId;
    }


    @Override
    public synchronized void handleTextMessage(WebSocketSession session, TextMessage message) throws HandlerException {
     
       
       String id = this.getTextMessageId(message);
       log.info("OnlineVideoTutorialsHandler.handleTextMessage: '{}'' from", id, session.getId());
        if (!id.equals("receiveAddress")){ //**
            this.log.info(""); 
            this.log.info("OnlineVideoTutorialsHandler.handleTextMessage"); 
            this.log.info("------------------------------------------------------------");
            this.log.info("<- The message '{}' from {} has arrived", id, session.getId());
            this.log.info("------------------------------------------------------------");
        }   
        
        switch (id) { 
        case "debug":
            IceCandidate iceCandidate = new IceCandidate("hola", "hola",2);
            SendMessage.toClient(new WSMessage("debug", iceCandidate), session); 
            this.log.info("debug message sended"); 
        break;    
        case ID_NEW_CONNECTION:
            break;
        case ID_RECONNECT:
        default:  
            TextMessageWebSocketHandler handler = this.handlers.get(id);
        
            try{
                handler.handleTextMessage(session, message);
            }
            catch(Exception e){
                try{ 
                        /* If the general handler doesn't find a specific handler for the message,
                    it send the message to all the handlers with the hope that one knows how to
                    handler the message */       
                    this.log.error("The message " + id + " could not be handled, so it's going to be sent to all the handlers"); 
                    for(Map.Entry<String,TextMessageWebSocketHandler> entry : this.handlers.entrySet()){
                            entry.getValue().handleTextMessage(session, message);
                        }
                }
                catch(Exception e2){
                    throw new HandlerException("There is no handler avaible for this message !");
                }
            }
        }
    }
    
    
   

    @Override
    public void attach (String messageId, TextMessageWebSocketHandler handler){
        log.info("OnlineVideoTutorialsHandler.attach");

        this.handlers.put(messageId, handler);
    }


        
    
}
