/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jaea.onlinevideotutorials.services;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 *
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 */

@Configuration
public class UniversityBBDDConfig {
    
    @Bean
    public UniversityBBDD universityBBDD(){
        return new UniversityBBDD();
    }
}
