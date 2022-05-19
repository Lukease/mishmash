export const setToLocalStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data))
}

export const getFromLocalStorage = <T> (key: string): T => {
    return  JSON.parse(localStorage.getItem(key)) as T
}
