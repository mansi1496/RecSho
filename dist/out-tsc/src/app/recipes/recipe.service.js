import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
var RecipeService = /** @class */ (function () {
    function RecipeService(slService) {
        this.slService = slService;
        this.recipesChanged = new Subject();
        // private recipes: Recipe[] = [
        //   new Recipe(
        //     'Tasty Schnitzel',
        //     'A super-tasty Schnitzel - just awesome!',
        //     'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
        //     [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
        //   ),
        //   new Recipe(
        //     'Big Fat Burger',
        //     'What else you need to say?',
        //     'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
        //     [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
        //   )
        // ];
        this.recipes = [];
    }
    RecipeService.prototype.setRecipes = function (recipes) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    };
    RecipeService.prototype.getRecipes = function () {
        return this.recipes.slice();
    };
    RecipeService.prototype.getRecipe = function (index) {
        return this.recipes[index];
    };
    RecipeService.prototype.addIngredientsToShoppingList = function (ingredients) {
        this.slService.addIngredients(ingredients);
    };
    RecipeService.prototype.addRecipe = function (recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    };
    RecipeService.prototype.updateRecipe = function (index, newRecipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    };
    RecipeService.prototype.deleteRecipe = function (index) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    };
    RecipeService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ShoppingListService])
    ], RecipeService);
    return RecipeService;
}());
export { RecipeService };
//# sourceMappingURL=recipe.service.js.map