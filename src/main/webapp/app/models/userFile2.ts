export class UserFile2 {

    private _name: string;
    private _type: string;
    private _content: any; 


    constructor ();
    constructor(name: string);
    constructor(name?: string){

        if (arguments.length == 1) {
            this._name = name;
            let index = this._name.lastIndexOf('.'); 
            if (index >= 0){
                this._type = this._name.substring(index + 1, this._name.length);
            }
        }
       

    }

    public get name(): string {
        return this._name;
    }

    public get type(): string {
        return this._type;
    }

    public get content(): any {
        return this._content;
    }

    public set name (name: string){
        this._name = name;
    }

    public set type (type: string){
        this._type = type;
    }

    public set content (content: any){
        this._content = content; 
    }

    public toString (): string{
        return `Name: ${this._name}, Type: ${this._type}`;
    }


}


