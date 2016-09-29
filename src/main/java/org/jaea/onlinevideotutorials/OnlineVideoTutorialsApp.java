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
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
/**
 * Online Video Tutorials App main class.
 * 
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 */
//@Configuration
//@EnableWebSocket
//@EnableAutoConfiguration
@SpringBootApplication
public class OnlineVideoTutorialsApp {

    final static String DEFAULT_KMS_WS_URI = "ws://localhost:8888/kurento";

    @Bean
        public KurentoClient kurentoClient() {
        return KurentoClient.create(System.getProperty("kms.ws.uri", DEFAULT_KMS_WS_URI));
    }

    public static void main(String[] args) throws Exception {
        new SpringApplication(OnlineVideoTutorialsApp.class).run(args);
    }
}
