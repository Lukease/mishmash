import {addToRecipe, removeFromRecipe} from './recipes_utils'
import {ingredientData} from './type/ingredient-data'
import {getAllIngredients} from './http-client/ingredients-database_utils'
import {findRecipes} from './http-client/recipesIngredients-database_utils'
import {OneRecipe} from './type/one-recipe'

let selectedProductsId: Array<number> = []

const renderCorrectRecipes = (name: string) => {
    const recipesBox = $('.recipe-Box')
    const correctRecipe = $('<div>').addClass('ready-recipe').appendTo(recipesBox)

    $('<div>').addClass('ready-recipe__name').appendTo(correctRecipe).text(name).css('font-weight', 'bold').css('justify-content', 'center')

    return recipesBox
}

export const renderMishMashChoice = async () => {
    const mishMash = $('<div>').addClass('mish-mash').appendTo($('.action'))
    const mishMashProducts = $('<div>').addClass('mish-mash__product').appendTo(mishMash)

    $('<div>').addClass('mish-mash__matching-recipe').appendTo('.recipes')
    $('<div>').addClass('title-mish-mash').appendTo(mishMash).text('you can prepare with selected ingredients: ')
    $('<div>').appendTo('.mish-mash').addClass('recipe-Box')

    selectedProductsId = []

    const ingredientArray: Array<ingredientData> = []
    const ingredients = await getAllIngredients(ingredientArray)

    ingredients.forEach(product => {
        const newProduct = $('<div>').addClass('recipes__products--div').appendTo(mishMashProducts).text(product.name).attr('ingredientsId:', product.ingredientsId)

        newProduct.click(event => {
            $('.recipe-Box').children('.ready-recipe').remove()

            if (!$(event.target).hasClass('recipes__products--div')) {
                removeFromRecipe(event)

                const ingredientsId: number = parseInt($(event.target).attr('ingredientsId:'))

                selectedProductsId = selectedProductsId.filter(id => id !== ingredientsId)
                findCorrectRecipe()

                return
            }
                addToRecipe(event)

                const ingredientsId: number = parseInt($(event.target).attr('ingredientsId:'))

                selectedProductsId = selectedProductsId.concat(ingredientsId)

                findCorrectRecipe()
        })
    })
}

const findCorrectRecipe = async () => {
    const arrayOfCorrectRecipes: Array<OneRecipe> = await findRecipes(selectedProductsId)

    arrayOfCorrectRecipes.forEach(recipes => {
        renderCorrectRecipes(recipes.name)
    })
}
