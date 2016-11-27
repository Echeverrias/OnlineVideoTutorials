package org.jaea.onlinevideotutorials.handlers;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;

/**
 *
 * @author Juan Antonio Echeverrías Aranda
 */

@Configuration
public class LoginHandlerTestConfig {
    
    @Bean
    public LoginHandler loginHandler(){ 
        return new LoginHandler("id");
    }
}