import {Directive, HostListener, ElementRef, Renderer}  from '@angular/core';


@Directive({
    selector: `[ovt-download]`
})


export class DownloadDirective {

  constructor(private el: ElementRef, private renderer: Renderer) { 
    console.log("DownloadDirective");
    console.log(el);
  }

  @HostListener('click', ['$event']) 
  onClick(event: Event){
    console.log('downloadEvent from the download.directive');
    sessionStorage.setItem('downloadEvent', 'true'); 

  }

  
  
}