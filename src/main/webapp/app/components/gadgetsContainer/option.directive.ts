import { Directive, ElementRef,  Renderer, HostListener, Input, AfterViewInit, Output, EventEmitter, OnChanges} from '@angular/core';

@Directive({
  selector: '[ovt-option]'
})
export class OptionDirective implements AfterViewInit, OnChanges {

  @Input('ovt-option') option: string;
  @Input('ovt-imagePath') imagePath: string;
  @Input('ovt-image') imageOff: string;
  // This tells it if there is another option activated
  @Input('ovt-deactivate') activeOption: string;
  @Output('ovt-activate') activate = new EventEmitter<string>();

  private element: any; //HTMLElement;
  private isOn: boolean;



  constructor(private el: ElementRef, private renderer: Renderer) {
    console.log(this.el.nativeElement);
    this.element = el.nativeElement;
    this.isOn = false;
  }

  ngAfterViewInit() {
    console.log("AfterViewinit");
    //this.renderer.setElementProperty(this.element, 'src', this.path + this.image);
   
    this.renderer.setElementStyle(this.element, 'background', `url("${this.imagePath + this.imageOff}") no-repeat`);


  }

  ngOnChanges() {
    console.log("OnChanges");
    console.log(this.option);

    if (this.activeOption !== this.option) {
      console.log("Some option has change");
      this.isOn = false;
      console.log(this.element);
      //this.renderer.setElementProperty(this.element, 'src', this.path + this.image);
      this.renderer.setElementStyle(this.element, 'background', `url("${this.imagePath + this.imageOff}") no-repeat`);
    }

  }



  @HostListener('click') onClick() {
    let image = this.getImage();
    console.log(image);
    //this.renderer.setElementProperty(this.element, 'src', imagePath);
    this.renderer.setElementStyle(this.element, 'background', `url("${this.imagePath + image}") no-repeat`);
    this.isOn = !this.isOn;
    this.isOn ? this.activate.emit(this.option) : this.activate.emit(undefined);

  }



  private getImage(): string {
    return this.isOn? this.imageOff : this.imageOff.replace('off', 'on');
  }
}