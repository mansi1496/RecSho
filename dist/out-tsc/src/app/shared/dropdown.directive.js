import { __decorate, __metadata } from "tslib";
import { Directive, HostListener, HostBinding } from '@angular/core';
var DropdownDirective = /** @class */ (function () {
    function DropdownDirective() {
        this.isOpen = false;
    }
    DropdownDirective.prototype.toggleOpen = function () {
        this.isOpen = !this.isOpen;
    };
    __decorate([
        HostBinding('class.open'),
        __metadata("design:type", Object)
    ], DropdownDirective.prototype, "isOpen", void 0);
    __decorate([
        HostListener('click'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DropdownDirective.prototype, "toggleOpen", null);
    DropdownDirective = __decorate([
        Directive({
            selector: '[appDropdown]'
        })
    ], DropdownDirective);
    return DropdownDirective;
}());
export { DropdownDirective };
//# sourceMappingURL=dropdown.directive.js.map