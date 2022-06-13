import {
    addNewIngredient,
    deleteIngredient,
    editIngredient,
} from './http-client/ingredients-database_utils'
import {ingredient} from './type/ingredients'
import {
    findOneRecipes,
} from './http-client/recipesIngredients-database_utils'

let productsSpecial: Set<string> = new Set()
let products: Array<ingredient> = []

const deleteProduct = async (event: JQuery.ClickEvent) => {
    $('.error-menu').remove()

    const selectedProduct = $(event.target)
    const ingredientId: string = selectedProduct.parents('.selected-product').attr('ingredientsId:')

    const deleteProductName = String(selectedProduct.siblings('.selected-product__text').val())

    productsSpecial.delete(deleteProductName)

    const recipe = await findOneRecipes(parseInt(ingredientId))
    const [recipeId] = recipe

    if (recipeId !== undefined) {
        $('<div>').addClass('error-menu').appendTo('.products').text('First remove recipe ')
    }

    if (recipeId === undefined) {
        await deleteIngredient(ingredientId)
        selectedProduct.parents('.selected-product').remove()
    }

    if (!$('.products').has('selected-product')) {
        $('.navigation__buttons:eq(1)').attr('disabled', 'true')
        $('.navigation__buttons:eq(2)').attr('disabled', 'true')
    }

    return productsSpecial
}

const editProduct = async (event: JQuery.ClickEvent) => {
    $('.error-menu').remove()

    const product = $(event.target).parent('.selected-product')
    const ingredientId: number = parseInt(product.attr('ingredientsId:'))

    product.css('display', 'none')

    const newProduct = $('<input>').appendTo('.products').addClass('selected-product').css('background-color', 'white').css('text-align', 'center')

    newProduct.on('change', async () => {
        const newName: string = String(newProduct.val())

        await editIngredient(ingredientId, newName)

        product.css('display', 'flex')
        $(event.target).siblings('.selected-product__text').val(newName)
        newProduct.remove()
    })
}


export const addProductText = async (event: JQuery.ChangeEvent) => {
    const selectedProduct = $(event.target)
    const addProductName: string = String(selectedProduct.val())

    productsSpecial.add(addProductName)

    await addNewIngredient(addProductName)

    if ($('.products').has('selected-product')) {
        $('.navigation__buttons:eq(1)').removeAttr('disabled')
        $('.navigation__buttons:eq(2)').removeAttr('disabled')
    }

    products.forEach(() => {
        $('.selected-product__icon-trash').click(event => {
            deleteProduct(event)
        })

        $('.selected-product__icon-edit').click(async event => {
            await editProduct(event)
        })

        $('.selected-product__text').on('change', async event => {
            const selectedProduct = $(event.target)
            const addProductName = String(selectedProduct.val())

            productsSpecial.add(addProductName)
            await addNewIngredient(addProductName)
        })
    })

    return products
}

export const renderProduct = (text: string, id: string) => {
    const productBox = $('<div>').appendTo($(`.products`)).addClass('selected-product').attr('ingredientsId:', id)
    const textInput = $('<input>').appendTo(productBox).addClass('selected-product__text').attr('placeholder', 'wpisz nazwe produktu').val(text)
    const trashInput = $('<button>').appendTo(productBox).addClass('selected-product__icon-trash')
    const editInput = $('<button>').appendTo(productBox).addClass('selected-product__icon-edit')

    textInput.on('change', async event => {
        await addProductText(event)
        $('.selected-product__text').attr('readOnly', 'true').css('text-align', 'center')
    })

    trashInput.click(async event => {
        await deleteProduct(event)
    })

    editInput.click(async event => {
        await editProduct(event)
    })

    return productBox
}