import {addNewRecipe, deleteRecipe, getAllRecipes, getOneRecipe} from './http-client/recipes-database_utils'
import {ingredient} from './type/ingredients'
import {getAllIngredients} from './http-client/ingredients-database_utils'
import {ingredientData} from './type/ingredient-data'
import {
    addNewRecipesIngredients,
    deleteRecipesIngredients,
    getRecipesIngredientsId
} from './http-client/recipesIngredients-database_utils'
import {OneRecipe} from "./type/one-recipe";

export const renderSaveRecipes = () => {
    getAllRecipes()
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
    $('<div>').addClass('recipes__products').appendTo(recipes)

    const button = $('<button>').addClass('recipes__header--button').appendTo(header).text('add')
    const recipeBox = $('<div>').addClass('recipe-Box').appendTo('.recipes')

    const ingredientArray: Array<ingredientData> = []
    const ingredients: Array<ingredientData> = await getAllIngredients(ingredientArray)

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

    button.click(async event => {
        const recipesName = String($(event.target).siblings().val())

        if (recipesName !== '' && $('.recipes__products').children().hasClass('recipes__products--select')) {
            const arrayOfProducts = $('.recipes__products--select').toArray()
            const array: Array<string> = arrayOfProducts.map(object => object.getAttribute('ingredientsId:'))

            await addNewRecipe(recipesName)

            const recipe: OneRecipe = await getOneRecipe(recipesName)

            const addRecipeToDatabase = async () => {
                for (const object of array) {
                    const ingredientsId: number = parseInt(String(object))
                    const recipeId: number = recipe.recipesId

                    await addNewRecipesIngredients(ingredientsId, recipeId)
                }
            }
            await addRecipeToDatabase()
            header.toggle()
            recipeBox.children('.ready-recipe').remove()

            $(event.target).siblings().val('')

            renderSaveRecipes()
        }
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
        $('<div>').addClass('ready-recipe__product').appendTo(readyRecipe).text(product.ingredientName).attr('ingredientId:', product.ingredientId)
    })

    trashIcon.click(async event => {
        const selectedProduct = $(event.target)

        selectedProduct.parents('.ready-recipe').remove()

        const recipeId: number = parseInt(selectedProduct.parent('.ready-recipe').attr('recipesId:'))
        const recipesIngredientsId: Array<number> = await getRecipesIngredientsId(recipeId)

        recipesIngredientsId.forEach(recipesIngredientsId => {
            deleteRecipesIngredients(recipesIngredientsId)
        })
        await deleteRecipe(recipeId)
    })
}

