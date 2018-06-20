export const paginationTemplate = `<div id="ovt-pagination" *ngIf=" (!loading) && (totalItems > 0)">

<nav class="pages">
<ul class="pagination justify-content-center">
  <li class="page-item" [ngClass]="{ disabled: (currentPage == 1) || loading }">
    <a class="page-link"  tabindex="-1" (click)="onChangePage(1)"><<</a>
  </li>
  <li class="page-item" [ngClass]="{ disabled: (currentPage == 1) || loading }">
    <a class="page-link"  tabindex="-1" (click)="onChangePage(currentPage == 1? currentPage : currentPage - 1)"><</a>
  </li>
  <li class="page-item" [ngClass]="{ active: page == currentPage }" *ngFor="let page of pages">
    <a class="page-link"  tabindex="1" (click)="onChangePage(page)">{{page}}</a>
  </li>
  <li class="page-item" class="page-item" [ngClass]="{ disabled: isLastPage() || loading }">
    <a class="page-link"   tabindex="-1" (click)="onChangePage(isLastPage()? currentPage : currentPage + 1)">></a>
  </li>
  <li class="page-item" class="page-item" [ngClass]="{ disabled: isLastPage() || loading }">
    <a class="page-link"   tabindex="-1" (click)="onChangePage(totalPages())">>></a>
  </li>
</ul>
</nav>
<div class="description">
		<span class="total-items">{{ getMin() }} - {{ getMax() }} de {{ totalItems }}</span>
		<span class="total-pages"> {{ totalPages() }} páginas</span>
</div>
</div>`