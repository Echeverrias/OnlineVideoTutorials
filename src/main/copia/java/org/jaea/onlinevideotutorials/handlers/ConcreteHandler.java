
package org.jaea.onlinevideotutorials.handlers;

import java.util.List;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

/**
 *
 * @author juanan
 */
public interface ConcreteHandler {
    

    public void handleTextMessage(WebSocketSession session, TextMessage message) throws HandlerException;

   /*
    public void handleATextMessage(WebSocketSession session, TextMessage message) throws HandlerException;

    public List<String> getTextMessageIdsICanHandle();
    */
}

