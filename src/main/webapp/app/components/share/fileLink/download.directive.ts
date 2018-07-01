import {Directive, HostListener, ElementRef, Renderer}  from '@angular/core';


@Directive({
    selector: `[download]`
})


export class DownloadDirective {

  constructor(private el: ElementRef, private renderer: Renderer) { 
    console.log("DownloadDirective");
    console.log(el);
  }
/*
 // Actives the gadget, makes the component visible
 @HostListener('click') onClick() {
    console.log('downloadEvent from the download.directive');
    sessionStorage.setItem('downloadEvent', 'true'); 

  }
  */
  @HostListener('click', ['$event']) 
  onClick(event: Event){
    console.log('downloadEvent from the download.directive');
    sessionStorage.setItem('downloadEvent', 'true'); 

  }

  
  
}