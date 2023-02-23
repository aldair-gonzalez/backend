import { Router } from "express"

import {
    HandleRenderProductDetail,
    HandleRenderProducts
} from '../../controllers/products/products.controllers.views.js'



const router = Router()


router.get('/',      HandleRenderProducts)
router.get('/:pid',  HandleRenderProductDetail)

export default router