import { Component, AfterViewInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { gadgetsContainerTemplate  } from './gadgetsContainer.html';
import { OptionDirective } from './option.directive';

@Component({
    moduleId: module.id,
    selector: 'ovt-gadgets-container',
    template: gadgetsContainerTemplate,
    styleUrls: ['gadgetsContainer.css'],
})

export class GadgetsContainerComponent implements AfterViewInit {

    @ViewChild(OptionDirective) od: OptionDirective;
    @Input("ovt-address") address: string;
    @Input() options: {'validMimeTypes': string[] | {[key: string]: boolean}};
    @Output('ovt-activeOption') activeOption: EventEmitter<boolean>;
    @Output('ovt-file') sharedFile: EventEmitter<string>;

    private option: string;      
    private imagePath: string = "app/components/room/gadgetsContainer/img/";

    constructor() {
        console.log('*** GadgetsContainerComponent has been created');
        console.log('@Input options: ', this.options);
        this.activeOption = new EventEmitter<boolean>();
        this.sharedFile = new EventEmitter<string>();
    }

    ngAfterViewInit() {
        console.log(`GadgetsContainerComponent.address = ${this.address}`);
    }

    activateOption(option: string): void {
        console.log(option);
        this.option = option;
        this.option ? this.activeOption.emit(true) : this.activeOption.emit(false);

    }

    onSelectedFile(file: string){
        console.log(`GadgetsContainerComponent.onSelectedFile(${file})`); 
        this.sharedFile.emit(file);
        this.od.stopAlert();
    }

    displayNewFileAlert(fileName: string){
        console.log(`displayNewFile: ${fileName}`);
        let state = (this.option === 'pdfLoader') ? 'on' : 'off';
        this.od.displayAlert({
            option: 'pdfLoader', 
            initialState: state,
            data: fileName
        });
    }

}