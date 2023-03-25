import { Router } from 'express'

import { HandleRenderProductDetail, HandleRenderProducts } from '../../controllers/product/product.controllers.views.js'
import { requireViewSession } from '../../middlewares/session.js'

const router = Router()

router.get('/', requireViewSession, HandleRenderProducts)
router.get('/:pid', requireViewSession, HandleRenderProductDetail)

export default router
