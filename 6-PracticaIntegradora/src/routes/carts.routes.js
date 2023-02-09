import { Router } from "express"

import { addProductCart, createCart, getCarts, getProductsCart } from '../controllers/carts.controllers.js'

const router = Router()

router.get('', getCarts)
router.post('', createCart)
router.get('/:cid', getProductsCart)
router.post('/:cid/product/:pid', addProductCart)

export default router