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
package org.jaea.onlinevideotutorials.services;

import org.jaea.onlinevideotutorials.services.KurentoConfig.KurentoProperties;
import org.kurento.client.KurentoClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;


/**
 *
 * @author Juan Antonio Echeverrías Aranda
 */

@Configuration
public class KurentoConfig {
    
    @Autowired
    private KurentoProperties config;
    
    @Component
    @ConfigurationProperties("kms.ws")
    public static class KurentoProperties {
        
        private String uri;
        
        public String getUri(){
            return this.uri;
        }
        
        public void setUri(String uri){
            this.uri = uri;
        }
        
    }
    
    @Bean
    public KurentoClient kurentoClient() {
        return KurentoClient.create(System.getProperty("kms.ws.uri", config.getUri()));
    }
    
}
