package org.jaea.onlinevideotutorials.domain;

import java.io.File;
import java.io.IOException;

import org.jaea.onlinevideotutorials.controllers.UserController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.FileInputStream;
import java.io.FileNotFoundException;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.OneToOne;
import javax.persistence.Transient;

import java.net.URLConnection;
import java.util.logging.Level;

import javax.persistence.MapsId;
import org.springframework.web.multipart.MultipartFile;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Entity
@Table(name="files")
public class UserFile implements Comparable<UserFile>{
    
	@JsonIgnore
	@Transient
	private final Logger log = LoggerFactory.getLogger(UserFile.class);
	 
    @JsonIgnore
    @Id
    @GeneratedValue
    @Column(name = "id", unique = true, nullable = false)
    private Long id;
    
    @Column(nullable = false)
    private String name;

    private String extension;

    private String mimeType; 

    @Lob @Basic(fetch = FetchType.LAZY)
    private byte[] content;

    
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    @JsonIgnoreProperties(value = "files")
    public MediaRoom room;

    public UserFile(){
        this.log.info("The file is being constructed");
    }
    
    public UserFile (File file){
    	 byte[] arrayBytes = new byte [(int) file.length()];
         try {
        	FileInputStream fis = new FileInputStream(file);
            fis.read(arrayBytes);
            fis.close();
        } catch (FileNotFoundException ex) {
        	log.info("error al crear el fis");
           // Logger.getLogger(UserFile.class.getName()).log(Level.SEVERE, null, ex);
        }
        catch (IOException ex) {
        	log.info("error al read o close el fis");
            //Logger.getLogger(UserFile.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        this.name = file.getName();
        this.extension = this.getFileExtension(name);
        this.content = arrayBytes;
        this.mimeType = URLConnection.guessContentTypeFromName(name);
    }
    
    public UserFile (MultipartFile file){
        try {
            this.content = file.getBytes();
        } catch (IOException ex) {
            //Logger.getLogger(UserFile.class.getName()).log(Level.SEVERE, null, ex);
        }
        this.name = file.getOriginalFilename();
        this.extension = this.getFileExtension(name);
        this.mimeType = URLConnection.guessContentTypeFromName(name);
   }
    
    public Long getId() {
        return this.id;
    }
    
    public String getName(){
        return this.name;
    }

    public String getExtension(){
        return this.extension;
    }

    public String getMimeType(){
        return this.mimeType;
    }
    
    
    public byte[] getContent(){
        return this.content;
    }
    
    // The extension of the file will not change
    public void setName(String name){
    	String extension2 = this.getFileExtension(name);
    	if (this.extension.equals(extension2)){
    		this.name = this.getNameWithoutExtension(name) + "." + this.extension;
    	}
    	else {
    		this.name = name + "." + this.extension;
    	}
    }

    public MediaRoom getRoom(){
        return this.room;
    }

    public void setRoom(MediaRoom room){
        log.info("UserFile.set(room)");
        this.room = room;
    }

    
    @Override
    public int compareTo(UserFile userFile) {
      if ((userFile == null) || !(userFile instanceof UserFile)) {
            return 1;
      }
      else if (this.name.compareTo(userFile.getName()) == 0){
    	  if (this.content.length == userFile.getContent().length){
    		  return 0;
    	  }
    	  else if (this.content.length < userFile.getContent().length){
    		  return -1;
    	  } 
    	  else {
    		  return 1;
    	  }
      }
      return this.name.compareTo(userFile.getName());
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
        else if (!this.mimeType.equals(file.getMimeType())){
        	return false;
        }
        else if (this.content.length != file.getContent().length){
        	return false;
        }
    return true;
    }

    public String toString(){
        return "Name: " + this.name + ", Extension: " + this.extension + ", Mime Type: " + this.mimeType;
    }
    
    @JsonIgnore
    private String getFileExtension(String fileName){
        String extension = "";
        int index = fileName.lastIndexOf(".");
        if (index > 0){
            extension = fileName.substring(index + 1, fileName.length());
        }
        return extension;
    }
    
    @JsonIgnore
    private String getNameWithoutExtension(String fileName){
        String name = "";
        int index = fileName.lastIndexOf(".");
        if (index > 0){
            name = fileName.substring(0, index);
        }
        return name;
    }
    
}
