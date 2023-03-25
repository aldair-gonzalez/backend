import { Router } from 'express'

import { HandleCreate, HandleDelete, HandleGetAll, HandleGetOne, HandleUpdate } from '../../controllers/product/product.controllers.js'
import { requireApiSession } from '../../middlewares/session.js'

const router = Router()

router.get('/', requireApiSession, HandleGetAll)
router.post('/', requireApiSession, HandleCreate)

router.get('/:pid', requireApiSession, HandleGetOne)
router.put('/:pid', requireApiSession, HandleUpdate)
router.delete('/:pid', requireApiSession, HandleDelete)

export default router
