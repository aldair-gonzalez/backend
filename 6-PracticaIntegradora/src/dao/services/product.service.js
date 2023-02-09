import { productModelSchema } from '../schemas/product.schema.js'
import { responseData } from '../../utils/response.utils.js'
import { Product } from '../models/product.model.js'

class ProductService {

    async getProducts() {
        try {

            let result = await productModelSchema.find().lean()
            if(result.length > 0) return responseData(200, 'Productos', result)
            return responseData(200, 'No hay productos registrados')

        } catch (error) {
            return responseData(500, error.message, error)
        }
    }

    async getProductById(id) {
        try {

            let exist = await productModelSchema.findById({_id: id}).then()
            if(!exist) return responseData(200, 'No se encontró el producto expecificado')
            
            return responseData(200, 'Producto encontrado', exist)
            
        } catch (error) {
            return responseData(500, error.message, error)
        }
    }

    async addProduct(object) {
        try {

            let exist = await productModelSchema.findOne({code: object.code}).then()

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
            
            const product = new Product( object.title, object.description, object.code, parseFloat(object.price), object.status, parseInt(object.stock), object.category, object.thumbnails )
            await productModelSchema.create(product)

            return responseData(201, `El producto: ${product.title} con precio: $${product.price} y código: ${product.code} a sido añadido de forma exitosa`)
            
        } catch (error) {
            return responseData(500, error.message, error)
        }
    }

    async updateProduct(id, object) {
        try {

            let exist = await productModelSchema.findOne({_id: id}).then()
    
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

            await productModelSchema.updateOne({_id: id}, exist)

            return responseData(202, `Producto modificado de manera exitosa`, exist)

        } catch (error) {
            return responseData(500, error.message, error)
        }
    }

    async deleteProductById(id) {
        try {

            let exist = await productModelSchema.findOne({_id: id}).then()
            if(!exist) return responseData(200, 'No se encontró el producto expecificado')

            await productModelSchema.deleteOne({_id: id})

            return responseData(200, `Se eliminó el producto ${exist.title} de manera exitosa`)
            
        } catch (error) {
            return responseData(500, error.message, error)
        }
    }

}

export const productService = new ProductService()