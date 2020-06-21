import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
var RecipeItemComponent = /** @class */ (function () {
    function RecipeItemComponent() {
    }
    RecipeItemComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Input(),
        __metadata("design:type", Recipe)
    ], RecipeItemComponent.prototype, "recipe", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], RecipeItemComponent.prototype, "index", void 0);
    RecipeItemComponent = __decorate([
        Component({
            selector: 'app-recipe-item',
            templateUrl: './recipe-item.component.html',
            styleUrls: ['./recipe-item.component.css']
        })
    ], RecipeItemComponent);
    return RecipeItemComponent;
}());
export { RecipeItemComponent };
//# sourceMappingURL=recipe-item.component.js.map