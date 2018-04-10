/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jaea.onlinevideotutorials.domain.debug;

import org.jaea.onlinevideotutorials.managers.RoomsManager;
import org.jaea.onlinevideotutorials.managers.UserSessionsRegistry;
import org.jaea.onlinevideotutorials.domain.User;
import org.jaea.onlinevideotutorials.domain.UserSession;
import org.jaea.onlinevideotutorials.domain.WSMessage;
import org.jaea.onlinevideotutorials.SendMessage;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.common.reflect.TypeToken;
import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;


import org.jaea.onlinevideotutorials.domain.WSMessage;
import org.jaea.onlinevideotutorials.domain.Room;
import org.jaea.onlinevideotutorials.domain.MediaRoom;


public class DebugFactory {
    
    private String tutor = "tutor";
    private String type = "tutor";

    
    private MediaRoom mediaRoom = new MediaRoom("mediaRoom", null);
    private Room fakeRoom = new MediaRoom("fakeRoom", null);

    private static Room createRoom(){
        Room room = new Room("room");
        room.setTutor("tutor");
        return room;
    }

    public static Room getRoom(){
        return createRoom();
    }


    private static MediaRoom createMediaRoom(){
        MediaRoom room = new MediaRoom("mediaRoom", null);
        room.setTutor("tutor");
        return room;
    }

    public static MediaRoom getMediaRoom(){
        return createMediaRoom();
    }

    private static Room createFakeRoom(){
        Room room = new MediaRoom("fakeRoom", null);
        room.setTutor("tutor");
        return room;
    }


    public static Room getFakeRoom(){
        return createFakeRoom();
    }

    public static WSMessage getRoomMessage(){
        return new WSMessage("roomMessage", createRoom());
    }

    public static WSMessage getMediaRoomMessage(){
        return new WSMessage("mediaRoomMessage", createMediaRoom());
    }
    public static WSMessage getFakeRoomMessage(){
        return new WSMessage("fakeRoomMessage", createFakeRoom());
    }
    
}