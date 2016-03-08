/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jaea.onlinevideotutorials;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author juanan
 */
public class Info {
    
    public static final String INCOMING_MSG = "<----------";
    public static final String OUTGOING_MSG = "---------->";
    
    public static final String START_SYMBOL = "*";
    public static final String FINISH_SYMBOL = "/";
    
    public static final String START_SYMBOL_2 = "@";
    public static final String FINISH_SYMBOL_2 = "#";
    
    private static final Logger log = LoggerFactory
			.getLogger(OnlineVideoTutorialsHandler.class);
    
    public static void receiveMsg(String event){
        
        log.info("");
        log.info("{} {}", INCOMING_MSG, event);
        log.info("({})", Hour.getTime());
        
        
    }
    
    public static void SendMsg(String addressee){
        
        log.info("");
        log.info("{} to {}", OUTGOING_MSG, addressee);
        log.info("({})", Hour.getTime());
        
        
    }
    
    public static void logInfoStart(String text) {
        
        log.info("");
        log.info("{} {}", START_SYMBOL, Hour.getTime());
        log.info("{} {}", START_SYMBOL, text);
        
    }
    
    public static void logInfoFinish(String text) {
        
       log.info("{} {}", FINISH_SYMBOL, text);
        log.info("{} {}", FINISH_SYMBOL, Hour.getTime());
        log.info("");
        
    }
    
    public static void logInfoStart2(String text) {
        
        log.info("{} {}", START_SYMBOL_2, text);
        
    }
    
    public static void logInfoFinish2(String text) {
        
        log.info("{} {}", FINISH_SYMBOL_2, text);
        
    }
    
    public static void logInfoStart() {
        
        log.info("");
        log.info("{} {}", START_SYMBOL, Hour.getTime());
       
        
    }
    
    public static void logInfoFinish() {
        
        
        log.info("{} {}", FINISH_SYMBOL, Hour.getTime());
        log.info("");
        
        
    }
    
    
    
}
