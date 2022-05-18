import { renderProduct } from './products_utils.js'
import { renderRecipesMenu, renderSaveRecipes } from './recipes_utils.js'
import { renderMishMashChoice } from './mish_mash_utils.js'
import { setToLocalStorage, getFromLocalStorage } from './local_storage_utils.js'

export const action = $('.action')
let activeButton = 'products'
let saveArrayOfProducts = []

const renderSaveProducts = () => {
    saveArrayOfProducts = saveArrayOfProducts.concat(getFromLocalStorage('products'))

    const renderedArrayProducts = saveArrayOfProducts.toString().split(',')

    renderedArrayProducts.forEach(object => {
        renderProduct(object)
        $('.selected-product__text').attr('readOnly', true).css('text-align', 'center')
    })

    saveArrayOfProducts = []
}

export const renderMenu = () => {
    const mishmashTitle = $('<div>').appendTo($('.action')).addClass('title').text('Mishmash')
    const buttonsBox = $('<div>').appendTo($('.action')).addClass('navigation')
    const productsBox = $('<div>').appendTo($('.action')).addClass('products')
    const firstButton = $('<button>').appendTo(buttonsBox).addClass('navigation__buttons').text('Składniki')
    let secondButton = $('<button>').appendTo(buttonsBox).addClass('navigation__buttons').text('Przepisy').attr('disabled', 'disabled')
    let thirdButton = $('<button>').appendTo(buttonsBox).addClass('navigation__buttons').text('Mishmash').attr('disabled', 'disabled')
    const addButton = $('<button>').appendTo($('.action')).addClass('navigation__add').text('+')

    if (productsBox.has('selected-product')) {
        secondButton.attr('disabled', false)
        thirdButton.attr('disabled', false)
    }

    renderSaveProducts()

    addButton.click(() => {
        if (activeButton === 'products') {
            renderProduct()
        }

        if (activeButton === 'recipes') {
            $('.recipes__header--text').val('')
            $('.recipes__header').toggle('display')
        }
    })
}

renderMenu()

$('.navigation__buttons:eq(0)').click(() => {
    if (activeButton !== 'products') {
        activeButton = 'products'
        $('.recipes').remove()
        $('.mish-mash').remove()
        $('<div>').appendTo(action).addClass('products')
        renderSaveProducts()
        $('.navigation__add').css('display', 'flex')
    }
})

$('.navigation__buttons:eq(1)').click(() => {
    if (activeButton !== 'recipes') {
        activeButton = 'recipes'
        $('.products').remove()
        $('.mish-mash').remove()
        renderRecipesMenu()
        renderSaveRecipes()
        $('.navigation__add').css('display', 'flex')
    }
})

$('.navigation__buttons:eq(2)').click(() => {
    if (activeButton !== 'mishMash') {
        activeButton = 'mishMash'
        $('.products').remove()
        $('.recipes').remove()
        renderMishMashChoice()
        $('.navigation__add').css('display', 'none')
    }
})

