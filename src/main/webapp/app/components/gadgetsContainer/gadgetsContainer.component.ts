import { Component, AfterViewInit, Output, EventEmitter} from '@angular/core';
import { gadgetsContainerTemplate  } from './gadgetsContainer.html';


@Component({
    moduleId: module.id,
    selector: 'ovt-gadgetsContainer',
    template: gadgetsContainerTemplate,
    styleUrls: ['gadgetsContainer.css'],
})

export class GadgetsContainerComponent implements AfterViewInit {


    @Output('ovt-activeOption') activeOption = new EventEmitter<boolean>();

    private option: string;      
    private imagePath: string = "app/components/gadgetsContainer/img/";

    constructor() {

    }

    ngAfterViewInit() {

    }

    activateOption(option: string): void {
        this.option = option;
        this.option ? this.activeOption.emit(true) : this.activeOption.emit(false);

    }

}