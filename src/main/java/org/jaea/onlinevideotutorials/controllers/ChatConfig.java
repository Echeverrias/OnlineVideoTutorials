/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jaea.onlinevideotutorials.controllers;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
//import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;

//import org.springframework.web.socket.config.annotation.StompEndpointRegistry;

/**
 *
 * @author juanan
 */

@Configuration
@EnableWebSocketMessageBroker
public class ChatConfig extends AbstractWebSocketMessageBrokerConfigurer{
    
    
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config){
        config.enableSimpleBroker("/ovt/chat");
        config.setApplicationDestinationPrefixes("/ovt/chat");
    }
    
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry){
        registry.addEndpoint("/ovt/chat");
    }
    
}
