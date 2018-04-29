package org.jaea.onlinevideotutorials.utilities;

import org.kurento.client.KurentoClient;
import org.kurento.client.MediaPipeline;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;

import org.springframework.boot.test.context.TestConfiguration;

@PropertySource("application-test.properties")
public class MediaPipelineDispenser {
    
    @Value("${test.kms.ws.uri}") // No funciona
    private static String websocketUrl;
    
    public static MediaPipeline getPipeline(){
       return KurentoClient.create(System.getProperty("test.kms.ws.uri", "ws://localhost:8888/kurento")).createMediaPipeline();
    }
    
}
