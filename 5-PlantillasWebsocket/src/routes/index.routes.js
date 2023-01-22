import { Router } from 'express'

import { HandleIndex } from '../controllers/index.controllers.js'


const router = Router()



router.get('/', HandleIndex)


export default router