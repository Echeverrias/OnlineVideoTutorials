import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name:"limitTo"
})
export class LimitToPipe implements PipeTransform{

    public transform (value: any[], limit: number){
            
            if(limit<0 || limit > (value  && value.length)){
                return value;
            }
            else{
                return value && value.slice(0,limit);
            }
    }
         
    }
