import { getFromLocalStorage, setToLocalStorage } from './local_storage_utils'

let productsSpecial: Set<string> = new Set()
let products: Array<string> = []

const deleteProduct = (event: JQuery.ClickEvent) => {
    const selectedProduct = $(event.target)

    selectedProduct.parents('.selected-product').remove()

    const deleteProductName = String(selectedProduct.siblings('.selected-product__text').val())

    productsSpecial.delete(deleteProductName)

    const newArrayProduct: Array<string> = [...productsSpecial]

    setToLocalStorage('products', newArrayProduct)

    if (productsSpecial.size === 0) {
        $('.navigation__buttons:eq(1)').attr('disabled', 'true')
        $('.navigation__buttons:eq(2)').attr('disabled', 'true')
    }

    return productsSpecial
}

const editProduct = (event: JQuery.ClickEvent) => {
    const editProduct = $(event.target)

    editProduct.siblings('.selected-product__text').css('text-align', 'left').attr('readOnly', 'false')

    const deleteProductName = String(editProduct.siblings('.selected-product__text').val())

    productsSpecial.delete(deleteProductName)

    const newArrayProduct = [...productsSpecial]

    setToLocalStorage('products', newArrayProduct)

    return productsSpecial
}

const addLocalStorageToProducts = () => {
    const products = getFromLocalStorage<Array<string>>('products')

    products?.forEach(product => productsSpecial.add(product))
}

addLocalStorageToProducts()

export const addProductText = (event: JQuery.ChangeEvent) => {
    const selectedProduct = $(event.target)
    const addProductName = String(selectedProduct.val())

    productsSpecial.add(addProductName)
    products = [...productsSpecial]
    setToLocalStorage('products', products)

    $('.products').children().remove()

    if (productsSpecial.size !== 0) {
        $('.navigation__buttons:eq(1)').removeAttr('disabled')
        $('.navigation__buttons:eq(2)').removeAttr('disabled')
    }

    products.forEach(object => {
        renderProduct(object)

        $('.selected-product__icon-trash').click(event => {
            deleteProduct(event)
        })

        $('.selected-product__icon-edit').click(event => {
            editProduct(event)
        })

        $('.selected-product__text').on('change', event => {
            const selectedProduct = $(event.target)
            const addProductName = String(selectedProduct.val())

            productsSpecial.add(addProductName)
            products = [...productsSpecial]
            setToLocalStorage('products', products)
        })
    })

    return products
}

export const renderProduct = (text:string) => {
    const productBox = $('<div>').appendTo($('.products')).addClass('selected-product')

    $('<input>').appendTo(productBox).addClass('selected-product__text').attr('placeholder', 'wpisz nazwe produktu').val(text)
    $('<button>').appendTo(productBox).addClass('selected-product__icon-trash')
    $('<button>').appendTo(productBox).addClass('selected-product__icon-edit')

    $('.selected-product__text').on('change', event => {
        addProductText(event)
        $('.selected-product__text').attr('readOnly', 'true').css('text-align', 'center')
    })

    $('.selected-product__icon-trash').click(event => {
        deleteProduct(event)
    })

    $('.selected-product__icon-edit').click(deleteProduct)

    return productBox
}