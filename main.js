import {renderProduct, addAllProducts} from './products_utils.js'
import {renderRecipesMenu} from './przepisy_utils.js'

export const action = $('.action')
let activeButton = 'skladniki'

const renderMenu = () => {
    const mishmashTitle = $('<div>').appendTo(action).addClass('title').text('Mishmash')
    const buttonsBox = $('<div>').appendTo(action).addClass('navigation')
    const productsBox = $('<div>').appendTo(action).addClass('products')
    const firstButton = $('<button>').appendTo(buttonsBox).addClass('navigation__buttons').text('Składniki')
    const SecondButton = $('<button>').appendTo(buttonsBox).addClass('navigation__buttons').text('Przepisy').attr('disabled', 'disabled')
    const thirdButton = $('<button>').appendTo(buttonsBox).addClass('navigation__buttons').text('Mishmash').attr('disabled', 'disabled')
    const addButton = $('<button>').appendTo(action).addClass('navigation__add').text('+')
}

renderMenu()

$('.navigation__buttons:eq(1)').click(() => {
    activeButton = 'przepisy'
    $('.products').remove()
    renderRecipesMenu()
    addAllProducts(product => {
        localStorage.setItem('products', product)
    })
})

$('.navigation__add').click( () => {
    if (activeButton === 'skladniki') {
        renderProduct()
        console.log('skladniki')
    }

    if (activeButton === 'przepisy') {
        console.log('przepisy')
    }
})
