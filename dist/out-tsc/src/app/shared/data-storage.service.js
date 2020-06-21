import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
var DataStorageService = /** @class */ (function () {
    function DataStorageService(http, recipeService) {
        this.http = http;
        this.recipeService = recipeService;
    }
    DataStorageService.prototype.storeRecipes = function () {
        var recipes = this.recipeService.getRecipes();
        this.http
            .put('https://recsho-b6542.firebaseio.com/recipes.json', recipes)
            .subscribe(function (response) {
            console.log(response);
        });
    };
    DataStorageService.prototype.fetchRecipes = function () {
        var _this = this;
        this.http
            .get('https://recsho-b6542.firebaseio.com/recipes.json')
            // .pipe(
            //   map(recipes => {
            //     return recipes.map(recipe => {
            //       return {
            //         ...recipe,
            //         ingredients: recipe.ingredients ? recipe.ingredients : []
            //       };
            //     });
            //   })
            // )
            .subscribe(function (recipes) {
            _this.recipeService.setRecipes(recipes);
        });
    };
    DataStorageService = __decorate([
        Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [HttpClient, RecipeService])
    ], DataStorageService);
    return DataStorageService;
}());
export { DataStorageService };
//# sourceMappingURL=data-storage.service.js.map