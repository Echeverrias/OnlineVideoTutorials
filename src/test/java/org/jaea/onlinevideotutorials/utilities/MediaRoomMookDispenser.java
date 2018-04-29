package org.jaea.onlinevideotutorials.utilities;

import org.jaea.onlinevideotutorials.domain.Room;
import org.jaea.onlinevideotutorials.mocks.MediaRoomMock;
import org.jaea.onlinevideotutorials.mocks.RoomMock;
import org.kurento.client.MediaPipeline;


public class MediaRoomMookDispenser {
    
    
    public static MediaRoomMock getMediaRoom(String name, MediaPipeline pipeline) {
        return new MediaRoomMock(name, pipeline);
    }

    public static MediaRoomMock getMediaRoom(String name, String tutor, MediaPipeline pipeline) {
         return new MediaRoomMock(name, tutor, pipeline);
    }

    public static MediaRoomMock getMediaRoom(Room room, MediaPipeline pipeline) {
              return new MediaRoomMock(room, pipeline);  
    }
    
    public static MediaRoomMock getMediaRoom(String name) {
        return new MediaRoomMock(name, MediaPipelineDispenser.getPipeline());
    }

    public static MediaRoomMock getMediaRoom(String name, String tutor) {
         return new MediaRoomMock(name, tutor, MediaPipelineDispenser.getPipeline());
    }

    public static MediaRoomMock getMediaRoom(Room room) {
              return new MediaRoomMock(room, MediaPipelineDispenser.getPipeline());  
    }
   
    public static RoomMock getRoom(String name, String tutor) {
         return new RoomMock(name, tutor);
    }

    public static RoomMock getRoom(Room room) {
              return new RoomMock(room);  
    }
    
    
}
