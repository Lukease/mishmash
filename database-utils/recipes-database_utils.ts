import {Recipe} from "../type/recipes";
import {renderRecipes} from "../recipes_utils";

export const getAllRecipes = async () => {
    let recipesArray: Array<Recipe> = []
    const loader = $('<div>').addClass('products__loader').appendTo($('.recipe-Box'))
    const url = 'http://localhost:3001/recipes/by-all'
    await fetch(url, {
        method: 'GET'
    })
        .then(async res => {
            recipesArray = recipesArray.concat(JSON.parse(await res.text()))
        })
        .catch(error => {
            $('<div>').addClass('products__error').text(error).appendTo($('.loader-container')).css('color', 'red').css('font-size', '30px')
        })
        .finally(() => {
            loader.remove()
        })

    recipesArray.forEach(recipe => {
        renderRecipes(recipe.recipeName, recipe.recipeId, recipe.ingredients)
    })

    return recipesArray
}

export const deleteRecipe = async (recipesId: string) => {
    const url: string = `http://localhost:3001/recipes?recipesId=${recipesId}`
    await fetch(url, {
        method: 'DELETE',
    })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch(error => {
            $('<div>').addClass('products__error').text(error).appendTo($('.loader-container')).css('color', 'red').css('font-size', '30px')
        })
}
//
// export const editIngredient = async (ingredientId: number, newName: string) => {
//     const url = 'http://localhost:3001/ingredients'
//     await fetch(url, {
//         method: 'PATCH',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             ingredientId: ingredientId,
//             newIngredientName: newName
//         })
//     })
//         .then((response) => response.json())
//         .then((json) => console.log(json))
//         .catch(error => {
//             alert(error)
//         })
// }
//
// export const addNewIngredient = async (ingredientName: string) => {
//     const url = `http://localhost:3001/ingredients?ingredientName=${ingredientName}`
//     fetch(url, {
//         method: 'POST',
//     })
//         .catch(error => {
//             alert(`cant add ${ingredientName}` + error)
//         })
// }
//
// export const getOneIngredients = async (ingredientsArray: string) => {
//     const url = 'http://localhost:3001/ingredients'
//     await fetch(url, {
//         method: 'GET'
//     })
//         .then(async res => {
//             ingredientsArray = ingredientsArray.concat(JSON.parse(await res.text()))
//
//         })
//         .catch(error => {
//             alert(error)
//         })
//
//     return ingredientsArray
// }