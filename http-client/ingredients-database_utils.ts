import {renderProduct} from '../products_utils'
import {ingredientData} from '../type/ingredient-data'

export const getAllIngredients = async (ingredientsArray: Array<ingredientData>) => {
    const loader = $('<div>').addClass('products__loader').appendTo($('.products'))
    const url = 'http://localhost:3001/ingredients'

    await fetch(url, {
        method: 'GET'
    })
        .then(async res => {
            ingredientsArray = ingredientsArray.concat(JSON.parse(await res.text()))
        })
        .catch(error => {
            $('<div>').addClass('products__error').text(error).appendTo($('.loader-container')).css('color', 'red').css('font-size', '30px')
        })
        .finally(() => {
            loader.remove()
        })

    ingredientsArray.forEach((object) => {
        renderProduct(object.name, object.ingredientsId)
        $('.selected-product__text').attr('readOnly', 'true').css('text-align', 'center')
    })

    return ingredientsArray
}

export const deleteIngredient = (ingredientId: string) => {
    const url: string = `http://localhost:3001/ingredients?ingredientsId=${ingredientId}`

    return fetch(url, {
        method: 'DELETE',
    })
        .then((response) => response.json())
        .catch(error => {
            alert(error)
        })

}

export const editIngredient = async (ingredientId: number, newName: string) => {
    const url = 'http://localhost:3001/ingredients'

    return fetch(url, {
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
            alert(error)
        })
}

export const addNewIngredient = async (ingredientName: string) => {
    const url = `http://localhost:3001/ingredients?ingredientName=${ingredientName}`

    return fetch(url, {
        method: 'POST',
    })
        .then((response) => response.json())
        .catch(error => {
            alert(`cant add ${ingredientName}` + error)
        })
}