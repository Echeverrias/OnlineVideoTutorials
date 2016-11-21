
package org.jaea.onlinevideotutorials;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import org.jaea.onlinevideotutorials.repositories.UserRepository;
import org.jaea.onlinevideotutorials.domain.User;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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

    
    private final Logger log = LoggerFactory.getLogger(OnlineVideoTutorialsApp.class);

    public static void main(String[] args) throws Exception {
        new SpringApplication(OnlineVideoTutorialsApp.class).run(args);
    }

    

}
