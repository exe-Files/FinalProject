import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Recipe } from '../models/recipe';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private url = environment.baseUrl + "api/recipes"

  constructor(private http: HttpClient, private authService: AuthService) { }

  public index() : Observable<Recipe[]>{
    return this.http.get<Recipe[]>(this.url, this.getHttpOptions())
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError("Error getting recipes in RecipeService:" + err);
        })
      );
  }

  public indexByUsername() : Observable<Recipe[]>{
    return this.http.get<Recipe[]>(this.url + "/username", this.getHttpOptions())
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError("Error getting recipes in RecipeService:" + err);
        })
      );
  }

  getHttpOptions(){
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': `Basic ${credentials}`
      })
    };
  return httpOptions;
  }

  public create(recipe: Recipe, rImageUrl: string){
    rImageUrl = btoa(rImageUrl);
    return this.http.post<Recipe>(this.url + "/" + rImageUrl, recipe, this.getHttpOptions())
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('Error creating recipe: ' + err);
        })
      );
  }
}
