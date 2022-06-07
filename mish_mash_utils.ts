import { addToRecipe, removeFromRecipe } from './recipes_utils'
import { getFromLocalStorage } from './local_storage_utils'
import type { Recipe } from './type/recipes'

let selectedProducts: Array<string> = []
let recipes: Array<Recipe> = []

const renderCorrectRecipes = (name: string, data: Array<string>) => {
    const recipesBox = $('.recipe-Box')
    const correctRecipe = $('<div>').addClass('ready-recipe').appendTo(recipesBox)

    $('<div>').addClass('ready-recipe__title').appendTo(correctRecipe).text(`Name: `).css('font-weight', 'bold').css('justify-content', 'center')
    $('<div>').addClass('ready-recipe__name').appendTo(correctRecipe).text(name)
    $('<div>').addClass('ready-recipe__product').appendTo(correctRecipe).text('Products: ').css('font-weight', 'bold').css('justify-content', 'center')
    data.forEach(product => {
        $('<div>').addClass('ready-recipe__product').appendTo(correctRecipe).text(product)
    })

    return recipesBox
}

export const renderMishMashChoice = () => {
    const mishMash = $('<div>').addClass('mish-mash').appendTo($('.action'))
    const mishMashProducts = $('<div>').addClass('mish-mash__product').appendTo(mishMash)
    $('<div>').addClass('mish-mash__matching-recipe').appendTo('.recipes')
    $('<div>').addClass('title-mish-mash').appendTo(mishMash).text('you can prepare with selected ingredients: ')
    $('<div>').appendTo('.mish-mash').addClass('recipe-Box')

    const products = getFromLocalStorage<Array<string>>('products')

    let productsName: Array<string> = []

    recipes = getFromLocalStorage<Array<Recipe>>('recipes')
    productsName = productsName.concat(products)
    productsName.forEach(product => {
        const newProduct = $('<div>').addClass('recipes__products--div').appendTo(mishMashProducts).text(product)

        newProduct.click(event => {
            $('.recipe-Box').children('.ready-recipe').remove()

            if (!$(event.target).hasClass('recipes__products--div')) {
                removeFromRecipe(event)
                findCorrectRecipe()

                return
            }
            addToRecipe(event)
            findCorrectRecipe()
        })
    })
}

const findCorrectRecipe = () => {
    selectedProducts = $('.recipes__products--select').toArray().map(object => object.innerHTML)
    recipes.forEach(recipes => {
        const correctProducts = recipes.products.every((product) => selectedProducts.includes(product))

        if (correctProducts === true) {
            renderCorrectRecipes(recipes.name, recipes.products)
        }
    })
}
