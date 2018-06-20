export const selectTemplate = `<div class="ovt/select">
<ng-content></ng-content>
<select #select [name]="name" (change)="onChange(select.value)">
  <option *ngFor="let op of options" [value]="op.value"  [selected]="op.value === selection">
  {{op.textContent}} 
  </option>
</select>
</div>`