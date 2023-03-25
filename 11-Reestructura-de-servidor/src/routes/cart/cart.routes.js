import { Router } from 'express'

import { HandleCreate, HandleDelete, HandleGetAll, HandleGetOne, HandleProductAdd, HandleProductRemove, HandleProductUpdate, HandleUpdate } from '../../controllers/cart/cart.controllers.js'
import { requireApiSession } from '../../middlewares/session.js'

const router = Router()

router.get('/', requireApiSession, HandleGetAll)
router.post('/', requireApiSession, HandleCreate)

router.get('/:cid', requireApiSession, HandleGetOne)
router.put('/:cid', requireApiSession, HandleUpdate)
router.delete('/:cid', requireApiSession, HandleDelete)

router.post('/:cid/product/:pid', requireApiSession, HandleProductAdd)
router.put('/:cid/product/:pid', requireApiSession, HandleProductUpdate)
router.delete('/:cid/product/:pid', requireApiSession, HandleProductRemove)

export default router
