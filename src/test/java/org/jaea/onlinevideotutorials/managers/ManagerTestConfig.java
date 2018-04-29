package org.jaea.onlinevideotutorials.managers;

import org.jaea.onlinevideotutorials.handlers.LoginHandlerTestConfig;
import org.jaea.onlinevideotutorials.repositories.MediaRoomRepository;
import org.jaea.onlinevideotutorials.services.KurentoTestConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.test.context.ContextConfiguration;


/**
 *
 * @author Juan Antonio Echeverrías Aranda
 */

@Configuration
@ContextConfiguration(classes = {KurentoTestConfig.class})

public class ManagerTestConfig {
    
    private final Logger log = LoggerFactory.getLogger(ManagerTestConfig.class);
   
    @Autowired
    private MediaRoomRepository roomRepository;
    
   
   
    @Bean
    public MediaRoomRepository mediaRoomRepository(){ 
        return roomRepository;
    }
    
    
    @Bean
    public RoomsManager roomsManager(){ 
        return new RoomsManager();
    }
    
     @Bean
    public UserSessionsRegistry userSessionsRegistry(){ 
        return new UserSessionsRegistry();
    }
    
    
}