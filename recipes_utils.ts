import type {Recipe} from './type/recipes'
import {deleteRecipe, getAllRecipes} from './database-utils/recipes-database_utils'
import {ingredient} from './type/ingredients'
import {getAllIngredients} from './database-utils/ingredients-database_utils'
import {ingredientData} from './type/ingredient-data'

let allRecipe: Array<Recipe> = []

export const renderSaveRecipes = async () => {
    await getAllRecipes()
}

export const addToRecipe = (event: JQuery.ClickEvent) => {
    const selectedProduct = $(event.target)

    selectedProduct.removeClass()
    selectedProduct.addClass('recipes__products--select')
}

export const removeFromRecipe = (event: JQuery.ClickEvent) => {
    const selectedProduct = $(event.target)

    selectedProduct.removeClass()
    selectedProduct.addClass('recipes__products--div')
}

export const renderRecipesMenu = async () => {
    const recipes = $('<div>').addClass('recipes').appendTo($('.action'))
    const header = $('<div>').addClass('recipes__header').appendTo(recipes).toggle()
    $('<input>').addClass('recipes__header--text').appendTo(header).attr('placeholder', 'wpisz nazwe przepisu').css('margin-left', '20px')
    const recipesProducts = $('<div>').addClass('recipes__products').appendTo(recipes)
    const button = $('<button>').addClass('recipes__header--button').appendTo(header).text('add')
    $('<div>').addClass('recipe-Box').appendTo('.recipes')

    // const products = getFromLocalStorage<Array<string>>('products')

    // productsName = productsName.concat(products)
    // productsName.toString().split(',')

    const ingredientArray: Array<ingredientData> = []
    const ingredients = await getAllIngredients(ingredientArray)

    ingredients.forEach(object => {
        const ingredientDiv = $('<div>').appendTo($(`.recipes__products`)).addClass('recipes__products--div').attr('ingredientsId:', object.ingredientsId).text(object.name)

        ingredientDiv.click(event => {
            if (!$(event.target).hasClass('recipes__products--div')) {
                removeFromRecipe(event)

                return
            }
            addToRecipe(event)
        })
    })


    button.click(() => {
        const recipesName = String($(event.target).siblings().val())
        //
        // if (recipesName !== '' && $('.recipes__products').children().hasClass('recipes__products--select')) {
        //     const arrayOfProducts = $('.recipes__products--select').toArray()
        //     const array: Array<ingredient> = arrayOfProducts.map(object => object.innerHTML)
        //     const recipe: Recipe = {
        //         recipeName: recipesName,
        //         ingredients: array
        //     }
        //
        //     $('.recipes__header').toggle()
        //     renderRecipes(recipe.name, recipe.products)
        //
        //     allRecipe = allRecipe.concat(recipe)
        //
        //     // setToLocalStorage('recipes', allRecipe)
        // }
    })

    return recipes
}

export const renderRecipes = (name: string, id: number, array: Array<ingredient>) => {
    const recipesBox = $('.recipe-Box')
    const readyRecipe = $('<div>').addClass('ready-recipe').appendTo(recipesBox).attr('recipesId:', id)
    const trashIcon = $('<button>').appendTo(readyRecipe).addClass('ready-recipe__trash')

    $('<div>').addClass('ready-recipe__title').appendTo(readyRecipe).text(`Name: `).css('font-weight', 'bold').css('justify-content', 'center')
    $('<div>').addClass('ready-recipe__name').appendTo(readyRecipe).text(name)
    $('<div>').addClass('ready-recipe__product').appendTo(readyRecipe).text('Products: ').css('font-weight', 'bold').css('justify-content', 'center')

    array.forEach(product => {
        $('<div>').addClass('ready-recipe__product').appendTo(readyRecipe).text(product.ingredientName)
    })

    trashIcon.click(async event => {
        const selectedProduct = $(event.target)

        selectedProduct.parents('.ready-recipe').remove()

        const recipesId: string = String(selectedProduct.parent('.ready-recipe').attr('recipesId:'))

        await deleteRecipe(recipesId)
    })
}

