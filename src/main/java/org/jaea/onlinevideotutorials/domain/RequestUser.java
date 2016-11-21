package org.jaea.onlinevideotutorials.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class RequestUser{

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id", unique = true, nullable = false)
    private Long id;

    private String userName;
    private String password;

    public RequestUser(){}

    public String getUserName(){
        return this.userName;
    }

    public String getPassword(){
        return this.password;
    }

     public String toString(){
        return "{userName: " + this.userName + ",password: " + this.password + "}";
    }
}