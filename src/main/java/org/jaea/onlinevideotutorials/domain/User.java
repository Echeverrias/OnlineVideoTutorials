/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jaea.onlinevideotutorials.domain;

/**
 *
 * @author juanan
 */
public  class User {
    
    
    public static final String TUTOR_TYPE = "tutor";
    public static final String STUDENT_TYPE = "student";
    
    protected final String name;
    protected final String userName;
    protected final String userType;
    
    
    public User(String userName, String userType, String name){
        this.userName = userName;
        this.userType = userType;
        this.name = name;
    }
    
    public User(User user){
        this.userName = user.getUserName();
        this.userType = user.getUserType();
        this.name = user.getName();
    }
    
    public String getName() {
        return this.name;
    }
    
    public String getUserName() {
        return this.userName;
    }

    public String getUserType() {
        return this.userType;
    }

    public boolean isATutor(){
        return this.userType.equals(TUTOR_TYPE);
    }
    
    public boolean isAStudent(){
        return this.userType.equals(STUDENT_TYPE);
    }
    
    @Override
    public boolean equals(Object obj) {
        
        if (this == obj) {
            return true;
	}
	if ((obj == null) || !(obj instanceof User)) {
            return false;
	}
	User other = (User) obj;
	boolean eq = this.userName.equals(other.getUserName());

	return eq;
    }

    public String toString(){
        return "{userName: " + this.userName + ",userType: " + this.userType + "}";
    }
    
}
