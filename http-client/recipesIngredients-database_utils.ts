import {RecipesIngredients} from '../type/recipesIngredients'
import {OneRecipe} from '../type/one-recipe'

export const getRecipesIngredientsId = async (recipeId: number) => {
    let recipesIngredientsArray: Array<RecipesIngredients> = []
    const url = `http://localhost:3001/recipesIngredients/by-recipe/?recipeId=${recipeId}`
    await fetch(url, {
        method: 'GET'
    })
        .then(async res => {
            recipesIngredientsArray = recipesIngredientsArray.concat(JSON.parse(await res.text()))
        })
        .catch(error => {
            alert(error)
        })

    const recipesIngredientsId: Array<number> = recipesIngredientsArray.map(recipesIngredients => {
        return recipesIngredients.recipesIngredientsId
    })

    return recipesIngredientsId
}

export const deleteRecipesIngredients = async (recipesIngredientsId: number) => {
    const url: string = `http://localhost:3001/recipesIngredients?recipesIngredientsId=${recipesIngredientsId}`
    await fetch(url, {
        method: 'DELETE',
    })
        .catch(error => {
            alert(error)
        })
}

export const addNewRecipesIngredients = async (ingredientId: number, recipesId: number) => {
    const url = 'http://localhost:3001/recipesIngredients'
    await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            recipesId: recipesId,
            ingredientsId: ingredientId
        })
    })
        .then((response) => response.json())
        .catch(error => {
            alert(error)
        })
}

export const findRecipes = async (ingredientsId: Array<number>) => {
    let arrayOfRecipes: Array<OneRecipe> = []
    const url = `http://localhost:3001/recipesIngredients/by-ingredients?ingredientsId=${ingredientsId}`
    await fetch(url, {
        method: 'GET',
    })
        .then((response) => response.json())
        .then((json) => {
            arrayOfRecipes = arrayOfRecipes.concat(json)
        })
        .catch(() => {
            $('.products__error').remove()
            $('<div>').addClass('products__error').appendTo($('.mish-mash')).css('color', 'red').css('font-size', '30px').text('error')
        })

    return arrayOfRecipes
}

export const findOneRecipes = async (ingredientsId: number) => {
    let recipe: Array<OneRecipe> = []
    const url = `http://localhost:3001/recipesIngredients/by-one-ingredients?ingredientsId=${ingredientsId}`
    await fetch(url, {
        method: 'GET',
    })
        .then(async res => {
            recipe = recipe.concat(JSON.parse(await res.text()))
        })
        .catch(() => {
            $('.products__error').remove()
            $('<div>').addClass('products__error').appendTo($('.mish-mash')).css('color', 'red').css('font-size', '30px').text('error')
        })

    return recipe
}