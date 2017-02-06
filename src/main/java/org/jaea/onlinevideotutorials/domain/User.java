/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jaea.onlinevideotutorials.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 *
 * @author juanan
 */

@Entity
@Table(name="users")
public  class User implements Comparable<User>{
    
    
    public static final String TUTOR_TYPE = "tutor";
    public static final String STUDENT_TYPE = "student";
    
    @JsonIgnore
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id", unique = true, nullable = false)
    private Long id;
     
    protected String name;

    protected String surname;

    protected String email;

    @Column(unique = true, nullable = false)
    protected String userName;
    protected String userType;
    private String password;
   

    private User(){}
    
    public User(String userName, String userType, String name){
        this.userName = userName;
        this.userType = userType;
        this.name = name;
    }

     public User(String userName, String userType, String name, String password){
        this.userName = userName;
        this.userType = userType;
        this.name = name;
        this.password = password;
    }


     public User(String userName, String userType, String name, String surname, String email, String password){
        this.userName = userName;
        this.userType = userType;
        this.name = name;
        this.surname = surname;
        this.password = password;
        this.email = email;
    }
    
    public User(User user){
        this.userName = user.getUserName();
        this.userType = user.getUserType();
        this.name = user.getName();
        this.surname = user.getSurname();
        this.email = user.getEmail();
        this.password = user.password;
    }
    
    public String getName() {
        return this.name;
    }

    public String getSurname(){
        return this.surname;
    }
    
    public String getUserName() {
        return this.userName;
    }

    public String getUserType() {
        return this.userType;
    }

    public String getEmail(){
        return this.email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @JsonProperty("isATutor")
    public boolean isATutor(){
        return this.userType.equals(TUTOR_TYPE);
    }
    
    @JsonProperty("isAStudent")
    public boolean isAStudent(){
        return this.userType.equals(STUDENT_TYPE);
    }

    public boolean comparePassword(String password){
        return this.password.equals(password);
    }

    public boolean comparePassword(User user){
        return this.password.equals(user.password);
    }
    
     @Override
    public int compareTo(User user) {
      if ((user == null) || !(user instanceof User)) {
            return 1;
    }
       return this.userName.compareTo(user.getUserName());
    }
    
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((this.userName == null) ? 0 : this.userName.hashCode());
        return result;
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
        return "{userName: " + this.userName + ",userType: " + this.userType + ",name: " + this.name + ",surname: " + this.surname +  ",email: " + this.email + "}";
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
}
