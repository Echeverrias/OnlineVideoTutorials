/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jaea.onlinevideotutorials;

/**
 *
 * @author juanan
 */
public interface User {
    
    
    public static final String TUTOR_TYPE = "tutor";
    public static final String STUDENT_TYPE = "student";
            
    public String getName();
    
    public String getUserName();

    public String getUserType();

    public boolean isATutor();
    
    public boolean isAStudent();
    
    public boolean equals(Object object);
    
}
