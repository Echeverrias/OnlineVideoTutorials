/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jaea.onlinevideotutorials.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.beans.BeansException;
import org.springframework.context.annotation.Configuration;


/**
 *
 * @author juanan
 */

@Configuration
public class DebugSpringConfig implements BeanPostProcessor{
    
  Logger log = LoggerFactory.getLogger(DebugSpringConfig.class);
  private boolean show = false;
  
  @Override
  public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
    if (this.show){
    log.info("postProcessBeforeInitialization: bean("+beanName+")");
    }
    return bean;
  }

  @Override
  public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
    if (this.show){
      log.info("postProcessAfterInitialization: bean("+beanName+")");
    }  
    return bean;
  }
}
