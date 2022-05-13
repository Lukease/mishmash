import {renderProduct, addAllProducts} from './products_utils.js'

const action = $('.action')

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

const addNewProduct = () => {
    $('.navigation__add').on('click', () => {
        renderProduct()
    })
}

addNewProduct()


export const addToRecipe = event => {
    $(event.target).removeClass()
    $(event.target).addClass('recipes__products--select')
}

export const removeFromRecipe = event => {
    $(event.target).removeClass()
    $(event.target).addClass('recipes__products--div')
}

const secondButton = () => {
    const renderRecipesMenu = () => {
        const recipes = $('<div>').addClass('recipes').appendTo(action)
        const header = $('<div>').addClass('recipes__header').appendTo(recipes)
        const recipesName = $('<input>').addClass('recipes__header--text').appendTo(header).attr('placeholder', 'wpisz nazwe przepisu').css('margin-left', '20px')
        const recipesProducts = $('<div>').addClass('recipes__products').appendTo(recipes)
        const button = $('<button>').addClass('recipes__header--button').appendTo(header).text('add')

        let products = localStorage.getItem('products')
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

        return recipes
    }

    $('.navigation__buttons:eq(1)').click(() => {
        $('.products').remove()
        addAllProducts(product => {
            localStorage.setItem('products', product)
        })

        renderRecipesMenu()
    })


}

secondButton()

