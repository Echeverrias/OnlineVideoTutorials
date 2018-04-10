/*
 * (C) Copyright 2015 Kurento (http://kurento.org/)
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Lesser General Public License
 * (LGPL) version 2.1 which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/lgpl-2.1.html
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 */
package org.jaea.onlinevideotutorials.domain;

import java.lang.reflect.Type;

import com.google.gson.JsonObject;
import com.google.gson.JsonElement;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;




public class ParticipantSessionSerializer implements JsonSerializer<ParticipantSession>{
    
    private final Logger log = LoggerFactory.getLogger(ParticipantSessionSerializer.class);
    
   @Override
   public JsonElement serialize(final ParticipantSession participant, final Type typeOfSrc, final JsonSerializationContext context) { 

        this.log.info("############# ParticipantSessionSerializer.serializer");
        final JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("userName", participant.getUserName());
        jsonObject.addProperty("name", participant.getName());
        jsonObject.addProperty("surname", participant.getSurname());
        jsonObject.addProperty("userType", participant.getUserType());
        jsonObject.addProperty("email", participant.getEmail());
        
        return jsonObject;
   } 
    
}

