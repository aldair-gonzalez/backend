import { cartManager } from '../dao/services/cartManager.service.js'
import { cartService } from '../dao/services/cart.service.js'


// -------------------- Usando mongodb -------------------- //
export const getCarts = async (req, res) => {
    await cartService.getCarts().then(data => {
        res.status(data.status).json(data)
    }).catch(console.log)
}

export const getProductsCart = async (req, res) => {
    let { cid } = req.params
    await cartService.getProductsCart(cid).then(data => {
        res.status(data.status).json(data)
    }).catch(console.log)
}

export const createCart = async (req, res) => {
    await cartService.createCart().then(data => {
        res.status(data.status).json(data)
    }).catch(console.log)
}

export const addProductCart = async (req, res) => {
    let { cid, pid } = req.params
    await cartService.addProductCart(cid, pid).then(data => {
        res.status(data.status).json(data)
    }).catch(console.log)
}

/*
// -------------------- Usando filesystem -------------------- //
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
*/