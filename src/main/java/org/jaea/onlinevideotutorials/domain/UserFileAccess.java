package org.jaea.onlinevideotutorials.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.annotations.Expose;
import org.jaea.onlinevideotutorials.controllers.FileController;

import org.springframework.beans.factory.annotation.Value;
import java.io.File;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class UserFileAccess{
    
    @Exclude
    @JsonIgnore
	private final Logger log = LoggerFactory.getLogger(UserFileAccess.class);
    
    @Exclude
    @JsonIgnore
    @Value("${filesStore.path}")
    private String filesStorePath;
    
    @Exclude
    @JsonIgnore
    private static final String filesStorePath2 = "/files";
    
    @Exclude
    @JsonIgnore
    private String downloadEndpoint = FileController.DOWNLOAD_ENDPOINT;
    
    private String name;
   
    private String loadUrl; 
   
    private String downloadUrl; 
    
    @Exclude
    @JsonIgnore
    private Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
    
   
    public UserFileAccess(File file, String folderName){
        String fileName = file.getName();
        String _folderName = folderName;
        this.constructor(fileName, _folderName);
    }

    public UserFileAccess(UserFile userFile, String folderName){
        String fileName = userFile.getName();
        String _folderName = folderName;
        this.constructor(fileName, _folderName);
    }
    
    private void constructor(String fileName, String folderName){
        log.info("### filesStorePath: {}", this.filesStorePath);
        this.name = fileName;
        this.loadUrl = filesStorePath2 + "/" + folderName + "/" + this.name;
        this.downloadUrl = this.downloadEndpoint + "/" + folderName + "/" + this.name;
        this.log.info("### this.loadUrl: {}", this.loadUrl);
        this.log.info("### this.downloadUrl: {}", this.downloadUrl);
    }

    
    public String getName(){
        return this.name;
    }

    public String getLoadUrl(){
        return this.loadUrl;
    }

    public String getDownloadUrl(){
        return this.downloadUrl;
    }
    
    @JsonIgnore
    public static String getfilesStorePath(){
        return filesStorePath2;
    } 
    
    /**
     * Return the JSON object representation 
     */
    public String toString(){
        return this.gson.toJson(this);
    }


}