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
    
    constructor();
    constructor(userName: string, userType: string, name: string);
    constructor(userName?: string, userType?: string, name?: string) {
        console.log("");
        console.log(`% User ${new Date().toLocaleTimeString()}`);
        if (arguments.length == 3) {
            console.log(`username: ${userName}, userType: ${userType}, name: ${name}`);
            this._userName = userName;
            this._userType = userType;
            this._name = name;
        }
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

    set (user: User){
        this._userName = user.userName;
        this._userType = user.userType;
        this._name = user.name;
    }

    setToUndefined (): void{
        this._userName = null;
        this._userType = null;
        this._name = null;
    }
    
    isATutor(): boolean {
        return this._userType === User.tutorType;
    }
    
    isAStudent(): boolean {
        return this._userType === User.studentType;
    } 

    exist(): boolean{
        return this._userName != null;
    }

  
} 

