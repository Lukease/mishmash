import { setToLocalStorage, getFromLocalStorageRecipe, getFromLocalStorage } from './local_storage_utils.js'
import type { Recipe } from './types'

let saveArrayOfRecipes: Array<Recipe> = []
let allRecipe: Array<Recipe> = []

export const renderSaveRecipes = () => {
    const recipes = getFromLocalStorageRecipe('recipes')

    saveArrayOfRecipes = saveArrayOfRecipes.concat(recipes)

    const renderedArrayProducts: Array<Recipe> =  saveArrayOfRecipes

    renderedArrayProducts.forEach(object => {
        renderRecipes(object.name, object.products)
    })
    allRecipe = saveArrayOfRecipes
    saveArrayOfRecipes = []
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

export const renderRecipesMenu = () => {
    const recipes = $('<div>').addClass('recipes').appendTo($('.action'))
    const header = $('<div>').addClass('recipes__header').appendTo(recipes).toggle()
    $('<input>').addClass('recipes__header--text').appendTo(header).attr('placeholder', 'wpisz nazwe przepisu').css('margin-left', '20px')
    const recipesProducts = $('<div>').addClass('recipes__products').appendTo(recipes)
    const button = $('<button>').addClass('recipes__header--button').appendTo(header).text('add')
    $('<div>').addClass('recipe-Box').appendTo('.recipes')

    const products = getFromLocalStorage('products')
    let productsName: Array<string> = []

    productsName = productsName.concat(products)
    productsName.toString().split(',')

    let splitProductsName = productsName.toString().split(',')

    splitProductsName.forEach(productName => {
        productName = productName.replaceAll('[', '').replaceAll('"', '').replaceAll(']', '')

        const product = $('<div>').addClass('recipes__products--div').appendTo(recipesProducts).text(productName)

        product.click(event => {
            if (!$(event.target).hasClass('recipes__products--div')) {
                removeFromRecipe(event)

                return
            }
            addToRecipe(event)
        })

    })

    button.click(event => {
        const recipesName = String($(event.target).siblings().val())

        if (recipesName !== '' && $('.recipes__products').children().hasClass('recipes__products--select')) {
            const arrayOfProducts = $('.recipes__products--select').toArray()
            const array: Array<string> = arrayOfProducts.map(object => object.innerHTML)
            const recipe: Recipe = {
                name: recipesName,
                products: array
            }

            $('.recipes__header').toggle()
            renderRecipes(recipe.name, recipe.products)

            allRecipe = allRecipe.concat(recipe)

            setToLocalStorage('recipes', allRecipe)
        }
    })

    return recipes
}

const renderRecipes = (name: string, array: Array<string>) => {
    const recipesBox = $('.recipe-Box')
    const readyRecipe = $('<div>').addClass('ready-recipe').appendTo(recipesBox)
    const trashIcon = $('<button>').appendTo(readyRecipe).addClass('ready-recipe__trash')

    $('<div>').addClass('ready-recipe__title').appendTo(readyRecipe).text(`Name: `).css('font-weight', 'bold').css('justify-content', 'center')
    $('<div>').addClass('ready-recipe__name').appendTo(readyRecipe).text(name)
    $('<div>').addClass('ready-recipe__product').appendTo(readyRecipe).text('Products: ').css('font-weight', 'bold').css('justify-content', 'center')
    array.forEach(product => {
        $('<div>').addClass('ready-recipe__product').appendTo(readyRecipe).text(product)
    })

    trashIcon.click(event => {
        const selectedProduct = $(event.target)

        selectedProduct.parents('.ready-recipe').remove()

        const name = selectedProduct.siblings('.ready-recipe__name').text()

        allRecipe?.forEach((object, index) => {
            if (object.name === name) {
                allRecipe = [...allRecipe.slice(0, index), ...allRecipe.slice(index + 1)]
            }
        })
        setToLocalStorage('recipes', allRecipe)
    })
}

