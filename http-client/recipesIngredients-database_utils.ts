import { RecipesIngredients, OneRecipe } from '../types'
import { baseUrl } from '../fetch-config'

export const getRecipesIngredientsId = (recipeId: number) => {
    const loader = $('<div>').addClass('products__loader').appendTo($('.recipe-Box'))
    let recipesIngredientsArray: Array<RecipesIngredients> = []

    return fetch(`${baseUrl}recipesIngredients/by-recipe/?recipeId=${recipeId}`)
        .then(async res => {
            recipesIngredientsArray = recipesIngredientsArray.concat(JSON.parse(await res.text()))
        })
        .then(() => {
            const recipesIngredientsId: Array<number> = recipesIngredientsArray.map(recipesIngredients => {
                return recipesIngredients.recipesIngredientsId
            })

            return recipesIngredientsId
        })
        .catch(error => {
            $('<div>')
                .addClass('error-menu')
                .text(error).appendTo($('.mish-mash'))
        })
        .finally(() => loader.remove())
}

export const deleteRecipesIngredients = (recipesIngredientsId: number) => {
    return fetch(`${baseUrl}recipesIngredients?recipesIngredientsId=${recipesIngredientsId}`, {
        method: 'DELETE',
    })
        .then((response) => response.json())
        .catch(error => {
            $('<div>')
                .addClass('error-menu')
                .text(error).appendTo($('.mish-mash'))
        })
}

export const addNewRecipesIngredients = (ingredientId: number, recipesId: number) => {
    return fetch(`${baseUrl}recipesIngredients`, {
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
        .then( response =>  response.json())
        .catch(error => {
            $('<div>')
                .addClass('error-menu')
                .text(error).appendTo($('.mish-mash'))
        })
}

export const findRecipes = (ingredientsId: Array<number>) => {
    let arrayOfRecipes: Array<OneRecipe> = []

    return fetch(`${baseUrl}recipesIngredients/by-ingredients?ingredientsId=${ingredientsId}`)
        .then((response) => response.json())
        .then((json) => {
            arrayOfRecipes = arrayOfRecipes.concat(json)

            return arrayOfRecipes
        })
        .catch(error => {
            $('<div>')
                .addClass('error-menu')
                .text(error).appendTo($('.mish-mash'))
        })
}

export const findOneRecipes = (ingredientsId: number) => {
    let recipe: Array<OneRecipe> = []

    return fetch(`${baseUrl}recipesIngredients/by-one-ingredients?ingredientsId=${ingredientsId}`)
        .then(async res => {
            recipe = recipe.concat(JSON.parse(await res.text()))

            return recipe
        })
        .catch(error => {
            $('<div>')
                .addClass('error-menu')
                .text(error).appendTo($('.mish-mash'))
        })
}