package org.jaea.onlinevideotutorials.handlers;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


/**
 *
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 */

@Configuration
public class OVTHandlerTestConfig {
    
    /**
     * Name of the message payload attribute that tells 
     * how handler will handle the message.
     */
    private final String ATTRIBUTE_NAME_MESSAGE_ID = "id";
    
    
     
    /**
     * Name of the message payload attribute that has 
     * the information.
     */
     private final String ATTRIBUTE_NAME_MESSAGE_PAYLOAD = "paylaod";
    
    @Bean
    public OnlineVideoTutorialsHandler onlineVideoTutorialsHandler() {
        return new OnlineVideoTutorialsHandler(ATTRIBUTE_NAME_MESSAGE_ID, ATTRIBUTE_NAME_MESSAGE_PAYLOAD);
    }

   

    


}