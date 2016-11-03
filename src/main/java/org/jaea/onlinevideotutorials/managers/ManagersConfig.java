package org.jaea.onlinevideotutorials.managers;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;

/**
 *
 * @author Juan Antonio Echeverrías Aranda
 */

@Configuration
public class ManagersConfig {
    
    @Bean
    public RoomsManager roomsManager(){ 
        return new RoomsManager();
    }

    @Bean
    public UserSessionsRegistry userSessionsRegistry(){ 
        return new UserSessionsRegistry();
    }
}