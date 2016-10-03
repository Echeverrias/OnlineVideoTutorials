/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jaea.onlinevideotutorials.controller;

import org.jaea.onlinevideotutorials.domain.ChatMessage;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
/**
 *
 * @author juanan
 */
@Controller
public class ChatController {

    private final Logger log = LoggerFactory.getLogger(ChatController.class);

    @MessageMapping("/mailBox/{room}")
    @SendTo("/ovt/chat/noticeBoard/{room}")
    public ChatMessage deliver(ChatMessage message) throws Exception{
        log.info("* Deliver the chat Message");
        return message;
    }
}

