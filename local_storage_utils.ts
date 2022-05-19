export const setToLocalStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data))
}

export function getFromLocalStorage<Type>  (key: string): Type  {
    return  JSON.parse(localStorage.getItem(key))
}

