import { Directive, HostListener, ElementRef, Renderer, Input, OnInit }  from '@angular/core';
import { AttributesValues } from '../../models/types';

@Directive({
    selector: `[ovt-attributes]`
})


export class AttributesDirective implements OnInit {
  
  @Input('ovt-attributes') attributes: AttributesValues;

  constructor(private el: ElementRef, private renderer: Renderer) { 
    console.log("AttributesDirective");
    console.log(el);
  }
  
  ngOnInit(){
    if (this.attributes){
     for (let i in this.attributes){ 
      try{
        this.renderer.setElementAttribute(this.el.nativeElement, i, this.attributes[i]);
        console.log(`AttributesDirective: Renderer.setElementAttributes(${i}, ${this.attributes[i]})`, this.el.nativeElement);
      }
      catch(e){
        console.log(`Error: Renderer.setElementAttributes(${i}, ${this.attributes[i]})`, e);
      }  
     } 
    }  
  }

  
  
}