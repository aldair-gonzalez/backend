import { Router } from "express"

import { HandleRenderHome } from '../controllers/home.controllers.js'



const router = Router()


router.get('/', HandleRenderHome)

export default router