let productsSpecial = new Set()
let products = []

const deleteProduct = event => {
    $(event.target).parents('.selected-product').remove()
    productsSpecial.delete($(event.target).siblings('.selected-product__text').val())

    if (productsSpecial.size ===0){
        $('.navigation__buttons:eq(1)').attr('disabled', true)
    }

    return productsSpecial
}

const editProduct = event => {
    $(event.target).siblings('.selected-product__text').css('text-align', 'left').attr('readOnly', false)
    productsSpecial.delete($(event.target).siblings('.selected-product__text').val())

    return productsSpecial
}

const addProductText = event => {
    productsSpecial.add($(event.target).val())
    products = [...productsSpecial]

    $('.products').children().remove()

    if (productsSpecial.size !== 0) {
        $('.navigation__buttons:eq(1)').attr('disabled', false)
    }

    products.forEach((object,index) => {
        renderProduct(object)

        $('.selected-product__icon-trash').click(event => {
            deleteProduct(event)
        })

        $('.selected-product__icon-edit').click(event => {
            editProduct(event)
        })

        $('.selected-product__text').on('change', event => {
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

    $('.selected-product__text').on('change', () => {
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

export const addAllProducts = addProduct => {
    addProduct(products)
}