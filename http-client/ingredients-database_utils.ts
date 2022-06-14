import { renderProduct } from '../products_utils'
import { ingredientData } from '../types'
import { baseUrl } from '../fetch-config'

export const getAllIngredients = async (ingredientsArray: Array<ingredientData>) => {
    const loader = $('<div>')
        .addClass('products__loader')
        .appendTo($('.products'))

    await fetch(`${baseUrl}ingredients`)
        .then(async res => {
            ingredientsArray = ingredientsArray.concat(JSON.parse(await res.text()))
        })
        .catch(error => {
            $('<div>')
                .addClass('error-menu')
                .text(error).appendTo($('.products'))
        })
        .finally(() => {
            loader.remove()
        })

    ingredientsArray.forEach( object => {
        renderProduct(object.name, object.ingredientsId)

        $('.selected-product__text')
            .attr('readOnly', 'true')
            .css('text-align', 'center')
    })

    return ingredientsArray
}

export const deleteIngredient = (ingredientId: string) => {
    return fetch(`${baseUrl}ingredients?ingredientsId=${ingredientId}`, {
        method: 'DELETE',
    })
        .then((response) => response.json())
        .catch(error => {
            $('<div>')
                .addClass('error-menu')
                .text(error).appendTo($('.products'))
        })

}

export const editIngredient = async (ingredientId: number, newName: string) => {
    return fetch(`${baseUrl}ingredients`, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ingredientId: ingredientId,
            newIngredientName: newName
        })
    })
        .then((response) => response.json())
        .catch(error => {
            $('<div>')
                .addClass('error-menu')
                .text(error).appendTo($('.products'))
        })
}

export const addNewIngredient = async (ingredientName: string) => {
    return fetch(`${baseUrl}ingredients?ingredientName=${ingredientName}`, {
        method: 'POST',
    })
        .then((response) => response.json())
        .catch(error => {
            $('<div>')
                .addClass('error-menu')
                .text(error).appendTo($('.products'))
        })
}