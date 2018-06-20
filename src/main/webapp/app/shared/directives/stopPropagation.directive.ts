import {Directive, HostListener}  from '@angular/core';


@Directive({
    selector: `[ovt-stop-propagation]`
})


export class StopPropagationDirective {

  constructor() { 
    console.log("StopPropagationDirective");
    
  }
  @HostListener('click', ['$event']) 
  onClick(event: Event){
    console.log('StopPropagationDirective.click ');
    event.stopPropagation();
  }

  
  
}