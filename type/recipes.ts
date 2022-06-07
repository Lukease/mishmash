import {ingredient} from "./ingredients";

export type Recipe = {
    recipeId: number,
    recipeName: string,
    ingredients: Array<ingredient>
}