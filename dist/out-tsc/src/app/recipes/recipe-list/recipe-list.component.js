import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
var RecipeListComponent = /** @class */ (function () {
    function RecipeListComponent(recipeService, router, route) {
        this.recipeService = recipeService;
        this.router = router;
        this.route = route;
    }
    RecipeListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.recipeService.recipesChanged
            .subscribe(function (recipes) {
            _this.recipes = recipes;
        });
        this.recipes = this.recipeService.getRecipes();
    };
    RecipeListComponent.prototype.onNewRecipe = function () {
        this.router.navigate(['new'], { relativeTo: this.route });
    };
    RecipeListComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    RecipeListComponent = __decorate([
        Component({
            selector: 'app-recipe-list',
            templateUrl: './recipe-list.component.html',
            styleUrls: ['./recipe-list.component.css']
        }),
        __metadata("design:paramtypes", [RecipeService,
            Router,
            ActivatedRoute])
    ], RecipeListComponent);
    return RecipeListComponent;
}());
export { RecipeListComponent };
//# sourceMappingURL=recipe-list.component.js.map