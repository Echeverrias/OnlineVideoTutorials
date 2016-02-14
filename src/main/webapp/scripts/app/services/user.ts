/**
 * @author Juan Antonio Echeverrías Aranda (juanan.echeve@gmail.com)
 * 
 */


export class User {
    
    private _userName: string = null;
    private _name: string = null;
    private _userType: string = null; // 'tutor' or 'student'
    
    constructor(userName: string = "", userType: string = "", name: string = ""){
        console.log(`% User`);
        this._userName = userName;
        this._userType = userType;
        this._name = name;
               
    }
    
    get userName(): string{
        return this._userName;
    }
    
    get name(): string{
        return this._name;
    }
    
    get userType(): string{
        return this._userType;
    }
    
    isATutor(): boolean {
        return this._userType === "tutor";
    }
    
    isAStudent(): boolean {
        return this._userType === "student";
    }
    
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
    
    toString():string{
        return `{userName: ${this._userName}, userType: ${this._userType}, name: ${this._name}}`;
    }
    
    
} 

