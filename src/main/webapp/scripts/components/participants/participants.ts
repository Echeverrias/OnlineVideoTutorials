/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */
 
 import {User} from '../user/user.ts'
 
 export class Participants{
     
    private _me: User; 
    private _tutor: User;
    private _students: Object; // I and the tutor aren't included
    
    
    constructor(){
        this._students = {};
   }
     
    get me(): User{
        return this._me;
    }
    
    get tutor(): User{
        return this._tutor;
    }
    
    get students(): Object{
        return this._students;
    }
    
    get student(userName: string): User{
        return eval(`this._students.${userName}`);
    }
    
    addMe(userName: string, userType: string,  name: string){
        this._me = new User(userName, userType, name);
    }
    
    addTutor(userName: string, name: string){
        this._tutor = new User(userName, "tutor", name);
    }
    
    addStudent(userName: string, name: string){
        let student = new User(userName, "student", name);
        eval(`this._students.${userName} = ${student}`);
    }
    
    addParticipant(user: User){
        console.log(`Participants.addParticipant: ${user.toString()}`);
        if (user.isATutor()){
            this._tutor = user
        }
        else{
            console.log(`this._students: ${JSON.stringify(this._students)}`);
             console.log(`user.userName: ${user.userName}`);
            this._students[user.userName] = user;
        }
         console.log(`/Participants.addParticipant`);
    }
    
    removeParticipant(user: User){
        if (user.isATutor()){
            this.deleteTutor();
        }
        else if(user.isAStudent()){
            this.deleteStudent(user.userName);
        }
    }
    
    
    
    set me (user: User){
        console.log(`* Participants.setMe`);
        console.log(`before: ${this._me && this._me.name}`);
        this._me = user;
        console.log(`after: ${this._me && this._me.name}`);
    }
    
    set tutor (user: User){
        this._tutor = user;
    }
    
    set student (user: User){
        this._students.push(user);
    }
    
    get myUserType(): string{
        return this._me && this._me.userType;
    }
    
    get myName(): string{
        return this._me && this._me.name;
       
    }
    
    get myUserName(): string{
        return this._me && this._me.userName;
       
    }
    
    get myTutorName(): string{
        return this._tutor && this._tutor.name;
    }
    
    get studentsNames(): string[]{
        return Object.keys(this._students);
    }
    
    amIATutor(): boolean {
        return this._me && this._me.isATutor();
    }
    
    amIAStudent(): boolean {
        return this._me &&  this._me.isAStudent();
    }
    
    deleteMe(): void {
        this._me.close();
        this._me = {};
    }
    
    deleteTutor(): void {
        console.log(`Participants.deleteTutor`);
        this._tutor.close();
        this._tutor = {};
    }
    
    deleteStudent (studentUserName: string): void {
        console.log(`Participants.deleteStudent`);
        this._students[studentUserName].close();
        eval(`delete this._students.${studentUserName}`);
    }
    
    deleteAllStudents (): void {
        console.log(`Participants.deleteAllStudents`);
        for (let student in this._students){
            console.log(`student`);
            eval(`delete this._students.${student}.close()`);
            eval(`delete this._students.${student}`);
        }
    }
    
    
    removeAllExceptMe(): void{ // need to be implemented, the release of all the webRtcPeers
        console.log(`Participants.removeAllExceptMe`);
        if (this._me.isAStudent()){
            this.deleteTutor();
        }    
        this.deleteAllStudents();       
    }
    
   /*
    addStudents(studentsNames: string[]){
        console.log(`ParticipantsAddStudents`);
        
        for(let i in studentsNames){
            let student = new User(studentsNames[i], "student");
            eval(`this._students.${student.userName} = ${student}`);
        }   
        
        console.log(`${Object.getOwnPropertyNames(this._students)}`); 
    }
    */
    
}
     
     
     

 
 


