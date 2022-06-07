import {renderProduct} from "../products_utils";
import {ingredientData} from "../type/ingredient-data";

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

export const deleteIngredient = async (ingredientId: string) => {
    const url: string = `http://localhost:3001/ingredients?ingredientsId=${ingredientId}`
    await fetch(url, {
        method: 'DELETE',
    })
        .catch(error => {
            $('<div>').addClass('products__error').text(error).appendTo($('.loader-container')).css('color', 'red').css('font-size', '30px')
        })
}

export const editIngredient = async (ingredientId: number, newName: string) => {
    const url = 'http://localhost:3001/ingredients'
    await fetch(url, {
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
        .then((json) => console.log(json))
        .catch(error => {
            alert(error)
        })
}

export const addNewIngredient = async (ingredientName: string) => {
    const url = `http://localhost:3001/ingredients?ingredientName=${ingredientName}`
    fetch(url, {
        method: 'POST',
    })
        .catch(error => {
            alert(`cant add ${ingredientName}` + error)
        })
}

export const getOneIngredients = async (ingredientsArray: string) => {
    const url = 'http://localhost:3001/ingredients'
    await fetch(url, {
        method: 'GET'
    })
        .then(async res => {
            ingredientsArray = ingredientsArray.concat(JSON.parse(await res.text()))

        })
        .catch(error => {
            alert(error)
        })

    return ingredientsArray
}