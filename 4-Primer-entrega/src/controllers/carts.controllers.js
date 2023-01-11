import { CartManager } from '../providers/cartManager.js'

const cartManager = new CartManager('src/db/db.json')

export const getProductsCart = (req, res) => {
    let { cid } = req.params
    cartManager.getProductsCart(cid).then(data => {
        res.send(data)
    }).catch(console.log)
}

export const createCart = (req, res) => {
    cartManager.createCart().then(data => {
        res.send(data)
    }).catch(console.log)
}

export const addProductCart = (req, res) => {
    let { cid, pid } = req.params
    cartManager.addProductCart(cid, pid).then(data => {
        res.send(data)
    }).catch(console.log)
}