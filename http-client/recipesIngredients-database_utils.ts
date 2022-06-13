import {RecipesIngredients} from '../type/recipesIngredients'
import {OneRecipe} from '../type/one-recipe'

export const getRecipesIngredientsId = (recipeId: number) => {
    const loader = $('<div>').addClass('products__loader').appendTo($('.recipe-Box'))
    let recipesIngredientsArray: Array<RecipesIngredients> = []
    const url = `http://localhost:3001/recipesIngredients/by-recipe/?recipeId=${recipeId}`

    return fetch(url, {
        method: 'GET'
    })
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
            alert(error)
        })
        .finally(() => loader.remove())
}

export const deleteRecipesIngredients = (recipesIngredientsId: number) => {
    const url: string = `http://localhost:3001/recipesIngredients?recipesIngredientsId=${recipesIngredientsId}`

    return fetch(url, {
        method: 'DELETE',
    })
        .then((response) => response.json())
        .catch(error => {
            alert(error)
        })
}

export const addNewRecipesIngredients = (ingredientId: number, recipesId: number) => {
    const url = 'http://localhost:3001/recipesIngredients'

    return fetch(url, {
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
            alert(error)
        })
}

export const findRecipes = (ingredientsId: Array<number>) => {
    let arrayOfRecipes: Array<OneRecipe> = []
    const url = `http://localhost:3001/recipesIngredients/by-ingredients?ingredientsId=${ingredientsId}`

    return fetch(url, {
        method: 'GET',
    })
        .then((response) => response.json())
        .then((json) => {
            arrayOfRecipes = arrayOfRecipes.concat(json)

            return arrayOfRecipes
        })
        .catch(() => {
            $('.products__error').remove()
            $('<div>').addClass('products__error').appendTo($('.mish-mash')).css('color', 'red').css('font-size', '30px').text('error')
        })
}

export const findOneRecipes = (ingredientsId: number) => {
    let recipe: Array<OneRecipe> = []
    const url = `http://localhost:3001/recipesIngredients/by-one-ingredients?ingredientsId=${ingredientsId}`

    return fetch(url, {
        method: 'GET',
    })
        .then(async res => {
            recipe = recipe.concat(JSON.parse(await res.text()))

            return recipe
        })
        .catch(() => {
            $('.products__error').remove()
            $('<div>').addClass('products__error').appendTo($('.mish-mash')).css('color', 'red').css('font-size', '30px').text('error')
        })
}