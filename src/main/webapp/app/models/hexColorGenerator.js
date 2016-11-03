"use strict";
var HexColorGenerator = (function () {
    function HexColorGenerator() {
        this.colors = ['#00ced1', '#1e90ff', '#c393f6', '#ba3232', '#beed00', '#26857e', '#ffe700', '#f4200d', '#b51138'];
        this.colorsGenerated = new Set();
        this.colorsGenerated.add("#ffffff");
        this.colorsGenerated.add("#000000");
    }
    HexColorGenerator.prototype.getARandomColor = function () {
        var color;
        do {
            color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        } while (this.colorsGenerated.has(color));
        this.colorsGenerated.add(color);
        return color;
    };
    HexColorGenerator.prototype.getAColor = function () {
        var color;
        if (this.colors.length > 0) {
            var i = Math.floor(Math.random() * this.colors.length);
            color = this.colors.splice(i, 1)[0];
            this.colorsGenerated.add(color);
        }
        else {
            color = this.getARandomColor();
        }
        return color;
    };
    return HexColorGenerator;
}());
exports.HexColorGenerator = HexColorGenerator;
//# sourceMappingURL=hexColorGenerator.js.map