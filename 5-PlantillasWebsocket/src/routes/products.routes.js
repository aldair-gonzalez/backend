import { Router } from 'express'

import { getProducts, addProduct, updateProduct, deleteProduct, getProductById } from '../controllers/products.controllers.js'

const router = Router()



router.get('',         getProducts)
router.post('',        addProduct)
router.get('/:pid',     getProductById)
router.put('/:pid',     updateProduct)
router.delete('/:pid',  deleteProduct)


export default router