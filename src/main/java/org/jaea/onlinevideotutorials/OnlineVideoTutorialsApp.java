
package org.jaea.onlinevideotutorials;


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

    

    public static void main(String[] args) throws Exception {
        new SpringApplication(OnlineVideoTutorialsApp.class).run(args);
    }
}
