import {Recipe} from '../type/recipes'
import {renderRecipes} from '../recipes_utils'
import {OneRecipe} from '../type/one-recipe'

export const getAllRecipes = async () => {
    let recipesArray: Array<Recipe> = []
    const loader = $('<div>').addClass('products__loader').appendTo($('.recipe-Box'))
    const url = 'http://localhost:3001/recipes/by-all'
    await fetch(url, {
        method: 'GET'
    })
        .then(async res => {
            recipesArray = recipesArray.concat(JSON.parse(await res.text()))
        })
        .catch(error => {
            $('<div>').addClass('products__error').text(error).appendTo($('.loader-container')).css('color', 'red').css('font-size', '30px')
        })
        .finally(() => {
            loader.remove()
        })

    recipesArray.forEach(recipe => {
        renderRecipes(recipe.recipeName, recipe.recipeId, recipe.ingredients)
    })

    return recipesArray
}

export const deleteRecipe = async (recipeId: number) => {
    const url: string = `http://localhost:3001/recipes?recipesId=${recipeId}`
    await fetch(url, {
        method: 'DELETE',
    })
        .then((response) => response.json())
        .catch(error => {
            alert(error)
        })
}

export const addNewRecipe = async (recipeName: string) => {
    const url = `http://localhost:3001/recipes?recipeName=${recipeName}`
    fetch(url, {
        method: 'POST',
    })
        .catch(error => {
            alert(`cant add ${recipeName}` + error)
        })
}

export const getOneRecipe = async (recipesName: string) => {
    let recipe: OneRecipe
    const url = `http://localhost:3001/recipes/by-name?recipeName=${recipesName}`
    await fetch(url, {
        method: 'GET',
    })
        .then(async res => {
            recipe = JSON.parse(await res.text())
        })
        .catch(error => {
            $('<div>').addClass('products__error').text(error).appendTo($('.loader-container')).css('color', 'red').css('font-size', '30px')
        })

    return recipe
}
