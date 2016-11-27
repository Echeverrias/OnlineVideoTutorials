package org.jaea.onlinevideotutorials.managers;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;

/**
 *
 * @author Juan Antonio Echeverrías Aranda
 */

@Configuration
public class UserSessionsRegistryTestConfig {
    
    @Bean
    public UserSessionsRegistry userSessionsRegistry(){ 
        return new UserSessionsRegistry();
    }
}