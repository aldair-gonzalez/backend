import { productManager } from '../dao/services/productManager.service.js'
import { productService } from '../dao/services/product.service.js'


// -------------------- Usando mongodb -------------------- //
export const getProducts    = async (req, res) => {
    await productService.getProducts().then(data => {
        res.status(data.status).json(data)
    }).catch(console.error)
}
export const getProductById = async (req, res) => {
    const { pid } = req.params
    await productService.getProductById(pid).then(data => {
        res.status(data.status).json(data)
    }).catch(console.error)
}
export const addProduct     = async (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body
    let product = { title, description, code, price, status, stock, category, thumbnails }

    await productService.addProduct(product).then(data => {
        res.status(data.status).json(data)
    }).catch(console.error)
}
export const updateProduct  = async (req, res) => {
    const { pid } = req.params
    const object = req.body

    await productService.updateProduct(pid, object).then(data => {
        res.status(data.status).json(data)
    }).catch(console.error)
}
export const deleteProduct  = async (req, res) => {
    const { pid } = req.params

    await productService.deleteProductById(pid).then(data => {
        res.status(data.status).json(data)
    }).catch(console.error)
}


/*
// -------------------- Usando filesystem -------------------- //
export const getProducts    = async (req, res) => {
    const { limit } = req.query
    await productManager.getProducts(limit).then(data => {
        res.status(data.status).json(data)
    }).catch(console.error)
}
export const getProductById = async (req, res) => {
    const { pid } = req.params
    await productManager.getProductById(pid).then(data => {
        res.status(data.status).json(data)
    }).catch(console.error)
}
export const addProduct     = async (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body
    let product = { title, description, code, price, status, stock, category, thumbnails }

    await productManager.addProduct(product).then(data => {
        res.status(data.status).json(data)
    }).catch(console.error)
}
export const updateProduct  = async (req, res) => {
    const { pid } = req.params
    const object = req.body

    await productManager.updateProduct(pid, object).then(data => {
        res.status(data.status).json(data)
    }).catch(console.error)
}
export const deleteProduct  = async (req, res) => {
    const { pid } = req.params

    await productManager.deleteProductById(pid).then(data => {
        res.status(data.status).json(data)
    }).catch(console.error)
}
*/