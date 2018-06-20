"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var pagination_html_1 = require("./pagination.html");
var PaginationComponent = (function () {
    function PaginationComponent() {
        //@Output() goPrev = new EventEmitter<boolean>();
        //@Output() goNext = new EventEmitter<boolean>();
        this.goPage = new core_1.EventEmitter();
        this.pages = [];
        console.log('PaginationComponent.constructor');
    }
    PaginationComponent.prototype.ngOnChanges = function (change) {
        console.log('PaginationComponent.OnChanges');
        console.log(change);
        if (change.totalItems || change.itemsPerPage || change.currentPage) {
            console.log('Detected change');
            this.pages = this.getPages();
        }
    };
    PaginationComponent.prototype.getMin = function () {
        return ((this.itemsPerPage * this.currentPage) - this.itemsPerPage) + 1;
    };
    PaginationComponent.prototype.getMax = function () {
        var max = this.itemsPerPage * this.currentPage;
        if (max > this.totalItems) {
            max = this.totalItems;
        }
        return max;
    };
    PaginationComponent.prototype.onChangePage = function (n) {
        this.goPage.emit(n);
    };
    /*
    onPrev(): void {
      this.goPrev.emit(true);
    }
  
    onNext(next: boolean): void {
      this.goNext.emit(next);
    }
    */
    PaginationComponent.prototype.totalPages = function () {
        return Math.ceil(this.totalItems / this.itemsPerPage) || 0;
    };
    PaginationComponent.prototype.isLastPage = function () {
        return this.itemsPerPage * this.currentPage >= this.totalItems;
    };
    PaginationComponent.prototype.getPages = function () {
        console.log('Pagination.component.getPages()');
        console.log("this.pagesToShow: " + this.pagesToShow);
        var c = Math.ceil(this.totalItems / this.itemsPerPage);
        console.log("last page: " + c);
        var p = this.currentPage || 1;
        var pagesToShow = this.pagesToShow || c;
        var pages = [];
        pages.push(p);
        var times = pagesToShow - 1;
        for (var i = 0; i < times; i++) {
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
        pages.sort(function (a, b) { return a - b; });
        return pages;
    };
    return PaginationComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], PaginationComponent.prototype, "totalItems", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], PaginationComponent.prototype, "currentPage", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], PaginationComponent.prototype, "itemsPerPage", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], PaginationComponent.prototype, "loading", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], PaginationComponent.prototype, "pagesToShow", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], PaginationComponent.prototype, "goPage", void 0);
PaginationComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'ovt-pagination',
        template: pagination_html_1.paginationTemplate,
        styleUrls: ['pagination.css']
    }),
    __metadata("design:paramtypes", [])
], PaginationComponent);
exports.PaginationComponent = PaginationComponent;
//# sourceMappingURL=pagination.component.js.map