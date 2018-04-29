package org.jaea.onlinevideotutorials.mocks;

import java.util.Date;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;
import org.jaea.onlinevideotutorials.domain.MediaRoom;
import org.jaea.onlinevideotutorials.domain.Room;
import org.kurento.client.MediaPipeline;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author Juan Antonio Echeverrías Aranda
 */
public class MediaRoomMock extends MediaRoom {
    
    private Random random = new Random();
    private Long id;
    private Date createdAt;
    private MediaPipeline pipeline;
    
    private final Logger log = LoggerFactory.getLogger(MediaRoomMock.class);
    
    
    public MediaRoomMock(String name, MediaPipeline pipeline) {
        super(name, pipeline);
        this.pipeline = pipeline;
        this.initializeMockAttributes();
    }

    public MediaRoomMock(String name, String tutor, MediaPipeline pipeline) {
        super(name, tutor, pipeline);
        this.pipeline = pipeline;
        this.initializeMockAttributes();
    }

    public MediaRoomMock(Room room, MediaPipeline pipeline) {
        super(room, pipeline);
        this.pipeline = pipeline;
        this.initializeMockAttributes();
    }
    
    private void initializeMockAttributes(){
         this.id = ThreadLocalRandom.current().nextLong(300);//this.random.nextLong();
         this.createdAt = new Date();
    }
    
    @Override
    public Long getId(){
        return id;
    }
    
    public void setId(Long id){
        this.id = id;
    }
    
    @Override
    public Date getCreatedAt(){
        return createdAt;
    }
    
    public MediaPipeline getPipeline(){
        return this.pipeline;
    }
    
    /*
    @Override
    public void attachPipeline(MediaPipeline pipeline) {
        this.pipeline = pipeline;
    }

    */
    
    
}
