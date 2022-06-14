import { Recipe } from '../types'
import { renderRecipes } from '../recipes_utils'
import { baseUrl } from '../fetch-config'

export const getAllRecipes = () => {
    let recipesArray: Array<Recipe> = []
    const loader = $('<div>')
        .addClass('products__loader')
        .appendTo($('.recipe-Box'))

    return fetch(`${baseUrl}recipes/by-all`)
        .then(async response => {
            recipesArray = recipesArray.concat(JSON.parse(await response.text()))
        })
        .then(() => {
            recipesArray.forEach(recipe => {
                renderRecipes(recipe.recipeName, recipe.recipeId, recipe.ingredients)
            })
        })
        .catch(function (error: string){
            $('<div>')
                .addClass('error-menu')
                .text(error).appendTo($('.recipes'))
        })
        .then(() => {
            loader.remove()
        })
}

export const deleteRecipe = (recipeId: number) => {
    return fetch(`${baseUrl}recipes?recipesId=${recipeId}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .catch(error => {
            $('<div>')
                .addClass('error-menu')
                .text(error).appendTo($('.recipes'))
        })
}

export const addNewRecipe = (recipeName: string) => {
    return fetch(`${baseUrl}recipes?recipeName=${recipeName}`, {
        method: 'POST',
    })
        .catch(error => {
            $('<div>')
                .addClass('error-menu')
                .text(error).appendTo($('.recipes'))
        })
}

export const getOneRecipe = (recipesName: string) => {
    return fetch(`${baseUrl}recipes/by-name?recipeName=${recipesName}`)
        .then(async res => {
            return  JSON.parse(await res.text())
        })
        .catch(error => {
            $('<div>')
                .addClass('error-menu')
                .text(error).appendTo($('.recipes'))
        })
}
