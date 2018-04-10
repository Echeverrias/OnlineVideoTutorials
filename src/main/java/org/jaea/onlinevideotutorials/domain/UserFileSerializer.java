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




public class UserFileSerializer implements JsonSerializer<UserFile>{
    
    private final Logger log = LoggerFactory.getLogger(UserFileSerializer.class);
    
   @Override
   public JsonElement serialize(final UserFile file, final Type typeOfSrc, final JsonSerializationContext context) { 

        this.log.info("############# UserFileSerializer.serialize");
        
        final JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("name", file.getName());
        jsonObject.addProperty("extension", file.getExtension());
        jsonObject.addProperty("mimeType", file.getMimeType());
        jsonObject.addProperty("loadUrl", file.getLoadUrl());
        jsonObject.addProperty("downloadUrl", file.getDownloadUrl());
        
        return jsonObject;
   } 
    
}

