import { setToLocalStorage, getFromLocalStorage } from './local_storage_utils.js'

let recipesArray = []
let saveArrayOfRecipes = []
let allRecipe = []

export const renderSaveRecipes = () => {
    const recipes = getFromLocalStorage('recipes')

    saveArrayOfRecipes = saveArrayOfRecipes.concat(recipes)

    const renderedArrayProducts = saveArrayOfRecipes

    renderedArrayProducts.forEach(object => {
        renderRecipes(object.recipe.name, object.recipe.products)
    })
    allRecipe = saveArrayOfRecipes
    saveArrayOfRecipes = []
}

export const addToRecipe = event => {
    $(event.target).removeClass()
    $(event.target).addClass('recipes__products--select')
}

export const removeFromRecipe = event => {
    $(event.target).removeClass()
    $(event.target).addClass('recipes__products--div')
}

export const renderRecipesMenu = () => {
    const recipes = $('<div>').addClass('recipes').appendTo($('.action'))
    const header = $('<div>').addClass('recipes__header').appendTo(recipes).toggle('display')
    const recipesName = $('<input>').addClass('recipes__header--text').appendTo(header).attr('placeholder', 'wpisz nazwe przepisu').css('margin-left', '20px')
    const recipesProducts = $('<div>').addClass('recipes__products').appendTo(recipes)
    const button = $('<button>').addClass('recipes__header--button').appendTo(header).text('add')
    const recipesBox = $('<div>').addClass('recipe-Box').appendTo('.recipes')

    const products = getFromLocalStorage('products')
    let productsName = []

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
        const recipesName = $(event.target).siblings().val()

        if (recipesName !== '' && $('.recipes__products').children().hasClass('recipes__products--select')) {
            const arrayOfProducts = $('.recipes__products--select').toArray()
            const array = arrayOfProducts.map(object => object.innerHTML)
            const recipe = {name: recipesName, products: array}

            recipesArray = {
                ...recipesArray,
                recipe
            }

            $('.recipes__header').toggle('display')
            renderRecipes(recipe.name, recipe.products)

            allRecipe = allRecipe.concat(recipesArray)

            setToLocalStorage('recipes', allRecipe)
        }
    })

    return recipes
}

const renderRecipes = (name, array) => {
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
        $(event.target).parents('.ready-recipe').remove()

        const name = $(event.target).siblings('.ready-recipe__name').text()

        allRecipe.forEach((object, index) => {
            if (object.recipe.name === name) {
                allRecipe = [...allRecipe.slice(0, index), ...allRecipe.slice(index + 1)]
            }
        })
        setToLocalStorage('recipes', allRecipe)
    })
}