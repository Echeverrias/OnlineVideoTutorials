package org.jaea.onlinevideotutorials.managers;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.EnableLoadTimeWeaving;
import org.springframework.context.annotation.EnableLoadTimeWeaving.AspectJWeaving;



/**
 *
 * @author juanan
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