package org.jaea.onlinevideotutorials.utilities;

import org.jaea.onlinevideotutorials.domain.ParticipantSession;
import org.jaea.onlinevideotutorials.domain.TutorialMedia;
import org.jaea.onlinevideotutorials.domain.User;
import org.jaea.onlinevideotutorials.domain.UserSession;
import org.jaea.onlinevideotutorials.mocks.WebSocketSessionMock;
import org.kurento.client.KurentoClient;
import org.kurento.client.MediaPipeline;
import org.springframework.web.socket.WebSocketSession;

/**
 *
 * @author Juan Antonio Echeverrías Aranda
 */
public class ParticipantSessionDispenser {
    
    public static final String STUDENT_TYPE = User.STUDENT_TYPE; 
    public static final String TUTOR_TYPE = User.TUTOR_TYPE; 
    public static String DEFAULT_PASSWORD_TEST = "zzz";
    public static MediaPipeline PIPELINE_ROOM_TEST = KurentoClient.create(System.getProperty("kms.ws.uri", "ws://localhost:8888/kurento")).createMediaPipeline();
    
    /*
    * This method return a ParticipantSession object that 
    * hasn't been added yet to any Room object.
    * The id of his WebSocketSession attribute is his user name.
    */
    public static ParticipantSession getTutorParticipant(String userName){
        User user = getTutor(userName);
        WebSocketSession ws = new WebSocketSessionMock(userName);
        ParticipantSession participant = new ParticipantSession(ws, user);
        return participant;
    }
    
    /*
    * This method return a ParticipantSession object that 
    * has been added to a Room object.
    * The id of his WebSocketSessio attribute is his user name.
    */
    public static ParticipantSession getTutorParticipant(String userName, MediaPipeline pipeline, Long roomId){
        User user = getTutor(userName);
        WebSocketSession ws = new WebSocketSessionMock(userName);
        ParticipantSession participant = new ParticipantSession(ws, user);
        TutorialMedia media = new TutorialMedia(pipeline, ws, userName, roomId);
        participant.attachRoomMedia(media);
        return participant;
    }
    
    
    /*
    * This method return a ParticipantSession object that 
    * hasn't been added yet to any Room object.
    * The id of his WebSocketSessio attribute is his user name.
    */
    public static ParticipantSession getStudentParticipant(String userName){
        User user = getStudent(userName);
        WebSocketSession ws = new WebSocketSessionMock(userName);
        ParticipantSession participant = new ParticipantSession(ws,user);
        return participant;
    }
    
     /*
    * This method return a ParticipantSession object that 
    * has been added to a Room object.
    * The id of his WebSocketSessio attribute is his user name.
    */
    
    public static ParticipantSession getStudentParticipant(String userName, MediaPipeline pipeline, Long roomId){
        User user = getStudent(userName);
        WebSocketSession ws = new WebSocketSessionMock(userName);
        ParticipantSession participant = new ParticipantSession(ws,user);
        TutorialMedia media = new TutorialMedia(pipeline, ws, userName, roomId);
        participant.attachRoomMedia(media);
        return participant;
    }
    
    /*
    * This method return an UserSession object that 
    * the id of his WebSocketSessio attribute is his user name.
    */
    public static UserSession getTutorUser(String userName){
        User user = getTutor(userName);
        WebSocketSession ws = new WebSocketSessionMock(userName);
        UserSession userSession= new UserSession(ws, user);
        return userSession;
    }
    
     /*
    * This method return an UserSession object that 
    * the id of his WebSocketSessio attribute is his user name.
    */
    public static UserSession getStudentUser(String userName){
        User user = getStudent(userName);
        WebSocketSession ws = new WebSocketSessionMock(userName);
        UserSession userSession= new UserSession(ws, user);
        return userSession;
    }
    
    public static User getTutor(String userName){
        User user = new User(userName, User.TUTOR_TYPE, userName, DEFAULT_PASSWORD_TEST);
        String [] name_surname = userName.split(".");
        try{
            user.setName(name_surname[0]);
            user.setName(name_surname[1]);
        }
        catch(Exception e){}
        user.setEmail(userName + "@ovt.com");
        return user;
    }
    
    public static User getStudent(String userName){
        User user = new User(userName, User.STUDENT_TYPE, userName, DEFAULT_PASSWORD_TEST);
        String [] name_surname = userName.split(".");
        try{
            user.setName(name_surname[0]);
            user.setName(name_surname[1]);
        }
        catch(Exception e){}
        user.setEmail(userName + "@ovt.com");
        return user;
    }
    
    public static String getDefaultPassword(){
        String pass = DEFAULT_PASSWORD_TEST;
        return pass;
    }
    
  
     
}
