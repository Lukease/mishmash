export const setToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data))
}

export const getFromLocalStorage = key => JSON.parse(localStorage.getItem(key))