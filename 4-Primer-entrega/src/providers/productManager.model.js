import fs from 'fs'

import { Product } from '../models/product.model.js'

export class ProductManager {
    constructor(path) {
        this.path = path
    }

    async getProducts(limit) {
        try {

            let readfile = await this.getFile()
            if(limit) return (JSON.parse(readfile).products).splice(0, limit)

            return JSON.parse(readfile).products

        } catch (error) {
            return error
        }
    }
    
    async getProductById(id) {
        try {

            let readfile = await this.getFile()
            let exist = (JSON.parse(readfile).products).find(d => d.id == id)
            if(!exist) return 'No se encontró el producto expecificado'

            return exist

        } catch (error) {
            return error
        }
    }

    async addProduct(object) {
        try {

            let readfile = await this.getFile()
            let clone    = await structuredClone(JSON.parse(readfile))
            let products = await clone.products
            let id = products.length + 1
            let exist = products.find(product => product.code == object.code )
            let existId = products.find(product => parseInt(product.id) == parseInt(id))
            if (existId) id = id + 1
            
            if(!(
                object.title        &&
                object.description  &&
                object.code         &&
                object.price        &&
                object.status       &&
                object.stock        &&
                object.category
            )) return 'Todos los campos son requeridos'
    
            if(exist) return `Ya existe un producto con el código: ${object.code}`
            
            const product = new Product( id, object.title, object.description, object.code, object.price, object.status, object.stock, object.category, object.thumbnails )
            products.push(product)
            clone.products = products;
            await fs.promises.writeFile(this.path, JSON.stringify(clone, null, '\t'))

            return `El producto ${product.title} con precio: $${product.price} y código: ${product.code} a sido añadido de forma exitosa`
            
        } catch (error) {
            return error
        }
    }

    async updateProduct(id, object) {
        try {

            let readfile = await this.getFile()
            let clone = structuredClone(JSON.parse(readfile))
            let products = await clone.products
            let exist = products.find(product => product.id == id)
    
            if(!(id, object)) return 'Faltan compos por llenar'
            if(!exist) return 'No se encontró el producto expecificado'
    
            exist.title       = object.title        || exist.title
            exist.description = object.description  || exist.description
            exist.code        = object.code         || exist.code
            exist.price       = object.price        || exist.price
            exist.status      = object.status       || exist.status
            exist.stock       = object.stock        || exist.stock
            exist.category    = object.category     || exist.category
            exist.thumbnails  = object.thumbnails   || exist.thumbnails
    
            await fs.promises.writeFile(this.path, JSON.stringify(clone, null, '\t'))

            return `Producto modificado de manera exitosa`

        } catch (error) {
            return error
        }
    }

    async deleteProductById(id) {
        try {

            let readfile = await this.getFile()
            let clone = structuredClone(JSON.parse(readfile))
            let products = clone.products
            let exist = products.find(product => product.id == id)
    
            if(!exist) return 'No se encontró el producto expecificado'
            let positionProduct = products.indexOf(exist)
            products.splice(positionProduct, 1)
            await fs.promises.writeFile(this.path, JSON.stringify(clone, null, '\t'))

            return `Se eliminó el producto ${exist.title} de manera exitosa`
            
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