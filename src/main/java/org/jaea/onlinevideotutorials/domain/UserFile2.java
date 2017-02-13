package org.jaea.onlinevideotutorials.domain;

import java.io.File;
import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Lob;
import javax.persistence.Basic;
import javax.persistence.FetchType;
import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;

import javax.persistence.ManyToOne;
import javax.persistence.Table;




//@Entity
//@Table(name="files2")
public class UserFile2 {
	/*
	@JsonIgnore
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id", unique = true, nullable = false)
	private Long id;
	private String name;
    private String type;
    
    @Lob @Basic(fetch = FetchType.LAZY)
    private byte[] content;
    
    private User user;

	public UserFile2(){};
	
	public UserFile2(MultipartFile file){
		this.name = file.getName();
		try {
			this.content = file.getBytes();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	public String getName(){
		return name;
	}
	
	public User getUser(){
		return this.user;
	}
	
	public void setName(String name){
		this.name = name;
	}
	
	public void setContent(byte[] content){
		this.content = content;
	}
	
	public void setUser(User user){
		this.user = user;
	}
	
	@Override
	public int hashCode(){
		final int prime = 31;
		int result = 1;
		result = prime * result + ((this.id == null)? 0 : this.hashCode());
		result = prime * result + ((this.name == null)? 0 : this.name.hashCode());
		return result;
	}
	
	@Override
	public boolean equals (Object obj){
		if (this == obj){
			return true;
		}
		if (obj == null){
			return false;
		}
		if (!(obj instanceof UserFile)){
			return false;
		}
		UserFile file = (UserFile) obj;
		if (this.id == null){
			if (file.id != null){
				return false;
			}
		}
		else if (this.name == null){
			if (file.getName() != null){
				return false;
			}
		}
		else if (!this.name.equals(file.getName())){
			return false;
		}
	return true;
	}
	
	*/
}
