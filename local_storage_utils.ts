export const setToLocalStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data))
}

export const getFromLocalStorage = (key: string) => JSON.parse(localStorage.getItem(key))