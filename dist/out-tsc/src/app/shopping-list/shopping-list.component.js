import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
var ShoppingListComponent = /** @class */ (function () {
    function ShoppingListComponent(slService) {
        this.slService = slService;
    }
    ShoppingListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ingredients = this.slService.getIngredients();
        this.subscription = this.slService.ingredientsChanged
            .subscribe(function (ingredients) {
            _this.ingredients = ingredients;
        });
    };
    ShoppingListComponent.prototype.onEditItem = function (index) {
        this.slService.startedEditing.next(index);
    };
    ShoppingListComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    ShoppingListComponent = __decorate([
        Component({
            selector: 'app-shopping-list',
            templateUrl: './shopping-list.component.html',
            styleUrls: ['./shopping-list.component.css']
        }),
        __metadata("design:paramtypes", [ShoppingListService])
    ], ShoppingListComponent);
    return ShoppingListComponent;
}());
export { ShoppingListComponent };
//# sourceMappingURL=shopping-list.component.js.map