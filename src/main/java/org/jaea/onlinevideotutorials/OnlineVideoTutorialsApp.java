/*
 * (C) Copyright 2014 Kurento (http://kurento.org/)
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Lesser General Public License
 * (LGPL) version 2.1 which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/lgpl-2.1.html
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 */
package org.jaea.onlinevideotutorials;

import org.kurento.client.KurentoClient;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

/**
 * Online Video Tutorials App main class.
 * 
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 */
@Configuration
@EnableWebSocket
@EnableAutoConfiguration
public class OnlineVideoTutorialsApp implements WebSocketConfigurer {

    final static String DEFAULT_KMS_WS_URI = "ws://localhost:8888/kurento";

    @Bean
        public OnlineVideoTutorialsHandler handler() {
        return new OnlineVideoTutorialsHandler();
    }
    
    @Bean
        public UserSessionsRegistry registry() {
	   return new UserSessionsRegistry();
    }

    @Bean
        public RoomManager roomManager() {
        return new RoomManager();
    }

    @Bean
        public KurentoClient kurentoClient() {
        return KurentoClient.create(System.getProperty("kms.ws.uri", DEFAULT_KMS_WS_URI));
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(handler(), "/ovt");
    }

    public static void main(String[] args) throws Exception {
        new SpringApplication(OnlineVideoTutorialsApp.class).run(args);
    }
}
