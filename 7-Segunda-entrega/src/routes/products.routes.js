import { Router } from "express"

import {
    HandleCreateProduct,
    HandleDeleteProduct,
    HandleGetProduct,
    HandleGetProducts,
    HandleUpdateProduct
} from '../controllers/products.controllers.js'



const router = Router()


router.get('/',        HandleGetProducts)
router.post('/',       HandleCreateProduct)
router.get('/:pid',    HandleGetProduct)
router.put('/:pid',    HandleUpdateProduct)
router.delete('/:pid', HandleDeleteProduct)

export default router