import {Recipe} from "./types";

export const setToLocalStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data))
}

export const getFromLocalStorage = (key: string): Array<string> => {
    return  JSON.parse(localStorage.getItem(key))
}

export const getFromLocalStorageRecipe = (key: string): Array<Recipe> => {
    return  JSON.parse(localStorage.getItem(key))
}