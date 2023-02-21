import { Router } from "express"

import {
    HandleRenderCarts,
    HandleRenderProductsCart
} from '../controllers/carts.controllers.views.js'



const router = Router()


router.get('/',     HandleRenderCarts)
router.get('/:cid', HandleRenderProductsCart)

export default router