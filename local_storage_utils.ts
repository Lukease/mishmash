import { Recipe } from './types'

export const setToLocalStorage = (key:string, data:Array<string>|Array<Recipe>) => {
    localStorage.setItem(key, JSON.stringify(data))
}

export const getFromLocalStorage = (key:string) => JSON.parse(localStorage.getItem(key))