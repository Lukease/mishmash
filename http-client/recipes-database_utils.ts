import {Recipe} from '../type/recipes'
import {renderRecipes} from '../recipes_utils'

export const getAllRecipes = () => {
    let recipesArray: Array<Recipe> = []
    const loader = $('<div>').addClass('products__loader').appendTo($('.recipe-Box'))
    const url = 'http://localhost:3001/recipes/by-all'

    return fetch(url, {
        method: 'GET'
    })
        .then(async res => {
            recipesArray = recipesArray.concat(JSON.parse(await res.text()))
        })
        .then(() => {
            recipesArray.forEach(recipe => {
                renderRecipes(recipe.recipeName, recipe.recipeId, recipe.ingredients)
            })
        })
        .catch(error => {
            $('<div>').addClass('products__error').text(error).appendTo($('.loader-container')).css('color', 'red').css('font-size', '30px')
        })
        .finally(() => {
            loader.remove()
        })
}

export const deleteRecipe = (recipeId: number) => {
    const url: string = `http://localhost:3001/recipes?recipesId=${recipeId}`

    return fetch(url, {
        method: 'DELETE',
    })
        .then((response) => response.json())
        .catch(error => {
            alert(JSON.stringify(error))
        })
}

export const addNewRecipe = (recipeName: string) => {
    const url = `http://localhost:3001/recipes?recipeName=${recipeName}`

    return fetch(url, {
        method: 'POST',
    })
        .catch(error => {
            alert(`cant add ${recipeName}` + error)
        })
}

export const getOneRecipe = (recipesName: string) => {
    const url = `http://localhost:3001/recipes/by-name?recipeName=${recipesName}`

    return fetch(url, {
        method: 'GET',
    })
        .then(async res => {
            return  JSON.parse(await res.text())
        })
        .catch(error => {
            $('<div>').addClass('products__error').text(error).appendTo($('.loader-container')).css('color', 'red').css('font-size', '30px')
        })
}
