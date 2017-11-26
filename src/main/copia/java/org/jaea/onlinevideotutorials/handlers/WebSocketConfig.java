package org.jaea.onlinevideotutorials.handlers;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

/**
 *
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 */

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    
    /**
     * Name of the message payload attribute that tells 
     * how handler will handle the message.
     */
    private final String ATTRIBUTE_NAME_MESSAGE_ID = "id";
    
    @Bean
    public OnlineVideoTutorialsHandler onlineVideoTutorialsHandler() {
        return new OnlineVideoTutorialsHandler(ATTRIBUTE_NAME_MESSAGE_ID);
    }

    @Bean
    public LoginHandler loginHandler() {
        return new LoginHandler(onlineVideoTutorialsHandler());
    }

    @Bean
    public WaitingRoomHandler waitingRoomHandler() {
        return new WaitingRoomHandler(onlineVideoTutorialsHandler());
    }

    @Bean
    public RoomHandler roomHandler() {
        return new RoomHandler(onlineVideoTutorialsHandler());
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(onlineVideoTutorialsHandler(), "/ws");
    }

    


}