
package org.jaea.onlinevideotutorials.handlers;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


/**
 *
 * @author Juan Antonio echeverrías Aranda
 */

@Configuration
public class RoomHandlerTestConfig {
    
    @Bean
    public RoomHandler RoomHanlder(){
        return new RoomHandler("id");
    }
    
}