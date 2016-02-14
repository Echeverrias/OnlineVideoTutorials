/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */

import {User} from './participant.ts'
  
export class ParticipantFactory {
     
     static createAParticipant (jsonMessage: Object){
        
        return new Participant(jsonMessage.userName,jsonMessage.userType,jsonMessage.name)
       
    })
 }


