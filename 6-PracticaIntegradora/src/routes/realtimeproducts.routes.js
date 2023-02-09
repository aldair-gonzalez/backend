import { Router } from "express"

import { HandleRealTimeProductsHome } from '../controllers/realtimeproducts.controllers.js'



const router = Router()


router.get('', HandleRealTimeProductsHome)

export default router