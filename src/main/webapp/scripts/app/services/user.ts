/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */

const TUTOR: string = "tutor";
const STUDENT: string = "student";

export class User {
    
    private _userName: string = null;
    private _name: string = null;
    private _userType: string = null; // 'tutor' or 'student'
    
    constructor(userName: string, userType: string, name: string){
        console.log("");
        console.log(`% User ${new Date().toLocaleTimeString()}`);
        
        this._userName = userName;
        this._userType = userType;
        this._name = name;
        
        console.log(`/ User ${new Date().toLocaleTimeString()}`);
        console.log("");
    }
    
    static get tutorType():string{
        return TUTOR;
    }
    
    static get studentType():string{
        return STUDENT;
    }
    
    get userName(): string{
        return this._userName;
    }
    
    get name(): string{
        return this._name;
    }

    get userType(): string {
        return this._userType;
    }
    
    isATutor(): boolean {
        return this._userType === User.tutorType;
    }
    
    isAStudent(): boolean {
        return this._userType === User.studentType;
    } 

  
    /*
     * 
    
    
    
    set userName(userName: string): void{
        this._userName = userName;
    }
    
    set name(name: string): void{
        this._name = name;
    }
    
    set userType(userType: string): void{
        this._userType = userType;
    }
    
    close(){
        console.log(`User ${this._userName} closed`);
    }
    */
    
    
    
} 

