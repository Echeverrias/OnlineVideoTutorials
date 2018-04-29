/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jaea.onlinevideotutorials.config;

import org.jaea.onlinevideotutorials.managers.ManagerTestConfig;
import org.jaea.onlinevideotutorials.managers.RoomsManager;
import org.jaea.onlinevideotutorials.managers.UserSessionsRegistry;
import org.jaea.onlinevideotutorials.repositories.MediaRoomRepository;
import org.jaea.onlinevideotutorials.services.KurentoTestConfig;
import org.kurento.client.KurentoClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.test.context.ContextConfiguration;

/**
 *
 * @author juanan
 */
@Configuration
public class ApplicationContextTest {
    
    private final Logger log = LoggerFactory.getLogger(ManagerTestConfig.class);
   
    @Bean
    public KurentoClient kurentoClient() {
        return KurentoClient.create(System.getProperty("test.kms.ws.uri", "ws://localhost:8888/kurento"));
    }
    
    @Autowired
    private MediaRoomRepository roomRepository;
    
    @Bean
    public MediaRoomRepository mediaRoomRepository(){ 
        return roomRepository;
    }
    
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    
    @Bean
    public SimpMessagingTemplate simpMessagingTemplate(){ 
        return simpMessagingTemplate;
    }
    
    
    @Bean
    public UserSessionsRegistry userSessionsRegistry(){ 
        return new UserSessionsRegistry();
    }
    
    
    @Bean
    public RoomsManager roomsManager(){ 
        return new RoomsManager();
    }
    
}
