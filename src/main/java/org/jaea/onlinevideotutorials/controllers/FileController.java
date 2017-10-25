package org.jaea.onlinevideotutorials.controllers;

import org.jaea.onlinevideotutorials.domain.ParticipantSession;
import org.jaea.onlinevideotutorials.domain.UserFile;
import org.jaea.onlinevideotutorials.repositories.UserFileRepository;
import org.jaea.onlinevideotutorials.repositories.ParticipantSessionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.util.FileCopyUtils;

import java.io.InputStream;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URLConnection;
import java.util.Calendar;
import java.util.GregorianCalendar;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.JsonObject;
import java.util.logging.Level;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;

/**
 *
 * @author Juan Antonio Echeverrías Aranda
 */

@Controller
public class FileController {
	
	private SimpMessagingTemplate template;
	private final String UPLOAD_PATH = "/files/";

    @Autowired
    private ParticipantSessionRepository participantRepository;
    
    @Autowired
    private UserFileRepository userFileRepository;
	
	@Autowired
    private HttpServletRequest request;
	
	@Autowired
	public FileController(SimpMessagingTemplate template){
		this.template = template;
	}
    private final Logger log = LoggerFactory.getLogger(FileController.class);
    
    @PostMapping("/upload/{room:.+}")
    @ResponseStatus(value = HttpStatus.OK)
    public void saveFile(@RequestParam("file") MultipartFile file, @PathVariable String room) throws Exception{
        log.info("* SaveFile: " + file.getName());
        log.info("* SaveFile: " + file.getOriginalFilename());
        log.info("* SaveFile: " + file.getContentType());
        
        String fileName = file.getOriginalFilename();
        String roomFolder = room + "_" + this.getFormatedDate();
        String filePath = UPLOAD_PATH + roomFolder + "/";
        
        ServletContext context = request.getServletContext();
        String fileAbsolutePath = context.getRealPath(filePath);
        
        if (! new File(fileAbsolutePath).exists()){
        	log.info("se va a crear la carpeta");
        	new File(fileAbsolutePath).mkdirs();
        }
        
        log.info("Context path: " + fileAbsolutePath);
        File uploadedFile = new File(fileAbsolutePath + "/" + fileName);
        uploadedFile.createNewFile();
        FileOutputStream fos = new FileOutputStream(uploadedFile);
        fos.write(file.getBytes());
        fos.close(); 
        
        JsonObject msg = new JsonObject();
        msg.addProperty("name", fileName);
        msg.addProperty("loadUrl", filePath + fileName);
        msg.addProperty("downloadUrl", "/download/" + roomFolder + "/" + fileName);
        this.template.convertAndSend("/uploadedFile/shared/" + room, msg.toString());
    }

     @RequestMapping("/download/{folder:.+}/{file:.+}")
    public void downloadFile(HttpServletResponse response, @PathVariable String folder, @PathVariable String file){
        log.info("Download: " + folder + "/" + file);
        
        String filePath = UPLOAD_PATH + "/" + folder + "/" + file;
        ServletContext context = request.getServletContext();
        String absolutePath = context.getRealPath(filePath);
        File f = new File(absolutePath);
        
        if (!f.exists()){
            return;
        }
        log.info("FilaPath: " + absolutePath);
        
        String mimeType = URLConnection.guessContentTypeFromName(f.getName());
        log.info("mimeType: " + mimeType);
        response.setContentType(mimeType);
        //response.setHeader("Content-Disposition","attachment; filename=\"" + f.getName() +"\"");
        response.setHeader("Content-Disposition","attachment; filename=" + f.getName());
        response.setContentLength((int)f.length());
        InputStream is;
        try {
            is = new BufferedInputStream(new FileInputStream(f));
            try {
                FileCopyUtils.copy(is, response.getOutputStream());
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        
        
    }

    @PostMapping("/upload/userImage/{userName:.+}")
    public ResponseEntity<UserFile> saveUserImage(@PathVariable String userName, @RequestParam("file") MultipartFile fileRequest){
        log.info("FileController.saveUserImage: " + userName);
        UserFile userImage = null;
        userImage = new UserFile(fileRequest);
        userImage.setName(userName);
        ParticipantSession user = participantRepository.findByUserName(userName);
        HttpStatus httpStatus;
        try{
            // We delete the previous user image to save the new one with the same name
            user.setUserImage(null);
            participantRepository.save(user);
            user.setUserImage(userImage);
            participantRepository.save(user);
            httpStatus = HttpStatus.OK;
            log.info("the user image has been saved");
        }
        catch(Exception e){
            log.info("error trying to save the user image");
            httpStatus = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity(userImage, httpStatus);
    }


    private String getFormatedDate(){
    	
    	Calendar date = new GregorianCalendar();
    	int year = date.get(Calendar.YEAR);
    	int month = date.get(Calendar.MONTH) + 1;
    	int day = date.get(Calendar.DAY_OF_MONTH);
    	String format = "%02d-%02d-%04d";
    	return String.format(format, day, month, year);
    	
    }
    
   

 }

