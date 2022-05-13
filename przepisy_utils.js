import {action} from './main.js'

let recipesArray = []

export const addToRecipe = event => {
    $(event.target).removeClass()
    $(event.target).addClass('recipes__products--select')
}

export const removeFromRecipe = event => {
    $(event.target).removeClass()
    $(event.target).addClass('recipes__products--div')
}

export const renderRecipesMenu = () => {
    let recipes = $('<div>').addClass('recipes').appendTo(action)
    const header = $('<div>').addClass('recipes__header').appendTo(recipes)
    const recipesName = $('<input>').addClass('recipes__header--text').appendTo(header).attr('placeholder', 'wpisz nazwe przepisu').css('margin-left', '20px')
    const recipesProducts = $('<div>').addClass('recipes__products').appendTo(recipes)
    const button = $('<button>').addClass('recipes__header--button').appendTo(header).text('add')

    const products = localStorage.getItem('products')
    let productsName = []

    productsName = productsName.concat(products)
    productsName.toString().split(',')

    const splitProductsName = productsName.toString().split(',')

    splitProductsName.forEach(productName => {
        $('<div>').addClass('recipes__products--div').appendTo(recipesProducts).text(productName)

        $('.recipes__products--div').click(event => {
            addToRecipe(event)

            $('.recipes__products--select').click(event => {
                removeFromRecipe(event)
            })
        })
    })

    button.click(event => {
        const recipesName = $(event.target).siblings().val()
        const arrayOfProducts = $('.recipes__products--select').toArray()

        const array = arrayOfProducts.map(object =>{
            return object.innerHTML
        })

        const recipe = { name: recipesName, products: array}

        recipesArray = {
            ...recipesArray,
            recipe
        }
    })

    return recipes
}