/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jaea.onlinevideotutorials.controllers;

import org.jaea.onlinevideotutorials.domain.ChatMessage;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
/**
 *
 * @author Juan Antonio Echeverrías Aranda
 */

@Controller
public class ChatController {

    private final Logger log = LoggerFactory.getLogger(ChatController.class);
    
    @MessageMapping("mailBox/{room}")
    @SendTo("/chat/noticeBoard/{room}")
    public ChatMessage deliver(ChatMessage message) throws Exception{
        log.info("* Deliver the chat Message " + message.getMessage());
        return message;
    }
}

