package org.jaea.onlinevideotutorials.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

//@Entity
public class RequestUser{

  //  @Id
   // @GeneratedValue(strategy=GenerationType.AUTO)
   // @Column(name = "id", unique = true, nullable = false)
  //  private Long id;

    private String userName;
    private String password;
    private String name;
    private String surname;
    private String email;

    public RequestUser(){}

    public String getUserName(){
        return this.userName;
    }

    public String getPassword(){
        return this.password;
    }

    public String getName(){
        return this.name;
    }

    public String getSurname(){
        return this.surname;
    }

    public String getEmail(){
        return this.email;
    }

    public void setUserName(String userName){
        this.userName = userName;
    }

    public void setPassword(String password){
        this.password = password;
    }

    public void setName(String name){
        this.name = name;
    }

    public void setSurname(String surname){
        this.surname = surname;
    }

    public void setEmail(String email){
        this.email = email;
    }

     public String toString(){
        return "{userName: " + this.userName + ",password: " + this.password + "}";
    }
}