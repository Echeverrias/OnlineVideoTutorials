
package org.jaea.onlinevideotutorials;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * Online Video Tutorials App main class.
 * 
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 */
@SpringBootApplication
@EnableJpaAuditing
public class OnlineVideoTutorialsApp extends SpringBootServletInitializer{

    
    private final Logger log = LoggerFactory.getLogger(OnlineVideoTutorialsApp.class);
              
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(OnlineVideoTutorialsApp.class);
    }
    
    public static void main(String[] args) throws Exception {
        SpringApplication.run(OnlineVideoTutorialsApp.class, args);
    }

    

}
