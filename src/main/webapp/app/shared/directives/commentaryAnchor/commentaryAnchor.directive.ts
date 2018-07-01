import {
    ChangeDetectorRef,
    Directive,
    EventEmitter,
    ElementRef,
    Input,
    OnInit,
    OnDestroy,
    ViewContainerRef,
    ComponentFactoryResolver,
    ComponentRef 
} from '@angular/core';

import {CommentaryComponent} from './commentary/commentary.component';

class Point {
    constructor(public x: number, public y: number) {};
}

@Directive({
    selector: '[ovt-commentary-anchor]',
    host: {
        '(mouseenter)': 'showCallout($event)',
        '(mouseleave)': 'hideCallout()'
    }
})
export class CommentaryAnchorDirective implements OnDestroy, OnInit {
    @Input('ovt-commentary-anchor') content: String ;
    
    private element: HTMLElement;
    private calloutRef: ComponentRef<CommentaryComponent>;

    constructor(
        private elementRef: ElementRef,
        private viewContainer: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver,
    ) {}
    
    ngOnInit() {
        this.element = this.elementRef.nativeElement;
    }

    ngOnDestroy() {
        this.hideCallout();
      //  super.onDestroy();
    }

    showCallout(e: MouseEvent) {
        console.log("Commentary CREATE");
        if (!this.calloutRef){
            console.log("Commentary CREATE ON");
        this.calloutRef = this.createCallout(CommentaryComponent, this.content);
        let calloutEl:HTMLElement = this.calloutRef.location.nativeElement;
        let targetPos: Point = this.getTargetCalloutLocation(e, calloutEl);
        calloutEl.style.left = targetPos.x  + 'px';
        calloutEl.style.top = targetPos.y  + 'px';
        }
    }
    
    hideCallout() {
        console.log("Commentary DESTROY");
        if (this.calloutRef) {
            this.calloutRef.destroy();
            this.calloutRef = null;    
        }
    }
    
    private createCallout(calloutComponent: { new(): CommentaryComponent }, content: String): ComponentRef<CommentaryComponent> {

        this.viewContainer.clear();

        let calloutComponentFactory = 
          this.componentFactoryResolver.resolveComponentFactory(CommentaryComponent);
        let calloutComponentRef = this.viewContainer.createComponent(calloutComponentFactory);

        calloutComponentRef.instance.content = content;
 
        return calloutComponentRef;
    }
    
    private getTargetCalloutLocation(e: MouseEvent, calloutEl:HTMLElement): Point {
       // let box: any= this.element.getBoundingClientRect();
        let coordinateX = (e.offsetX - (calloutEl.offsetWidth / 2));
        let coordinateY = (this.element.offsetTop - (calloutEl.offsetHeight * 4));
        return new Point(coordinateX, coordinateY);
    }
}
