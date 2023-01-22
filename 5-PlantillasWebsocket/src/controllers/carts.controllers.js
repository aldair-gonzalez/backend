import { cartManager } from '../services/cartManager.service.js'

export const getProductsCart = async (req, res) => {
    let { cid } = req.params
    await cartManager.getProductsCart(cid).then(data => {
        res.status(data.status).json(data)
    }).catch(console.log)
}

export const createCart = async (req, res) => {
    await cartManager.createCart().then(data => {
        res.status(data.status).json(data)
    }).catch(console.log)
}

export const addProductCart = async (req, res) => {
    let { cid, pid } = req.params
    await cartManager.addProductCart(cid, pid).then(data => {
        res.status(data.status).json(data)
    }).catch(console.log)
}