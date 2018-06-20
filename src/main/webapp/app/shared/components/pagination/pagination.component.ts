import { Component, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { paginationTemplate } from './pagination.html';
@Component({
  moduleId: module.id,
  selector: 'ovt-pagination',
  template: paginationTemplate,
  styleUrls: ['pagination.css']
})
export class PaginationComponent implements OnChanges{
  
  @Input() readonly totalItems: number;
  @Input() currentPage: number;
  @Input() itemsPerPage: number;
  @Input() loading: boolean;
  @Input() pagesToShow: number;

  //@Output() goPrev = new EventEmitter<boolean>();
  //@Output() goNext = new EventEmitter<boolean>();
  @Output() goPage = new EventEmitter<number>();

  pages: number[] = [];

  constructor() { console.log('PaginationComponent.constructor'); }
   
  

  ngOnChanges(change: any){
    console.log('PaginationComponent.OnChanges');
    console.log(change);
    
    if (change.totalItems || change.itemsPerPage || change.currentPage){
      
      console.log('Detected change');
      this.pages = this.getPages();
    }
  }

  getMin(): number {
    return ((this.itemsPerPage * this.currentPage) - this.itemsPerPage) + 1;
  }

  getMax(): number {
    let max = this.itemsPerPage * this.currentPage;
    if (max > this.totalItems) {
      max = this.totalItems;
    }
    return max;
  }

  onChangePage(n: number): void {
    this.goPage.emit(n);
  }
  
  /*
  onPrev(): void {
    this.goPrev.emit(true);
  }

  onNext(next: boolean): void {
    this.goNext.emit(next);
  }
  */

  totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage) || 0;
  }

  isLastPage(): boolean {
    return this.itemsPerPage * this.currentPage >= this.totalItems;
  }

  private getPages(): number[] {
    console.log('Pagination.component.getPages()');
    console.log(`this.pagesToShow: ${this.pagesToShow}`);
    const c = Math.ceil(this.totalItems / this.itemsPerPage);
    console.log(`last page: ${c}`);
    const p = this.currentPage || 1;
    const pagesToShow = this.pagesToShow || c;
    const pages: number[] = [];
    pages.push(p);
    const times = pagesToShow - 1;
    for (let i = 0; i < times; i++) {
      //console.log('getPages for');  
      if (pages.length < pagesToShow) {
       // console.log('getPages not length enough');
        if (Math.min.apply(null, pages) > 1) {
          //  console.log('getPages adding page before');
          pages.push(Math.min.apply(null, pages) - 1);
        }
      }
      if (pages.length < pagesToShow) {
       // console.log('getPages not length enough');
        if (Math.max.apply(null, pages) < c) {
        //s    console.log('getPages adding page after');
          pages.push(Math.max.apply(null, pages) + 1);
        }
      }
    }
    console.log('pages: ', pages);
    pages.sort((a, b) => a - b);
    return pages;
  }
}