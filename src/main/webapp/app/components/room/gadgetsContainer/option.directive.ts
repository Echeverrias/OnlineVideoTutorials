import { Directive, ElementRef,  Renderer, HostListener, Input, AfterViewInit, Output, EventEmitter, OnChanges} from '@angular/core';

type DisplayAlertOptions = { option: string, initialState: string, data: string }; 


@Directive({
    selector: '[ovt-option]'
})


export class OptionDirective implements AfterViewInit, OnChanges, ngOnDestroy {

  @Input('ovt-option') option: string;
  @Input('ovt-imagePath') imagePath: string;
  @Input('ovt-image') imageOff: string;
  // This tells it if there is another option activated
  @Input('ovt-deactivate') activeOption: string;
  @Output('ovt-activate') activate = new EventEmitter<string>();


  private element: any; //HTMLElement;
  private isOn: boolean; // Tells if the gadget is active/visible
  private intervalAlert: any;
  

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
  
 // Actives the gadget, makes the component visible
 @HostListener('click') onClick() {
    this.stopAlert();
    let image;
    this.isOn = !this.isOn;
    this.isOn ? image = this.imageOff.replace('-off', '-on') : image = this.imageOff;
    //this.renderer.setElementProperty(this.element, 'src', imagePath);
    this.renderer.setElementStyle(this.element, 'background', `url("${this.imagePath + image}") no-repeat`);
    this.isOn ? this.activate.emit(this.option) : this.activate.emit(undefined);

  }

  @HostListener('mouseover') onMouseOver(){
      console.log("mouseover");
      this.renderer.setElementStyle(this.element, 'background', `url("${this.imagePath + this.imageOff.replace('off', 'on')}") no-repeat`);  
  }

  @HostListener('mouseleave') onMouseLeave(){
     if (this.activeOption !== this.option){
      console.log("mouseleave");
      this.renderer.setElementStyle(this.element, 'background', `url("${this.imagePath + this.imageOff.replace('on', 'off')}") no-repeat`);  
    }   
  }

  displayAlert(options: DisplayAlertOptions){
    console.log("OptionDirective.displayAlert"); 
    if (options.option === this.option) {
          this.intervalAlert = setInterval(this.changeIcon(), 1000);
      }    
  }

  stopAlert(){
    console.log("OptionDirective.stopAlert"); 
    clearInterval(this.intervalAlert);
    let image;
    this.isOn ? image = this.imageOff.replace('-off', '-on') : image = this.imageOff;
    //this.renderer.setElementProperty(this.element, 'src', imagePath);
    this.renderer.setElementStyle(this.element, 'background', `url("${this.imagePath + image}") no-repeat`);

  }

  changeIcon(): any{
    console.log('OptionDirective.changeIcon()');
    let changeImage = () => {
      console.log('Changing the image');
      let backgroundStyle: string = this.element.style.background;
      let image: string; 
      if (backgroundStyle.includes(this.imageOff)){
          image = this.imageOff.replace("-off", "-on");
      }
      else{
        image = this.imageOff;
      }
      this.renderer.setElementStyle(this.element, 'background', `url("${this.imagePath + image}") no-repeat`);
    }
    return changeImage;   
  }

  onDestroy(){
    clearInterval(this.intervalAlert);
  } 
 
  
}