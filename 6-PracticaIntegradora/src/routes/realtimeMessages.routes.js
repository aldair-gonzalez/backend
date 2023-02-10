import { Router } from "express"

import { HandleMessages } from '../controllers/realtimeMessages.controllers.js'


const router = Router()


router.get('/', HandleMessages)

export default router