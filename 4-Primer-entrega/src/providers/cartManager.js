import fs from 'fs'

import { Cart } from '../models/cart.model.js'
import { ProductCart } from '../models/productCart.model.js'

export class CartManager {
    constructor(path) {
        this.path = path
    }

    async createCart() {
        try {
            
            let readfile =  await this.getFile()
            let clone    =  await structuredClone(JSON.parse(readfile))
            let carts    =  await clone.carts
            let id = carts.length + 1
            
            let existId = carts.find(cart => parseInt(cart.id) == parseInt(id))
            if (existId) id = id + 1
    
            let newCart = new Cart(id)
            carts.push(newCart)
            clone.carts = carts
            await fs.promises.writeFile(this.path, JSON.stringify(clone, null, '\t'))

            return `Nuevo carrito con id: ${newCart.id} creado con éxito`

        } catch (error) {
            return error
        }
    }

    async getProductsCart(cid) {
        try {
            
            let readfile = await this.getFile()
            let clone    = await structuredClone(JSON.parse(readfile))
            let carts    = await clone.carts
            let cart     = carts.find(c => c.id == cid)
            if(!cart) return `No se encontro el carrito especificado`
    
            return cart.products

        } catch (error) {
            return error
        }
    }

    async addProductCart(cid, pid) {
        try {
            
            let readfile = await this.getFile()
            let clone    = await structuredClone(JSON.parse(readfile))
            let carts    = await clone.carts
            let cart     = carts.find(c => c.id == cid)
            if(!cart) return `No se encontro el carrito especificado`
    
            let product = cart.products.find(p => p.product == pid)
    
            if(product) {
                product.quantity = product.quantity + 1
            } else {
                product = new ProductCart(parseInt(pid))
                cart.products.push(product)
            }
    
            clone.carts = carts
            await fs.promises.writeFile(this.path, JSON.stringify(clone, null, '\t'))

            return `Producto añadido con éxito al carrito con id: ${cart.id}`

        } catch (error) {
            return error
        }
    }

    async getFile() {
        let structura = {
            "products": [],
            "carts": [],
        }
        let exist = fs.existsSync(this.path)
        if(!exist) await fs.promises.writeFile(this.path, JSON.stringify(structura))
        let readfile = await fs.promises.readFile(this.path, 'utf-8')
        if(readfile == '') await fs.promises.writeFile(this.path, JSON.stringify(structura))
        return readfile
    }
}