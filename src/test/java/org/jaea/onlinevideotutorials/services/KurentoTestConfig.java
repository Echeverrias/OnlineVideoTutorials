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

import org.kurento.client.KurentoClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;


/**
 *
 * @author Juan Antonio Echeverrías Aranda
 */

@Configuration
@PropertySource("application-test.properties") // no funciona
public class KurentoTestConfig {
    
    @Value("${test.kms.ws.uri}") // No funciona
    private String websocketUrl;
    
    @Bean
    public KurentoClient kurentoClient() {
        return KurentoClient.create(System.getProperty("test.kms.ws.uri", "ws://localhost:8888/kurento"));
    }
    
}
