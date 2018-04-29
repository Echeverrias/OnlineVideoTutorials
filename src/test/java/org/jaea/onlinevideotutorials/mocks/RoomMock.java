package org.jaea.onlinevideotutorials.mocks;

import java.util.Date;
import org.jaea.onlinevideotutorials.domain.MediaRoom;
import org.jaea.onlinevideotutorials.domain.Room;
import java.util.Random;

/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
*/
public class RoomMock extends Room{
    
    private Random random = new Random();
    private Long id;
    private Date createdAt;
    
    public RoomMock(String name, String tutor){
        super(name, tutor);
        initializeMockAttributes();
    };

    public RoomMock(String name){
       super(name);
       initializeMockAttributes();
    };

    public RoomMock(MediaRoom room){
        super(room);
        initializeMockAttributes();
    }

    public RoomMock(Room room){
        super(room);
        initializeMockAttributes();
    }
    
    private void initializeMockAttributes(){
         this.id = this.random.nextLong();
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
    
    
    
}
