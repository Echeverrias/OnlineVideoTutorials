
package org.jaea.onlinevideotutorials.handlers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.SimpMessagingTemplate;


/**
 *
 * @author Juan Antonio Echeverrías Aranda
 */

@Configuration
public class RoomHandlerTestConfig {
    
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    
    @Bean
    public SimpMessagingTemplate SimpMessagingTemplate(){
        return this.simpMessagingTemplate;
    }
    
    @Bean
    public RoomHandler RoomHandler(){
        return new RoomHandler("id", "payload");
    }
    
}
