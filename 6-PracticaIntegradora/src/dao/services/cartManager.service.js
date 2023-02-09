import fs from 'fs'

import { Cart } from '../models/cart.model.js'
import { ProductCart } from '../models/productCart.model.js'

import { responseData } from '../../utils/response.utils.js'

class CartManager {
    constructor(path) {
        this.path = path
    }

    async createCart() {
        try {
            
            let readfile =  await this.getFile()
            let clone    =  await structuredClone(JSON.parse(readfile))
            let id = clone.length + 1
            
            let existId = clone.find(cart => parseInt(cart.id) == parseInt(id))
            if (existId) id = id + 1
    
            let newCart = new Cart(id)
            clone.push(newCart)
            await fs.promises.writeFile(this.path, JSON.stringify(clone, null, '\t'))

            return responseData(201, `Nuevo carrito con id: ${newCart.id} creado con éxito`)

        } catch (error) {
            return responseData(500, error.message, error)
        }
    }

    async getProductsCart(cid) {
        try {
            
            let readfile = await this.getFile()
            let clone    = await structuredClone(JSON.parse(readfile))
            let cart     = clone.find(c => c.id == cid)
            if(!cart) return responseData(404, `No se encontro el carrito especificado`)
    
            return responseData(200, 'Productos en el carrito', cart.products)

        } catch (error) {
            return responseData(500, error.message, error)
        }
    }

    async addProductCart(cid, pid) {
        try {
            
            let readfile = await this.getFile()
            let clone    = await structuredClone(JSON.parse(readfile))
            let cart     = clone.find(c => c.id == cid)
            if(!cart) return responseData(404, `No se encontro el carrito especificado`)
    
            let product = cart.products.find(p => p.product == pid)
    
            if(product) {
                product.quantity = product.quantity + 1
            } else {
                product = new ProductCart(parseInt(pid))
                cart.products.push(product)
            }
            
            await fs.promises.writeFile(this.path, JSON.stringify(clone, null, '\t'))

            return responseData(202, `Producto añadido con éxito al carrito con id: ${cart.id}`)

        } catch (error) {
            return responseData(500, error.message, error)
        }
    }

    async getFile() {
        let exist = fs.existsSync(this.path)
        if(!exist) await fs.promises.writeFile(this.path, JSON.stringify([]))
        let readfile = await fs.promises.readFile(this.path, 'utf-8')
        if(readfile == '') await fs.promises.writeFile(this.path, JSON.stringify([]))
        return readfile
    }
}

export const cartManager = new CartManager('src/dao/db/carts.json')