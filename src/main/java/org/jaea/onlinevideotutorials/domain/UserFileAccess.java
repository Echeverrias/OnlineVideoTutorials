package org.jaea.onlinevideotutorials.domain;

import org.springframework.beans.factory.annotation.Value;

public class UserFileAccess{

    @Value("${filesStore.endpoint}")
    private String filesStoreEndpoint;
    
    private String name;
    private String loadUrl; 
    private String downloadUrl; 

    public UserFileAccess(UserFile userFile){
        this.name = userFile.getName();
    }

    public String getName(){
        return this.name;
    }

    public String loadUrl(){
        return this.loadUrl;
    }

    public String downloadUrl(){
        return this.downloadUrl;
    }

}