/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jaea.onlinevideotutorials.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
//import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;

//import org.springframework.web.socket.config.annotation.StompEndpointRegistry;

/**
 *
 * @author Juan Antonio Echeverrías Aranda
 */

@Configuration
@EnableWebSocketMessageBroker
public class ChatConfig extends AbstractWebSocketMessageBrokerConfigurer{
    
    @Value("${ws.endpoint}")
    private String wsEndpoint;
    
    @Value("${chat.endpoint}")
    private String chatEndpoint;
    
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config){
        config.enableSimpleBroker("/noticeBoard");
        config.setApplicationDestinationPrefixes("/mailBox");
    }
    
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry){
        registry.addEndpoint(wsEndpoint + chatEndpoint);
    }
    
}
