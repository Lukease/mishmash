const action = $('.action')

const render = () => {
    const mishmashTitle = $('<div>').appendTo(action).addClass('title').text('Mishmash')
    const buttonsBox = $('<div>').appendTo(action).addClass('navigation')
    const productsBox = $('<div>').appendTo(action).addClass('products')
    const firstButton = $('<button>').appendTo(buttonsBox).addClass('navigation__buttons').text('Składniki')
    const SecondButton = $('<button>').appendTo(buttonsBox).addClass('navigation__buttons').text('Przepisy').attr('disabled', 'disabled')
    const thirdButton = $('<button>').appendTo(buttonsBox).addClass('navigation__buttons').text('Mishmash').attr('disabled', 'disabled')
    const addButton = $('<button>').appendTo(action).addClass('navigation__add').text('+')
    // const productName = $('<div>').appendTo(productsBox).addClass('products__header')
}

render()

const addNewProduct = () => {
    $('.navigation__add').on('click', () => {
       const productBox = $('<div>').appendTo($('.products')).addClass('selected-product')
        const productText = $('<input>').appendTo(productBox).addClass('selected-product__text').attr('placeholder', 'wpisz nazwe produktu').attr('type', 'text')
        const trashIcon =  $('<button>').appendTo(productBox).addClass('selected-product__icon-trash')
        const editIcon =  $('<button>').appendTo(productBox).addClass('selected-product__icon-edit')
    })
}

addNewProduct()