/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
 
import {Component, CORE_DIRECTIVES, FORM_DIRECTIVES, EventEmitter} from 'angular2/angular2';
import {Connection} from '../connection/connection.ts';
import {Participants} from '../participants/participants.ts';
import {User} from '../user/user.ts';

@Component({
    selector: 'room',
    inputs: ['roomName'],
    outputs: ['exit'],
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
    styleUrls: ["assets/styles/main.css"],
    templateUrl: "scripts/components/room/room.html"
})
export class Room {
    
    private participantLess: Object;
    private participantInRoom: Object;
    
    private exit: EventEmitter;
   
    constructor(private connection: Connection, private participants : Participants) {
      console.log(`% Room constructor`);
      
      this.exit = new EventEmitter();
      
      this.participantLess = this.connection.events.subscribeToParticipantLess(this, this.onRemoveParticipant);
      this.participantInRoom = this.connection.events.subscribeToParticipantInRoom(this, this.onAddParticipant);
      
      console.log(`me: ${JSON.stringify(participants.me)}`) 
      console.log(`tutor: ${JSON.stringify(participants.tutor)}`) 
      console.log(`students: ${JSON.stringify(participants.students)}`) 
      console.log(`studentsNames: ${JSON.stringify(participants.studentsNames)}`)
      console.log(`AmIAStudent?: ${JSON.stringify(participants.amIAStudent())}`) 
      console.log(`AmIATutor: ${JSON.stringify(participants.amIATutor())}`) 
      
      console.log(`/ Room constructor`);
    }
    
    onExitOfRoom(){
        console.log(`<- Room.onExitOfRoom: ${this.roomName}`);
        
        
        let jsonMessage = {
                id: "exitRoom",
                roomName: this.roomName,
                userName: this.participants.myUserName,
                userType: this.participants.myUserType,
        }
        
        this.connection.sendMessage(jsonMessage);    
        
        if (this.participants.myUserType === "student"){
            this.exit.next("waitingRoom");
            
        }
        else{
            this.exit.next("login"); 
        }    
        
        this.participants.removeAllExceptMe();
        
        console.log(`-> message: ${JSON.stringify(jsonMessage)}`);
        console.log("/ Room.onExitOfRoom");
    }
    
    onRemoveParticipant (jsonMessage: Object): void {
        console.log("<- Room.onRemoveParticipan - name: " + jsonMessage.userName)
        console.log(`<- message: ${JSON.stringify(jsonMessage)}`);
            
        let participant = new User(jsonMessage);
        this.participants.removeParticipant(participant);
        
        console.log("/ Room.onRemoveParticipan");
    }
    
    // When a student (not a tutor) enter into a room
    onAddParticipant (jsonMessage: Object): void{
    console.log("<- Room.onAddParticipant");
    console.log(`<- message: ${JSON.stringify(jsonMessage)}`);
    
    let participant = new User(jsonMessage);
    
    this.participants.addParticipant(participant);
    console.log("/ Room.onAddParticipant");
   }
   
}






