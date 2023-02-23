import { Router } from "express"

import { HandleSessionLogin, HandleSessionLogout, HandleSessionSignup } from '../../controllers/session/session.controllers.js'



const router = Router()


router.post('/login',       HandleSessionLogin)
router.post('/signup',      HandleSessionSignup)
router.delete('/logout',    HandleSessionLogout)

export default router