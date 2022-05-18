import { renderMenu} from './main.js'
import { renderProduct} from './products_utils.js'
import $ from 'jquery'

const body = `<div class="action"></div>`


describe('todo app', () => {
    beforeEach(() => {
        $('body').append(body)
        renderMenu()
    })

    afterEach(() => {
        $('body').empty()
    })

    describe('', () => {
        test('should render menu', () => {
            const addButtonText = $('.navigation__add').text()
            const title = $('.title').text()
            const productsButton = $('.navigation__buttons:eq(0)').text()
            const recipesButton = $('.navigation__buttons:eq(1)').text()
            const mishMashButton = $('.navigation__buttons:eq(2)').text()

            expect(title).toBe('Mishmash')
            expect(addButtonText).toBe('+')
            expect(productsButton).toBe('Składniki')
            expect(recipesButton).toBe('Przepisy')
            expect(mishMashButton).toBe('Mishmash')
        })

        test('should add, delete and edit new product', () => {
            const addButton = $('.navigation__add')
            const productLenghtBefore = $('.products').children('div').length

            addButton.trigger('click')

            const productLenghtAfter = $('.products').children('div').length
            const product = $('.selected-product__text')
            const productTextBefore = $('.selected-product__text').val()

            renderProduct()
            product.trigger('click')
            product.val('mleko')
            product.trigger('change')

            const productTextAfter = $('.selected-product__text').val()
            const editButton = $('.selected-product:eq(0)').children('.selected-product__icon-edit')
            const editProduct = $('.selected-product__text')

            editButton.trigger('click')
            editProduct.trigger('click')
            editProduct.val('jajko')
            editProduct.trigger('change')

            const productTextEdit = $('.selected-product__text').val()
            const productLenghtBeforeDelete = $('.products').children('div').length
            const deleteButton = $('.selected-product:eq(0)').children('.selected-product__icon-trash')

            deleteButton.trigger('click')

            const productLenghtAfterDelete = $('.products').children('div').length
            const buttonRecipesDisabled = $('.navigation__buttons:eq(1)').attr('disabled')
            const buttonMishmashDisabled = $('.navigation__buttons:eq(2)').attr('disabled')

            expect(productLenghtBefore).toBe(1)
            expect(productLenghtAfter).toBe(2)
            expect(productTextBefore).toBe('')
            expect(productTextAfter).toBe('mleko')
            expect(productLenghtBeforeDelete).toBe(1)
            expect(productLenghtAfterDelete).toBe(0)
            expect(productTextEdit).toBe('jajko')
            expect(buttonMishmashDisabled).toBe('disabled')
            expect(buttonRecipesDisabled).toBe('disabled')
        })
    })
})