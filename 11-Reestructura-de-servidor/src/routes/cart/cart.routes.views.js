import { Router } from 'express'
import { HandleRenderCartDetail, HandleRenderCarts } from '../../controllers/cart/cart.controllers.views.js'
import { requireViewSession } from '../../middlewares/session.js'

const router = Router()

router.get('/', requireViewSession, HandleRenderCarts)
router.get('/:cid', requireViewSession, HandleRenderCartDetail)

export default router
