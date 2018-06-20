import { Directive, HostListener, ElementRef, Renderer, Input, OnInit }  from '@angular/core';

@Directive({
    selector: `[ovt-size]`
})


export class SizeDirective implements OnInit {
  
  @Input() size: {width: string; height: string};

  constructor(private el: ElementRef, private renderer: Renderer) { 
    console.log("SizeDirective");
    console.log(el);
  }
  
  ngOnInit(){
    this.renderer.setElementStyle(this.el.nativeElement, 'width', this.size.width);
    this.renderer.setElementStyle(this.el.nativeElement, 'height', this.size.height);
  }

  
  
}