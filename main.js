import {renderProduct, addAllProducts} from './products_utils.js'
import {renderRecipesMenu, renderSaveRecipes} from './recipes_utils.js'

export const action = $('.action')
let activeButton = 'products'
let saveArrayOfProducts = []

const renderSaveProducts = () => {
    saveArrayOfProducts = saveArrayOfProducts.concat(localStorage.getItem('products'))

    const renderedArrayProducts = saveArrayOfProducts.toString().split(',')

    renderedArrayProducts.forEach(object => {
            object = object.replaceAll('[', '').replaceAll('"', '').replaceAll(']', '')
            renderProduct(object)
            $('.selected-product__text').attr('readOnly', true).css('text-align', 'center')
    })

    saveArrayOfProducts = []
}

const renderMenu = () => {
    const mishmashTitle = $('<div>').appendTo(action).addClass('title').text('Mishmash')
    const buttonsBox = $('<div>').appendTo(action).addClass('navigation')
    const productsBox = $('<div>').appendTo(action).addClass('products')
    const firstButton = $('<button>').appendTo(buttonsBox).addClass('navigation__buttons').text('Składniki')
    let SecondButton = $('<button>').appendTo(buttonsBox).addClass('navigation__buttons').text('Przepisy').attr('disabled', 'disabled')
    let thirdButton = $('<button>').appendTo(buttonsBox).addClass('navigation__buttons').text('Mishmash').attr('disabled', 'disabled')
    const addButton = $('<button>').appendTo(action).addClass('navigation__add').text('+')

    if (productsBox.has('selected-product')) {
        SecondButton.attr('disabled', false)
        thirdButton.attr('disabled', false)
    }

    renderSaveProducts()
}

renderMenu()

$('.navigation__buttons:eq(0)').click(() => {
    if (activeButton !== 'products') {
        activeButton = 'products'
        $('.recipes').remove()
        $('.products').remove()
        $('<div>').appendTo(action).addClass('products')
        renderSaveProducts()
    }
})

$('.navigation__buttons:eq(1)').click(() => {
    if (activeButton !== 'recipes') {
        activeButton = 'recipes'
        $('.products').remove()
        renderRecipesMenu()
        addAllProducts(product => {
            localStorage.setItem('products', JSON.stringify(product))
        })
        renderSaveRecipes()
    }
})

$('.navigation__add').click(() => {
    if (activeButton === 'products') {
        renderProduct()
    }

    if (activeButton === 'recipes') {
        $('.recipes__header--text').val('')
        $('.recipes__header').toggle('display')
    }
})

