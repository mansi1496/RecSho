import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes : Recipe[] = [
  //   new Recipe('Chocolate Pie',
  //   'What it contains?',
  //   'https://storage.needpix.com/rsynced_images/cake-1971552_1280.jpg',
  //   [
  //       new Ingredient('milk', 1),
  //       new Ingredient('chocolate', 1)
  //   ]
  //   ),
  //   new Recipe('Vanilla Pie',
  //   'What it contains?',
  //   'https://s3-eu-west-1.amazonaws.com/cdn.nordic-wewalka/styles/recipe_banner/s3/ww-blaetterteigpasteten_2905.jpg?itok=_vQ1eOCv',
  //   [
  //       new Ingredient('milk', 1),
  //       new Ingredient('vanilla esence', 1),
  //       new Ingredient('white chocolate',1)
  //   ]
  //   ),
  //   new Recipe('Cocolate Vanilla Tart',
  //   'What it contains?',
  //   'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ9t-wAuTjEDgfpIiao6ilVK0Ys5xiL3A0AhI456au-Rrs6Y4OD&usqp=CAU',
  //   [
  //       new Ingredient('milk', 1),
  //       new Ingredient('chocolate', 1),
  //       new Ingredient('vanilla cream', 1),
  //       new Ingredient('flour', 1)
  //   ]
  //   )
  // ];
  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
