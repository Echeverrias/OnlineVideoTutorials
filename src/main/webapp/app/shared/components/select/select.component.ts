import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { selectTemplate } from './select.html';
export type SelectOption = {textContent: string; value: string};

@Component({
  moduleId: module.id,
  selector: 'ovt-select',
  template: selectTemplate,
  styleUrls: ['select.css']
})
export class SelectComponent implements OnInit {
  
  @Input() options: SelectOption [];
  @Input () name: string;
  @Output() selectChange: EventEmitter<any>;

  private currentValue: string;

  constructor() { 
    this.selectChange = new EventEmitter<any>();
  }

  ngOnInit() {
    
    this.currentValue = (this.options && this.options.length > 0)? this.options[0].value : undefined;
    console.log('SelectComponent.OnInit: this.currentValue: ', this.currentValue);
  }

  onChange(value: string): void{
    console.log(`SelectComponent.onChanges(${value})`);
    if(this.currentValue !== value){
      console.log(`SelectComponent.currentValue changes: ${this.currentValue}`);
      this.currentValue = value;
      this.selectChange.emit(value);
    }
  }

}
