/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jaea.onlinevideotutorials.handlers;

import java.util.List;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

/**
 *
 * @author juanan
 */
public interface GeneralHandler {
    
    public void attach(String idMessage, TextMessageWebSocketHandler handler);

    public String getAttributeNameOfTheMessageId();
}
