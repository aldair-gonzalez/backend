import { Router } from "express"

import { addProductCart, createCart, getProductsCart } from '../controllers/carts.controllers.js'

const router = Router()

router.post('', createCart)
router.get('/:cid', getProductsCart)
router.post('/:cid/product/:pid', addProductCart)

export default router