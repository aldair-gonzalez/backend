import fs from 'fs'

import { Product } from '../models/product.model.js'

import { responseData } from '../utils/response.utils.js'

class ProductManager {
    constructor(path) {
        this.path = path
    }

    async getProducts(limit) {
        try {

            let readfile = await this.getFile()
            if(limit) return responseData(200, 'Productos', (JSON.parse(readfile)).splice(0, limit))
            if(JSON.parse(readfile).length > 0) return responseData(200, 'Productos', JSON.parse(readfile))
            return responseData(200, 'No hay productos registrados')
            
        } catch (error) {
            return responseData(500, error.message, error)
        }
    }
    
    async getProductById(id) {
        try {
            
            let readfile = await this.getFile()
            let exist = (JSON.parse(readfile)).find(d => d.id == id)
            if(!exist) return responseData(200, 'No se encontró el producto especificado')
            
            return responseData(200, 'Producto encontrado', exist)
            
        } catch (error) {
            return responseData(500, error.message, error)
        }
    }

    async addProduct(object) {
        try {

            let readfile = await this.getFile()
            let clone    = await structuredClone(JSON.parse(readfile))
            let id = clone.length + 1
            let exist = clone.find(product => product.code == object.code )
            let existId = clone.find(product => parseInt(product.id) == parseInt(id))
            if (existId) id = id + 1
            
            if(!(
                object.title        &&
                object.description  &&
                object.code         &&
                object.price        &&
                object.status       &&
                object.stock        &&
                object.category
            )) return responseData(411, 'Todos los campos son requeridos')
    
            if(exist) return responseData(203, `Ya existe un producto con el código: ${object.code}`)
            
            const product = new Product( id, object.title, object.description, object.code, object.price, object.status, object.stock, object.category, object.thumbnails )
            clone.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(clone, null, '\t'))

            return responseData(201, `El producto ${product.title} con precio: $${product.price} y código: ${product.code} a sido añadido de forma exitosa`, clone)
            
        } catch (error) {
            return responseData(500, error.message, error)
        }
    }

    async updateProduct(id, object) {
        try {

            let readfile = await this.getFile()
            let clone = structuredClone(JSON.parse(readfile))
            let exist = clone.find(product => product.id == id)
    
            if(!(id, object)) return responseData(411, 'Faltan compos por llenar')
            if(!exist) return responseData(200, 'No se encontró el producto expecificado')
    
            exist.title       = object.title        || exist.title
            exist.description = object.description  || exist.description
            exist.code        = object.code         || exist.code
            exist.price       = object.price        || exist.price
            exist.status      = object.status       || exist.status
            exist.stock       = object.stock        || exist.stock
            exist.category    = object.category     || exist.category
            exist.thumbnails  = object.thumbnails   || exist.thumbnails
    
            await fs.promises.writeFile(this.path, JSON.stringify(clone, null, '\t'))

            return responseData(202, `Producto modificado de manera exitosa`)

        } catch (error) {
            return responseData(500, error.message, error)
        }
    }

    async deleteProductById(id) {
        try {

            let readfile = await this.getFile()
            let clone = structuredClone(JSON.parse(readfile))
            let exist = clone.find(product => product.id == id)
    
            if(!exist) return responseData(200, 'No se encontró el producto expecificado')
            let positionProduct = clone.indexOf(exist)
            clone.splice(positionProduct, 1)
            await fs.promises.writeFile(this.path, JSON.stringify(clone, null, '\t'))

            return responseData(200, `Se eliminó el producto ${exist.title} de manera exitosa`)
            
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

export const productManager = new ProductManager('src/db/products.json')