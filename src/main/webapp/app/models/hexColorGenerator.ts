export class HexColorGenerator{

    private colors: string[] = ['#00ced1', '#1e90ff', '#c393f6','#ba3232', '#beed00', '#26857e', '#ffe700', '#f4200d', '#b51138'];
    private colorsGenerated: Set<string>;
    

    constructor(){
        this.colorsGenerated = new Set<string>();
        this.colorsGenerated.add("#ffffff");
        this.colorsGenerated.add("#000000");
    }

    public getARandomColor():string{
        let color: string;
        do{
            color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        } while(this.colorsGenerated.has(color));
        this.colorsGenerated.add(color);
        return color;
    }

    public getAColor(): string{
        let color: string;
        if (this.colors.length > 0){
            let i: number = Math.floor(Math.random() * this.colors.length);
            color = this.colors.splice(i,1)[0];
            this.colorsGenerated.add(color);
        }
        else{
            color = this.getARandomColor();
        }    
        return color;    
    }
}