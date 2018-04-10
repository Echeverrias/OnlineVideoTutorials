package org.jaea.onlinevideotutorials.domain;



import com.fasterxml.jackson.annotation.JsonIgnore;



import org.slf4j.Logger;
import org.slf4j.LoggerFactory;




public class AccessFile {
    
    @Exclude
	@JsonIgnore
	private final Logger log = LoggerFactory.getLogger(AccessFile.class);
    
    private String name;
    
    private String loadUrl;
    
    private String downloadUrl;
    
    public AccessFile (String name, String loadUrl, String downloadUrl){
        
        this.name = name;
        this.loadUrl = loadUrl;
        this.downloadUrl = downloadUrl;
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
    
   

    
}
