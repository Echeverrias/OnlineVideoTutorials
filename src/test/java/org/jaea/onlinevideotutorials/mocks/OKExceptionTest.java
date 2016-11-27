/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jaea.onlinevideotutorials.mocks;

import java.io.IOException;

/**
 *
 * @author juanan
 */
public class OKExceptionTest extends IOException{
    
    public OKExceptionTest(){
        
    };
    
    public OKExceptionTest(String msg){
        super(msg);
    };
    
}
