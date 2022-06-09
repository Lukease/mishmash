import {
    addNewIngredient,
    deleteIngredient,
    editIngredient,
} from './http-client/ingredients-database_utils'
import {ingredient} from './type/ingredients'
import {
    deleteRecipesIngredients,
    findOneRecipes,
    getRecipesIngredientsId
} from './http-client/recipesIngredients-database_utils'
import {deleteRecipe} from './http-client/recipes-database_utils'

let productsSpecial: Set<string> = new Set()
let products: Array<ingredient> = []

const deleteProduct = async (event: JQuery.ClickEvent) => {
    const selectedProduct = $(event.target)
    const ingredientId: string = selectedProduct.parents('.selected-product').attr('ingredientsid:')

    selectedProduct.parents('.selected-product').remove()

    const deleteProductName = String(selectedProduct.siblings('.selected-product__text').val())

    productsSpecial.delete(deleteProductName)

    const recipe = await findOneRecipes(parseInt(ingredientId))
    const [recipeId] = recipe
    const recipesIngredientsId: Array<number> = await getRecipesIngredientsId(recipeId.recipesId)

    recipesIngredientsId.forEach(recipesIngredientsId => {
        deleteRecipesIngredients(recipesIngredientsId)
    })
    recipe.forEach(number => {
        deleteRecipe(number.recipesId)
    })
    await deleteIngredient(ingredientId)

    if (!$('.products').has('selected-product')) {
        $('.navigation__buttons:eq(1)').attr('disabled', 'true')
        $('.navigation__buttons:eq(2)').attr('disabled', 'true')
    }

    return productsSpecial
}

const editProduct = async (event: JQuery.ClickEvent) => {
    const product = $(event.target).parent('.selected-product')
    const ingredientId: number = parseInt(product.attr('ingredientsid:'))

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