"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectTemplate = "<div class=\"ovt/select\">\n<ng-content></ng-content>\n<select #select [name]=\"name\" (change)=\"onChange(select.value)\">\n  <option *ngFor=\"let op of options\" [value]=\"op.value\"  [selected]=\"op.value === selection\">\n  {{op.textContent}} \n  </option>\n</select>\n</div>";
//# sourceMappingURL=select.html.js.map