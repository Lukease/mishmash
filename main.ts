import {renderProduct} from './products_utils'
import {renderRecipesMenu, renderSaveRecipes} from './recipes_utils'
import {renderMishMashChoice} from './mish_mash_utils'
import {getAllIngredients} from './http-client/ingredients-database_utils'
import {ingredientData} from './type/ingredient-data'

let activeButton = 'products'
let products: Array<ingredientData> = []

export const renderMenu = async () => {
    const action = $('.action')

    $('<div>').appendTo(action).addClass('title').text('Mishmash')

    const buttonsBox = $('<div>').appendTo(action).addClass('navigation')
    const productsBox = $('<div>').appendTo(action).addClass('products')

    $('<button>').appendTo(buttonsBox).addClass('navigation__buttons').text('Składniki')

    const secondButton = $('<button>').appendTo(buttonsBox).addClass('navigation__buttons').text('Przepisy').attr('disabled', 'true')
    const thirdButton = $('<button>').appendTo(buttonsBox).addClass('navigation__buttons').text('Mishmash').attr('disabled', 'true')

    $('<button>').appendTo(action).addClass('navigation__add').text('+')

    if (productsBox.has('selected-product')) {
        secondButton.removeAttr('disabled')
        thirdButton.removeAttr('disabled')
    }

    await getAllIngredients(products)
}

renderMenu()

export const clickButtons = () => {
    $('.navigation__buttons:eq(0)').click(async () => {
        if (activeButton !== 'products') {
            activeButton = 'products'
            $('.recipes').remove()
            $('.mish-mash').remove()
            $('<div>').appendTo($('.action')).addClass('products')
            await getAllIngredients(products)
            $('.navigation__add').css('display', 'flex')
        }
    })

    $('.navigation__buttons:eq(1)').click(async () => {
        if (activeButton !== 'recipes') {
            activeButton = 'recipes'
            $('.products').remove()
            $('.mish-mash').remove()
            renderRecipesMenu()
            await renderSaveRecipes()
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

    $('.navigation__add').click(() => {
        if (activeButton === 'products') {
            renderProduct('', '')
        }

        if (activeButton === 'recipes') {
            $('.recipes__header--text').val('')
            $('.recipes__header').toggle()
        }
    })
}

clickButtons()