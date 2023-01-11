import { ProductManager } from '../providers/productManager.model.js'

const productManager = new ProductManager('src/db/db.json')

export const getProducts    = async (req, res) => {
    const { limit } = req.query
    productManager.getProducts(limit).then(data => {
        res.send(data)
    }).catch(console.error)
}
export const getProductById = async (req, res) => {
    const { pid } = req.params
    productManager.getProductById(pid).then(data => {
        res.send(data)
    }).catch(console.error)
}
export const addProduct     = async (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body
    let product = { title, description, code, price, status, stock, category, thumbnails }

    productManager.addProduct(product).then(data => {
        res.send(data)
    }).catch(console.error)
}
export const updateProduct  = async (req, res) => {
    const { pid } = req.params
    const object = req.body

    productManager.updateProduct(pid, object).then(data => {
        res.send(data)
    }).catch(console.error)
}
export const deleteProduct  = async (req, res) => {
    const { pid } = req.params

    productManager.deleteProductById(pid).then(data => {
        res.send(data)
    })
}