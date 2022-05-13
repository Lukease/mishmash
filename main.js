const action = $('.action')
export let productsSpecial = new Set()
let products = []

const renderMenu = () => {
    const mishmashTitle = $('<div>').appendTo(action).addClass('title').text('Mishmash')
    const buttonsBox = $('<div>').appendTo(action).addClass('navigation')
    const productsBox = $('<div>').appendTo(action).addClass('products')
    const firstButton = $('<button>').appendTo(buttonsBox).addClass('navigation__buttons').text('Składniki')
    const SecondButton = $('<button>').appendTo(buttonsBox).addClass('navigation__buttons').text('Przepisy').attr('disabled', 'disabled')
    const thirdButton = $('<button>').appendTo(buttonsBox).addClass('navigation__buttons').text('Mishmash').attr('disabled', 'disabled')
    const addButton = $('<button>').appendTo(action).addClass('navigation__add').text('+')
}

export const deleteProduct = event => {
    $(event.target).parents('.selected-product').remove()
    productsSpecial.delete($(event.target).siblings('.selected-product__text').val())

    return productsSpecial
}

export const editProduct = event => {
    $(event.target).siblings('.selected-product__text').css('text-align', 'left').attr('readOnly', false)
    productsSpecial.delete($(event.target).siblings('.selected-product__text').val())

    return productsSpecial
}

renderMenu()

export const addProductText = event => {
    productsSpecial.add($(event.target).val())
    products = productsSpecial
    $('.products').children().remove()

    products.forEach(object => {
        renderProduct(object)

        $('.selected-product__icon-trash').click(event => {
            deleteProduct(event)
        })

        $('.selected-product__icon-edit').click(event => {
            editProduct(event)
        })

        $('.selected-product__text').on('change', event =>{
            productsSpecial.add($(event.target).val())
            products = productsSpecial
        })
    })

    return products
}

export const renderProduct = text => {
    const productBox = $('<div>').appendTo($('.products')).addClass('selected-product')
    const productText = $('<input>').appendTo(productBox).addClass('selected-product__text').attr('placeholder', 'wpisz nazwe produktu').val(text)
    const trashIcon = $('<button>').appendTo(productBox).addClass('selected-product__icon-trash')
    const editIcon = $('<button>').appendTo(productBox).addClass('selected-product__icon-edit')

    $('.selected-product__text').on('change', () =>{
        addProductText(event)
        $('.selected-product__text').attr('readOnly', true).css('text-align', 'center')
    })

    $('.selected-product__icon-trash').click(event => {
        deleteProduct(event)
    })

    $('.selected-product__icon-edit').click(event => {
        editProduct(event)
    })

    return productBox
}

const addNewProduct = () => {
    $('.navigation__add').on('click', () => {
        renderProduct()
    })
}

addNewProduct()