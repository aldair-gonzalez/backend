import { cartModelSchema } from '../schemas/cart.schema.js'
import { responseData } from '../../utils/response.utils.js'
import { Cart } from '../models/cart.model.js'
import { ProductCart } from '../models/productCart.model.js'

class CartService {

    async getCarts() {
        try {

            let result = await cartModelSchema.find().lean()
            if(!result.length > 0) return responseData(200, 'Aún no existe ningún carrito de compra, crea uno')
            return responseData(200, 'Carritos de compra', result)

        } catch (error) {
            return responseData(500, error.message, error)
        }
    }

   async getProductsCart (id) {
        try {

            let result = await cartModelSchema.findOne({_id: id}).then()
            if(!result) return responseData(404, 'No se encontró el carrito especificado')
            return responseData(200, `Carrito ${result._id}`, result.products)

        } catch (error) {
            return responseData(500, error.message, error)
        }
   }

    async createCart() {
        try {

            let cart = new Cart()
            await cartModelSchema.create(cart)

            return responseData(201, `Nuevo carrito con id: ${cart.id} creado con éxito`)
            
        } catch (error) {
            return responseData(500, error.message, error)
        }
    }

    async addProductCart (cid, pid) {
        try {

            let exist = await cartModelSchema.findOne({_id: cid}).then()
            let existProduct = await exist.products.find(p => JSON.stringify(p._id) == JSON.stringify(pid))

            if(!exist) return responseData(404, 'No se encontró el carrito especificado')

            if(existProduct) {
                existProduct.quantity = existProduct.quantity + 1
                await cartModelSchema.updateOne({_id: cid}, exist)
            } else {
                let product = new ProductCart(pid)
                await cartModelSchema.findByIdAndUpdate(cid, {$push: {products: product}})
            }

            return responseData(201, `Producto añadido al carrito`)
            
        } catch (error) {
            return responseData(500, error.message, error)
        }
    }

}

export const cartService = new CartService()