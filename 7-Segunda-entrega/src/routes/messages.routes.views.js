import { Router } from "express"

import { HandleRenderMessages } from '../controllers/messages.controllers.views.js'



const router = Router()


router.get('/', HandleRenderMessages)

export default router