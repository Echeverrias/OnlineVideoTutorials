package org.jaea.onlinevideotutorials.domain;

import org.kurento.client.MediaPipeline;
import org.springframework.web.socket.WebSocketSession;

import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.lang.reflect.Modifier;
import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;
import com.fasterxml.jackson.annotation.JsonIgnore;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



public class PayloadWSMessageExclusionStrategy implements ExclusionStrategy {

	private final Logger log = LoggerFactory.getLogger(PayloadWSMessageExclusionStrategy.class);
	private List<Class<?>> classesToSkip = new ArrayList(Arrays.asList(WebSocketSession.class,MediaRoom.class, TutorialMedia.class, MediaPipeline.class));
	
	// Parece ser que solo funciona con los tipos primitivos
	public boolean shouldSkipField(FieldAttributes f) {
		//if(f.getAnnotation(Exclude.class)!=null || f.getAnnotation(JsonIgnore.class)!=null){
		log.info("# PayloadWSMessageExclusionStrategy.shouldSkipField");
		if ( shouldSkipFieldAnottation(f) || shouldSkipFieldModifier(f) || shouldSkipFieldClass(f) ){
			log.info("NOT Serialized field: {}", f.getName());
			return true;
		}
		log.info("Serialized field: {}", f.getName());
		return false;
	}

	public boolean shouldSkipClass(Class<?> clazz) {
		// TODO Auto-generated method stub
	    
		if (shouldSkipClazz(clazz)){
			log.info("Not Serialized class: {}", clazz.getName());
			return true;
		}
		
		return false;
	}

	private boolean shouldSkipFieldAnottation(FieldAttributes f){
		return f.getAnnotation(Exclude.class)!=null || f.getAnnotation(JsonIgnore.class)!=null ;
	}

	private boolean shouldSkipFieldModifier(FieldAttributes f){
		return f.hasModifier(Modifier.TRANSIENT) || f.hasModifier(Modifier.STATIC);
	}

	private boolean shouldSkipFieldClass(FieldAttributes f){
		return classesToSkip.stream().anyMatch(c -> f.getDeclaredClass() == c) ;
	}

	private boolean shouldSkipClazz(Class<?> c){
		return classesToSkip.stream().anyMatch(cc -> cc == c) ;
	}

}