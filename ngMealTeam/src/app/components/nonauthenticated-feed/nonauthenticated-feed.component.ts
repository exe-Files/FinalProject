import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-nonauthenticated-feed',
  templateUrl: './nonauthenticated-feed.component.html',
  styleUrls: ['./nonauthenticated-feed.component.css']
})
export class NonauthenticatedFeedComponent implements OnInit {

  recipes: Recipe[] = [];
  descriptionStatusTF: boolean[] = [];
  recipeStatusTF: boolean[] = [];
  search: string = '';

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
   this.loadAllRecipes();
  }

  loadAllRecipes() {
    this.recipeService.indexUnauthenticated().subscribe(
      data => {

        this.recipes = data.reverse();
        this.initializeArrays();

      },

      error => { console.error('Error retrieving recipes from recipeService: ' + error);}
    );
  }

  initializeArrays() {
    this.descriptionStatusTF = [];
    this.recipeStatusTF = [];
    for (let i = 0; i < this.recipes.length; i++) {
      this.descriptionStatusTF.push(true);
      this.recipeStatusTF.push(false);
      // this.ratingStatusTF.push(false);
    }
  }

  checkNaN(n: number){
    return Number.isNaN(n);
  }

  getRatingAverage(i: number){
    let average = 0;
    for (let index = 0; index < this.recipes[i].ratings.length; index++) {
      average += this.recipes[i].ratings[index].starRating;
    }
    return average /= this.recipes[i].ratings.length;
  }

  descriptionStatus(index : number){
    this.descriptionStatusTF[index] = true;
    this.recipeStatusTF[index] = false;
    // this.ratingStatusTF[index] = false;
  }
  recipeStatus(index : number){
    this.descriptionStatusTF[index] = false;
    this.recipeStatusTF[index] = true;
    // this.ratingStatusTF[index] = false;
  }

  searchRecipes(){
    this.recipeService.indexByKeywordUnauthenticated(this.search).subscribe(
      data => {
        this.recipes = data.reverse();
        this.initializeArrays();
      },
      error => { console.error('Error retrieving recipes from recipeService: ' + error);}
    );
  }

}
