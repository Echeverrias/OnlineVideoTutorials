import { Component, OnInit } from '@angular/core';
import {commentaryTemplate} from './commentary.html';

@Component({
  selector: 'ovt-commentary',
  template: commentaryTemplate,
  styles: [`
    :host {
        background: grey;
        padding: 0.2em;
        border: solid 1px #444;
        position: absolute;
        font-size: 14px;
        color: white;
        width: max-content;
    }
  `]
})
export class CommentaryComponent implements OnInit{
    public content: String = '';

    ngOnInit(){
      console.log('CommentaryComponent.content: ', this.content)
    }
}
